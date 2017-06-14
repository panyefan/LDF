
var allTotalScore = 0;//用于保存总分

function youWin() {//统计游戏胜利的成绩与时间
    stop(); //计时停止
    var spenTime = totalSeconds();//获取游戏所用的时间
    score = Math.ceil(100 - allprompt * 5 - partprompt * 2 - 0.02 * spenTime);  //ceil floor round    y=0.02x
    $("#score").text(score);

    if (window.localStorage) {//支持localStorage
        ishighScore(score, spenTime);
    } else {
        alert("你的浏览器不支持本地存储，请更新至最新版本或者使用其他浏览器试试！");
        displayHighScore(0); //参数1表示支持本地存储
    }

    if (sundFlag) {
        $('#winAudio')[0].play(); //播放胜利声音
    }
}

function ishighScore(score, spenTime) {//根据游戏难度等级，比较当前成绩与数据库中的成绩
    if (challengeGrade == 0) {//低难度
        displayHighOrWinScore(score, spenTime, "passLDF");
    } else if (challengeGrade == 1) {//中难度
        displayHighOrWinScore(score, spenTime, "HpassLDF");
    } else if (challengeGrade == 2) {
        displayHighOrWinScore(score, spenTime, "twopassLDF");
    } else if (challengeGrade == 3) {
        displayHighOrWinScore(score, spenTime, "threepassLDF");
    } else {//四维度
        displayHighOrWinScore(score, spenTime, "fourpassLDF");
    }
}

function displayHighOrWinScore(score, spenTime, str) {//比较当前成绩与数据库中的成绩，并做相应处理
    var tempScore = parseInt(JSON.parse(localStorage.getItem(str + gameStep)).score);
    var tempSpenTime = parseInt(JSON.parse(localStorage.getItem(str + gameStep)).times);
    var tempFlag = parseInt(JSON.parse(localStorage.getItem(str + gameStep)).flag);
    if (tempFlag) {//本关卡不是第一次玩,低难度
        if (score >= tempScore && spenTime <= tempSpenTime) {
            storageScore(score, spenTime);
            displayHighScore(1); //参数1表示支持本地存储

            insertLog(NEWHIGHWINLOG + " 成绩：" + score + "分 时间：" + spenTime + "秒 两分提示扣掉：" + (partprompt * 2) + "分 五分提示扣掉：" + (allprompt * 5) + "分"); //插入日记
            insertDifferGradeDiary(LDFGAMELOG); //插入拉丁方矩阵序列的日记
        }
        else {
            displayWin(spenTime);

            insertLog(WINLOG + " 成绩：" + score + "分 时间：" + spenTime + "秒 两分提示扣掉：" + (partprompt * 2) + "分 五分提示扣掉：" + (allprompt * 5) + "分"); //插入日记
            insertDifferGradeDiary(LDFGAMELOG); //插入拉丁方矩阵序列的日记
        }
    }
    else {//本关卡是第一次玩
        storageScore(score, spenTime);
        displayHighScore(1);

        insertLog(NEWHIGHWINLOG + " 成绩：" + score + "分 时间：" + spenTime + "秒 两分提示扣掉：" + (partprompt * 2) + "分 五分提示扣掉：" + (allprompt * 5) + "分"); //插入日记
        insertDifferGradeDiary(LDFGAMELOG); //插入拉丁方矩阵序列的日记
    }
}

