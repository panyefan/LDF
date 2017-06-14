
function isLDF(currentGradeItem) {//判断当前矩阵是否是拉丁方
    if (challengeGrade == 2) {
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                if ($(currentGradeItem).attr('grade') == "1") {//判断当前移动的方块片的维度
                    if (onlyOne($("#number-cell-" + i + "-" + j)).flag == false) {
                        isLDFone = false; //标记一维度的矩阵不是拉丁方
                        return false;
                    }
                } else {
                    if (onlyOne($("#twoNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFtwo = false; //标记二维度的矩阵不是拉丁方
                        return false;
                    }
                }
            }
        }
        //两个循环遍历完能达到这里，说明某一个矩阵是拉丁方了
        if ($(currentGradeItem).attr('grade') == "1") {
            isLDFone = true;
        } else {
            isLDFtwo = true;
        }
        if (isLDFone==true && isLDFtwo==true) {
            return true;
        } else {
            return false;
        }
    } else if (challengeGrade == 3) {
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                if ($(currentGradeItem).attr('grade') == "1") {//判断当前移动的方块片的维度
                    if (onlyOne($("#number-cell-" + i + "-" + j)).flag == false) {
                        isLDFone = false; //标记一维度的矩阵不是拉丁方
                        return false;
                    }
                } else if ($(currentGradeItem).attr('grade') == "2") {
                    if (onlyOne($("#twoNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFtwo = false; //标记二维度的矩阵不是拉丁方
                        return false;
                    }
                } else {
                    if (onlyOne($("#threeNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFthree = false; //标记三维度的矩阵不是拉丁方
                        return false;
                    }
                }
            }
        }
        //两个循环遍历完能达到这里，说明某一个矩阵是拉丁方了
        if ($(currentGradeItem).attr('grade') == "1") {
            isLDFone = true;
        } else if ($(currentGradeItem).attr('grade') == "2") {
            isLDFtwo = true;
        } else {
            isLDFthree = true;
        }
        if (isLDFone == true && isLDFtwo == true&&isLDFthree == true) {
            return true;
        } else {
            return false;
        }
    } else if (challengeGrade == 4) {
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                if ($(currentGradeItem).attr('grade') == "1") {//判断当前移动的方块片的维度
                    if (onlyOne($("#number-cell-" + i + "-" + j)).flag == false) {
                        isLDFone = false; //标记一维度的矩阵不是拉丁方
                        return false;
                    }
                } else if ($(currentGradeItem).attr('grade') == "2") {
                    if (onlyOne($("#twoNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFtwo = false; //标记二维度的矩阵不是拉丁方
                        return false;
                    }
                } else if ($(currentGradeItem).attr('grade') == "3") {
                    if (onlyOne($("#threeNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFthree = false; //标记三维度的矩阵不是拉丁方
                        return false;
                    }
                } else {
                    if (onlyOne($("#fourNumber-cell-" + i + "-" + j)).flag == false) {
                        isLDFfour = false; //标记四维度的矩阵不是拉丁方
                        return false;
                    }
                }
            }
        }
        //两个循环遍历完能达到这里，说明某一个矩阵是拉丁方了
        if ($(currentGradeItem).attr('grade') == "1") {
            isLDFone = true;
        } else if ($(currentGradeItem).attr('grade') == "2") {
            isLDFtwo = true;
        } else if ($(currentGradeItem).attr('grade') == "3") {
            isLDFthree = true;
        } else {
            isLDFfour = true;
        }
        if (isLDFone == true && isLDFtwo == true && isLDFthree == true&&isLDFfour == true) {
            return true;
        } else {
            return false;
        }
    } else {
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                if (onlyOne($("#number-cell-" + i + "-" + j)).flag == false) {
                    return false;
                }
            }
        }
        return true;
    }
}

//function onlyOne(currentItem) {//判断方块片被拖拽后在新位置那行那列是否唯一
//    var number = parseInt($(currentItem).text());
//    var m = parseInt($(currentItem).attr('m'));
//    var n = parseInt($(currentItem).attr('n'));

//    for (var i = 0; i < gameStep; i++) {
//        if (i != n) {
//            if (number == board[m][i]) {
//                return false;
//            }
//        }
//    }

//    for (var j = 0; j < gameStep; j++) {
//        if (j != m) {
//            if (number == board[j][n]) {
//                return false;
//            }
//        }
//    }
//    return true;
//}


function onlyOne(currentItem) {//判断方块片被拖拽后在新位置的行和列都是否唯一
    var number = 0;
    if (challengeGrade == 2) {//获取当前方块片字符对应的数字
        if ($(currentItem).attr('grade') == "1") {
            number = parseInt($(currentItem).text());
        } else {
            number = parseInt(getLetterNumber($(currentItem).text()));
        }
    } else if (challengeGrade == 3) {
        if ($(currentItem).attr('grade') == "1") {
            number = parseInt($(currentItem).text());
        } else if ($(currentItem).attr('grade') == "2") {
            number = parseInt(getLetterNumber($(currentItem).text()));
        } else {
            number = parseInt(getLetterNumberThree($(currentItem).text()));
        }
    } else if (challengeGrade == 4) {
        if ($(currentItem).attr('grade') == "1") {
            number = parseInt($(currentItem).text());
        } else if ($(currentItem).attr('grade') == "2") {
            number = parseInt(getLetterNumber($(currentItem).text()));
        } else if ($(currentItem).attr('grade') == "3") {
            number = parseInt(getLetterNumberThree($(currentItem).text()));
        } else {
            number = parseInt(getLetterNumberFour($(currentItem).text()));
        }
    } else {
        if (challengeGrade == 1 && challengeNum == 1) {//中难度
            number = parseInt(getLetterNumber($(currentItem).text()));
        } else {
            number = parseInt($(currentItem).text());
        }
    }
    var m = parseInt($(currentItem).attr('m'));
    var n = parseInt($(currentItem).attr('n'));
    var obj = new Object();

    for (var i = 0; i < gameStep; i++) {//遍历判断所在的行是否唯一
        if (i != n) {
            if (challengeGrade == 2) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else if (challengeGrade == 3) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "3") {
                    if (number == threeBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else if (challengeGrade == 4) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "3") {
                    if (number == threeBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "4") {
                    if (number == fourBoard[m][i]) {
                        obj.m = m;
                        obj.n = i;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else {
                if (number == board[m][i]) {
                    obj.m = m;
                    obj.n = i;
                    obj.flag = false;
                    return obj;
                }
            }
        }
    }

    for (var j = 0; j < gameStep; j++) {//遍历判断所在的列是否唯一
        if (j != m) {
            if (challengeGrade == 2) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else if (challengeGrade == 3) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "3") {
                    if (number == threeBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else if (challengeGrade == 4) {
                if ($(currentItem).attr('grade') == "1") {
                    if (number == board[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "2") {
                    if (number == twoBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "3") {
                    if (number == threeBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
                if ($(currentItem).attr('grade') == "4") {
                    if (number == fourBoard[j][n]) {
                        obj.m = j;
                        obj.n = n;
                        obj.flag = false;
                        return obj;
                    }
                }
            } else {
                if (number == board[j][n]) {
                    obj.m = j;
                    obj.n = n;
                    obj.flag = false;
                    return obj;
                }
            }
        }
    }
    obj.flag = true;
    return obj;
}

function promptgame(all) {//全部及部分提示功能
    if (timerStartFlag) {//计时开始
        if (challengeGrade == 1 && challengeNum == 1) {//中难度
            //中难度，时间不重新开始
        }
        else {
            start(); //低难度时间开始
            timerStartFlag = false;
            allprompt = 0; //记录玩家点击全部提示的次数归零
            partprompt = 0;
        }
    }

    var spenTime = totalSeconds(); //获取游戏所用的时间
    var promptgamescore = Math.ceil(100 - allprompt * 5 - partprompt * 2 - 0.02 * spenTime);  //ceil floor round    y=0.02x
    if (promptgamescore < 0) {//判断用户玩家点击的次数分值和时间是否超过100分
        promptOver(); //显示提示按钮点击次数过多而导致分数不够扣的界面
    }
    isNumberRepeat = false;
    if (all == 0) {
        partprompt++;
        insertLog(TWOPROMPTBUTTOONLOG); //插入日记
    }
    else {
        allprompt++;
        insertLog(FIVEPROMPTBUTTOONLOG); //插入日记
    }

    if (challengeGrade == 2) {
        checkNumberRepeat(all, "number-cell");
        if (isNumberRepeat == false) {//如果用户点击了部分提示，并且在一维度中存在冲突的元素，isNumberRepeat将为true，则不管后面多少维度的矩阵都不会去查找
            checkNumberRepeat(all, "twoNumber-cell");
        }
    } else if (challengeGrade == 3) {
        checkNumberRepeat(all, "number-cell");
        if (isNumberRepeat == false) {
            checkNumberRepeat(all, "twoNumber-cell");
        }
        if (isNumberRepeat == false) {
            checkNumberRepeat(all, "threeNumber-cell");
        }
    } else if (challengeGrade == 4) {
        checkNumberRepeat(all, "number-cell");
        if (isNumberRepeat == false) {
            checkNumberRepeat(all, "twoNumber-cell");
        }
        if (isNumberRepeat == false) {
            checkNumberRepeat(all, "threeNumber-cell");
        }
        if (isNumberRepeat == false) {
            checkNumberRepeat(all, "fourNumber-cell");
        }
    } else {
        if (all == 0) {
            var obj = nospace(board);
            if (obj.flag) {//矩阵元素中的元素已经填满
                checkNumberRepeat(all, "number-cell");
            } else {
                var promptDiv = "<div class=\"prompt\"></div>";
                $("#number-cell-" + obj.i + "-" + obj.j).append(promptDiv); //对空白块上色

                var tempgameStep = new Array(); //保存阶数所有的元素
                var temparr = new Array(); //保存当前空白块所在位置上行与列的所有的元素
                var tempPrompt = new Array(); //保存提示元素
                var n = 0;
                for (var k = 0; k < gameStep; k++) {
                    tempgameStep[k] = k;
                    temparr[n++] = board[obj.i][k];
                    temparr[n++] = board[k][obj.j];
                }
                tempgameStep[gameStep] = gameStep;
                temparr = $.unique(temparr);

                for (var i = 0; i < tempgameStep.length; i++) {//求两个数组的差集
                    var flag = true;
                    for (var j = 0; j < temparr.length; j++) {
                        if (tempgameStep[i] == temparr[j])
                            flag = false;
                    }
                    if (flag) { tempPrompt.push(tempgameStep[i]); }
                }
                //alert(tempPrompt.toString());
                tempPrompt = tempPrompt.sort(function (a, b) {
                    return a - b;
                });
                showInputNumber($("#number-cell-" + obj.i + "-" + obj.j), tempPrompt); //显示输入面板
            }
        } else {//全部提示
            checkNumberRepeat(all, "number-cell");
        }
    }
}

function checkNumberRepeat(all, str) {
    var flag = false;
    for (var i = 0; i < gameStep; i++) {
        if (flag) break;
        for (var j = 0; j < gameStep; j++) {

            var isOne = onlyOne($("#"+str+"-" + i + "-" + j));
            if (isOne.flag == false) {
                var promptDiv = "<div class=\"prompt\"></div>";
                $("#"+str+"-" + i + "-" + j).append(promptDiv);
                $("#" + str + "-" + isOne.m + "-" + isOne.n).append(promptDiv);
                if (all == 0) {//部分提示
                    isNumberRepeat = true;
                    flag = true;
                    break;
                }
            }

        }
    }
}