function storageScore(score, spenTime) {//存储成绩记录
    var obj = new Object();
    obj.score = score;
    obj.times = spenTime;
    obj.flag = 1; //1用于标记用户不是第一次玩本关卡了
    obj.gameStep = gameStep; //游戏阶数
    var jsonData = JSON.stringify(obj);
    if (challengeGrade == 0) {
        localStorage.removeItem("passLDF" + gameStep);
        localStorage.setItem("passLDF" + gameStep, jsonData);
    } else if (challengeGrade == 1) {
        localStorage.removeItem("HpassLDF" + gameStep);
        localStorage.setItem("HpassLDF" + gameStep, jsonData);
    } else if (challengeGrade == 2) {
        localStorage.removeItem("twopassLDF" + gameStep);
        localStorage.setItem("twopassLDF" + gameStep, jsonData);
    } else if (challengeGrade == 3) {
        localStorage.removeItem("threepassLDF" + gameStep);
        localStorage.setItem("threepassLDF" + gameStep, jsonData);
    } else {
        localStorage.removeItem("fourpassLDF" + gameStep);
        localStorage.setItem("fourpassLDF" + gameStep, jsonData);
    }
    var scoreJsonData = JSON.stringify(getTotalScore()); //获取总分数
    localStorage.removeItem("totalScore");
    localStorage.setItem("totalScore", scoreJsonData);//存储总分数
}

function displayWin(spenTime) {//显示胜利的界面
    var game_message = new String;
    game_message = "<div id=\"game-message\" class=\"game-message game-won\"><p>&nbsp;&nbsp;You Win！</p><p id=\"wonScore\">0</p><br/>本关游戏用时<span>" + spenTime + "</span>秒";
    game_message += "<div class=\"lower\"><a href=\"javascript:nextgame();\" class=\"keep-playing-button\">继续前进</a>";
    game_message += "<a href=\"javascript:newgame();\" class=\"retry-button\">再试一次</a>";
    //game_message += "<div class=\"score-sharing\"><a class=\"twitter-share-button\" href=\"https://twitter.com/share\" data-via=\"gabrielecirulli\" data-url=\"http://git.io/2048\" data-counturl=\"http://gabrielecirulli.github.io/2048/\" data-text=\"I scored 172 points at 2048, a game where you join numbers to score high! #2048game\">Tweet</a></div>";
    game_message += "</div>";
    game_message += "</div>";
    $("#grid-container").append(game_message);

    WonScore = setInterval("wonNum()", 15); //30秒完成动画
}

function wonNum() {//分数逐渐增加变化的函数
    if (parseInt($("#wonScore").text()) >= score) {
        clearInterval(WonScore);
        $("#wonScore").text(score + "分");
    }
    else {
        $("#wonScore").text(parseInt($("#wonScore").text()) + 1);
    }
}

function youOver() {//显示失败的界面
    var game_message = new String;
    game_message = "<div id=\"game-message\" class=\"game-message game-over\"><p>&nbsp;&nbsp;Game Over！</p><p>0分</p><br/>游戏时间超过<span>" + totalSeconds() + "</span>秒";
    game_message += "<div class=\"lower\">";
    game_message += "<a href=\"javascript:newgame();\" class=\"retry-button\">再试一次</a>";
    game_message += "</div>";
    game_message += "</div>";
    $("#grid-container").append(game_message);
    stop(); //计时停止
    if (sundFlag) {
        $('#loseAudio')[0].play(); //播放失败声音
    }
    insertLog(FAILURELOG + " 游戏时间超过60分钟"); //插入日记
}

function promptOver() {//显示提示按钮点击次数过多而导致分数不够扣的界面
    var game_message = new String;
    game_message = "<div id=\"game-message\" class=\"game-message game-over\"><p>&nbsp;&nbsp;Game Over！</p><p>0分</p><br/>你点击的提示按钮过多，分数都不够扣了！<span>" + totalSeconds() + "</span>秒";
    game_message += "<div class=\"lower\">";
    game_message += "<a href=\"javascript:newgame();\" class=\"retry-button\">再试一次</a>";
    game_message += "</div>";
    game_message += "</div>";
    $("#grid-container").append(game_message);
    stop(); //计时停止
    if (sundFlag) {
        $('#loseAudio')[0].play(); //播放失败声音
    }
    insertLog(FAILURELOG + " 提示点击过多，分数不够扣"); //插入日记
}

function highScore() {//显示高分榜界面
    if (isClickHighScore) {
        insertLog(OPENHIGHSCOREBUTTOONLOG); //插入日记
        isClickHighScore = false;
        showDifferGradeScore = 0;//高分榜中查看不同等级成绩按钮的计数
        //localStorage.clear(); //清除掉本地存储的所有数据
        if (window.localStorage) {//支持localStorage
            if (localStorage.getItem("passLDF4") != null) {//本地成绩已经存在
                displayHighScore(1); //参数1表示支持本地存储
                $("#gradebutton").show(); //将查看其它游戏难度的成绩的按钮显示
            }
            else {
                createScoreStorage();//初始化成绩数据
                displayHighScore(1); //参数1表示支持本地存储
                $("#gradebutton").show(); //将查看其它游戏难度的成绩的按钮显示
            }
        }
        else {
            alert("你的浏览器不支持本地存储，请更新至最新版本或者使用其他浏览器试试！");
            displayHighScore(0); //参数1表示支持本地存储
            $("#gradebutton").show(); //将查看其它游戏难度的成绩的按钮显示
            insertLog(LOCALSTORAGEINFOLOG); //插入日记
        }
    }
    else {
        insertLog(CLOSEHIGHSCOREBUTTOONLOG); //插入日记
        $('#grid-container #game-message.game-message.game-highscore').remove();
        isClickHighScore = true;
        showDifferGradeScore = 0; //高分榜中查看不同等级成绩按钮的计数
    }
}

function getCurrentGradeScoreTimes() {//获取当前游戏难度的成绩与时间
    if (challengeGrade == 0) {
        return getLocalStorageScoreTimes("passLDF"); 
    } else if (challengeGrade == 1) {
        return getLocalStorageScoreTimes("HpassLDF");          
    } else if (challengeGrade == 2) {
        return getLocalStorageScoreTimes("twopassLDF");        
    } else if (challengeGrade == 3) {
        return getLocalStorageScoreTimes("threepassLDF");     
    } else {
        return getLocalStorageScoreTimes("fourpassLDF");            
    }
}

function getLocalStorageScoreTimes(gameLevel) {//获取本地存储的成绩与时间
    return {
        score4: JSON.parse(localStorage.getItem(gameLevel + "4")).score, times4: JSON.parse(localStorage.getItem(gameLevel + "4")).times,
        score5: JSON.parse(localStorage.getItem(gameLevel + "5")).score, times5: JSON.parse(localStorage.getItem(gameLevel + "5")).times,
        score6: JSON.parse(localStorage.getItem(gameLevel + "6")).score, times6: JSON.parse(localStorage.getItem(gameLevel + "6")).times,
        score7: JSON.parse(localStorage.getItem(gameLevel + "7")).score, times7: JSON.parse(localStorage.getItem(gameLevel + "7")).times,
        score8: JSON.parse(localStorage.getItem(gameLevel + "8")).score, times8: JSON.parse(localStorage.getItem(gameLevel + "8")).times,
        score9: JSON.parse(localStorage.getItem(gameLevel + "9")).score, times9: JSON.parse(localStorage.getItem(gameLevel + "9")).times,
        score10: JSON.parse(localStorage.getItem(gameLevel + "10")).score, times10: JSON.parse(localStorage.getItem(gameLevel + "10")).times
    };
}

//显示的是当前游戏难度等级的高分榜成绩
function displayHighScore(flag) {//显示高分榜的界面，其中参数flag表示是否支持本地存储
    var scoreTimes = getCurrentGradeScoreTimes();
    var game_message = new String;
    game_message = "<div id=\"game-message\" class=\"game-message game-highscore\"><p>榜上有名</p>";
    game_message += "<p id=\"totalScore\">0</p>";
    game_message += "<a id=\"gradebutton\" href=\"javascript:showGradeScore();\" class=\"retry-button\">低难度成绩榜</a>";
    game_message += "<div id=\"highscore\" class=\"lower\">";
    game_message += "<div id=\"passLDF4\" class=\"customs\"><span>第一关</span><font>" + (flag ? scoreTimes.score4 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times4 : 0) + "秒</font1><a href=\"javascript:iDekaron(4);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF5\" class=\"customs\"><span>第二关</span><font>" + (flag ? scoreTimes.score5 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times5 : 0) + "秒</font1><a href=\"javascript:iDekaron(5);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF6\" class=\"customs\"><span>第三关</span><font>" + (flag ? scoreTimes.score6 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times6 : 0) + "秒</font1><a href=\"javascript:iDekaron(6);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF7\" class=\"customs\"><span>第四关</span><font>" + (flag ? scoreTimes.score7 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times7 : 0) + "秒</font1><a href=\"javascript:iDekaron(7);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF8\" class=\"customs\"><span>第五关</span><font>" + (flag ? scoreTimes.score8 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times8 : 0) + "秒</font1><a href=\"javascript:iDekaron(8);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF9\" class=\"customs\"><span>第六关</span><font>" + (flag ? scoreTimes.score9 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times9 : 0) + "秒</font1><a href=\"javascript:iDekaron(9);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "<div id=\"passLDF10\" class=\"customs\"><span>第七关</span><font>" + (flag ? scoreTimes.score10 : 0) + "分</font> <font1>" + (flag ? scoreTimes.times10 : 0) + "秒</font1><a href=\"javascript:iDekaron(10);\" class=\"retry-button\">我来挑战</a></div>";
    game_message += "</div>";
    game_message += "</div>";
    $("#grid-container").append(game_message);

    $("#gradebutton").hide(); //将查看其它游戏难度的成绩的按钮隐藏

    if (challengeGrade == 0) {
        $("#gradebutton").text("低难度成绩榜");
        showDifferGradeScore = 1;
    } else if (challengeGrade == 1) {
        $("#gradebutton").text("中难度成绩榜");
        showDifferGradeScore = 2;
    } else if (challengeGrade == 2) {
        $("#gradebutton").text("二维度成绩榜");
        showDifferGradeScore = 3;
    } else if (challengeGrade == 3) {
        $("#gradebutton").text("三维度成绩榜");
        showDifferGradeScore = 4;
    } else {
        $("#gradebutton").text("四维度成绩榜");
        showDifferGradeScore = 0;
    }

    showHideretryButton(challengeGrade); //将没有没有过关的关卡隐藏“我来挑战”按钮

    allTotalScore = parseInt(JSON.parse(localStorage.getItem("totalScore")));//取本地存储的总分记录
    if (allTotalScore > 100) {
        $("#totalScore").text(allTotalScore - (allTotalScore % 100));
    } else {
        $("#totalScore").text(allTotalScore);
    }
    timerID = setInterval("num()", 30); //30秒完成动画
}

function num() {//逐渐增加显示总分
    if (parseInt($("#totalScore").text()) >= allTotalScore) {
        clearInterval(timerID);
        $("#totalScore").text(allTotalScore + "分");
    }
    else {
        $("#totalScore").text(parseInt($("#totalScore").text()) + 1);
    }
}

function showHideretryButton(grade) {//将没有没有过关的关卡隐藏“我来挑战”按钮
    for (var i = 5; i <= 10; i++) {
        $("#passLDF" + i + " a").show();
    }

    var n = 1;
    for (var i = 4; i <= 10; i++) {
        if (grade == 0) {
            if (JSON.parse(localStorage.getItem("passLDF" + i)).flag == "0") {
                if (n == 1) {
                    n = 2;
                    continue;
                }
                $("#passLDF" + i + " a").hide();
            }
        } else if (grade == 1) {
            if (JSON.parse(localStorage.getItem("HpassLDF" + i)).flag == "0") {
                if (n == 1) {
                    n = 2;
                    continue;
                }
                $("#passLDF" + i + " a").hide();
            }
        } else if (grade == 2) {
            if (JSON.parse(localStorage.getItem("twopassLDF" + i)).flag == "0") {
                if (n == 1) {
                    n = 2;
                    continue;
                }
                $("#passLDF" + i + " a").hide();
            }
        } else if (grade == 3) {
            if (JSON.parse(localStorage.getItem("threepassLDF" + i)).flag == "0") {
                if (n == 1) {
                    n = 2;
                    continue;
                }
                $("#passLDF" + i + " a").hide();
            }
        } else {
            if (JSON.parse(localStorage.getItem("fourpassLDF" + i)).flag == "0") {
                if (n == 1) {
                    n = 2;
                    continue;
                }
                $("#passLDF" + i + " a").hide();
            }
        }
    }
}

function showGradeScore() {//高分榜中查看不同游戏难度等级的成绩
    $("#highscore").slideUp("fast");//向上快速滑动
    $("#highscore").slideDown("fast");//向下快速滑动
    if (showDifferGradeScore == 0) {//低难度
        getGradeScore("低难度成绩榜", "passLDF");
        showHideretryButton(0); //将没有没有过关的关卡隐藏“我来挑战”按钮
        showDifferGradeScore++;
    } else if (showDifferGradeScore == 1) {//中难度
        getGradeScore("中难度成绩榜", "HpassLDF");
        showHideretryButton(1); //将没有没有过关的关卡隐藏“我来挑战”按钮
        showDifferGradeScore++;
    } else if (showDifferGradeScore == 2) {
        getGradeScore("二维度成绩榜", "twopassLDF");
        showHideretryButton(2); //将没有没有过关的关卡隐藏“我来挑战”按钮
        showDifferGradeScore++;
    } else if (showDifferGradeScore == 3) {
        getGradeScore("三维度成绩榜", "threepassLDF");
        showHideretryButton(3); //将没有没有过关的关卡隐藏“我来挑战”按钮
        showDifferGradeScore++;
    } else {
        getGradeScore("四维度成绩榜", "fourpassLDF");
        showHideretryButton(4); //将没有没有过关的关卡隐藏“我来挑战”按钮
        showDifferGradeScore = 0;
    }
    //alert(showDifferGradeScore);
}

function getGradeScore(buttonStr,grade) {//获取不同难度等级的成绩和时间
    insertLog(LOOKLOWSCOREBUTTOONLOG); //插入日记
    $("#gradebutton").text(buttonStr);
    $(".customs font").text("");
    $(".customs font1").text("");
    for (var i = 4; i <= 10; i++) {
        $("#passLDF" + i + ".customs font").text(JSON.parse(localStorage.getItem(grade + i)).score + "分");
        $("#passLDF" + i + ".customs font1").text(JSON.parse(localStorage.getItem(grade + i)).times + "秒");
    }
}

//高分榜，"我来挑战"，使用showDifferGradeScore做我来挑战的游戏难度的变量，经过测试1低难度，2中难度，3二维度，4三维度，0四维度
function iDekaron(gamestep) {//参数gamestep为我来挑战的阶数
    if (showDifferGradeScore == 0) {//挑战四维度
        insertLog(DEKARONBUTTOONLOG + "(四维度)" + " 第" + (gamestep - 3) + "关卡");   //插入日记
        challengeGrade = 4;
    } else if (showDifferGradeScore == 1) {//挑战低难度
        insertLog(DEKARONBUTTOONLOG + "(低难度)" + " 第" + (gamestep - 3) + "关卡"); //插入日记
        challengeGrade = 0;
        challengeNum = 0;
    } else if (showDifferGradeScore == 2) {//挑战中难度
        insertLog(DEKARONBUTTOONLOG + "(中难度)" + " 第" + (gamestep - 3) + "关卡");  //插入日记
        challengeGrade = 1;
        challengeNum = 0;
    } else if (showDifferGradeScore == 3) {//挑战二维度
        insertLog(DEKARONBUTTOONLOG + "(二维度)" + " 第" + (gamestep - 3) + "关卡");  //插入日记
        challengeGrade = 2;
    } else {//挑战三维度
        insertLog(DEKARONBUTTOONLOG + "(三维度)" + " 第" + (gamestep - 3) + "关卡");  //插入日记
        challengeGrade = 3;
    }
    isClickHighScore = true;
    gameStep = gamestep;
    newgame();
}


//HTML5自动转换成字符串，所以读取数据时根据情况再转类型
//setItem() getItem() removeItem() clear() 
//window.localStorage.length key(i++)
//JSON.stringify() JSON.parse()
//if (window.localStorage) //支持localStorage

function createScoreStorage() {//初始化成绩记录的存储数据
    for (var i = 4; i <= 10; i++) {
        var obj = new Object();//低难度
        obj.score = 0;
        obj.times = 0;
        obj.flag = 0;//标记用户是否第一次玩
        obj.gameStep = i;//游戏阶数
        var Hobj = new Object();//中难度
        Hobj.score = 0;
        Hobj.times = 0;
        Hobj.flag = 0;
        Hobj.gameStep = i;
        var twoObj = new Object(); //二维度
        twoObj.score = 0;
        twoObj.times = 0;
        twoObj.flag = 0;
        twoObj.gameStep = i;
        var threeObj = new Object(); //三维度
        threeObj.score = 0;
        threeObj.times = 0;
        threeObj.flag = 0;
        threeObj.gameStep = i;
        var fourObj = new Object(); //四维度
        fourObj.score = 0;
        fourObj.times = 0;
        fourObj.flag = 0;
        fourObj.gameStep = i;
        var jsonData = JSON.stringify(obj);
        var HjsonData = JSON.stringify(Hobj);
        var twoJsonData = JSON.stringify(twoObj);
        var threeJsonData = JSON.stringify(threeObj);
        var fourJsonData = JSON.stringify(fourObj);
        localStorage.removeItem("passLDF" + i);
        localStorage.removeItem("HpassLDF" + i);
        localStorage.removeItem("twopassLDF" + i);
        localStorage.removeItem("threepassLDF" + i);
        localStorage.removeItem("fourpassLDF" + i);        
        localStorage.setItem("passLDF" + i, jsonData);
        localStorage.setItem("HpassLDF" + i, HjsonData);
        localStorage.setItem("twopassLDF" + i, twoJsonData);
        localStorage.setItem("threepassLDF" + i, threeJsonData);
        localStorage.setItem("fourpassLDF" + i, fourJsonData);
    }
    var scoreJsonData = JSON.stringify(0);
    localStorage.removeItem("totalScore");
    localStorage.setItem("totalScore", scoreJsonData);//总分
}

//计算总分
function getTotalScore() {
    var totalScore = 0;
    for (var i = 4; i <= 10; i++) {
        totalScore += parseInt(JSON.parse(localStorage.getItem("passLDF" + i)).score);
        totalScore += parseInt(JSON.parse(localStorage.getItem("HpassLDF" + i)).score);
        totalScore += parseInt(JSON.parse(localStorage.getItem("twopassLDF" + i)).score);
        totalScore += parseInt(JSON.parse(localStorage.getItem("threepassLDF" + i)).score);
        totalScore += parseInt(JSON.parse(localStorage.getItem("fourpassLDF" + i)).score);
        if (JSON.parse(localStorage.getItem("passLDF" + i)).times != 0) {
            totalScore += (-0.0139) * parseInt(JSON.parse(localStorage.getItem("passLDF" + i)).times) + 50;//y=-0.0139x+50
        }
        if (JSON.parse(localStorage.getItem("HpassLDF" + i)).times != 0) {
            totalScore += (-0.0139) * parseInt(JSON.parse(localStorage.getItem("HpassLDF" + i)).times) + 50;
        }
        if (JSON.parse(localStorage.getItem("twopassLDF" + i)).times != 0) {
            totalScore += (-0.0139) * parseInt(JSON.parse(localStorage.getItem("twopassLDF" + i)).times) + 50;
        }
        if (JSON.parse(localStorage.getItem("threepassLDF" + i)).times != 0) {
            totalScore += (-0.0139) * parseInt(JSON.parse(localStorage.getItem("threepassLDF" + i)).times) + 50;
        }
        if (JSON.parse(localStorage.getItem("fourpassLDF" + i)).times != 0) {
            totalScore += (-0.0139) * parseInt(JSON.parse(localStorage.getItem("fourpassLDF" + i)).times) + 50;
        }
    }
    return totalScore;
}