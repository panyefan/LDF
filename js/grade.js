function diffGrade(grade) {//难度等级
    challengeGrade = grade;
    isShowChallengeGrade = false;
    $("#game-challengeGrade").hide();

    if (grade == 0) {
        insertLog(ZEROBUTTOONLOG); //插入日记
    } else if (grade == 1) {
        insertLog(ONEBUTTOONLOG); //插入日记
    } else if (grade == 2) {
        insertLog(TWOBUTTOONLOG); //插入日记
    } else if (grade == 3) {
        insertLog(THREEBUTTOONLOG); //插入日记
    } else {
        insertLog(FOURBUTTOONLOG); //插入日记
    }

    for (var i = 4; i <= 10; i++) {//遍历出当前游戏难度还没有玩通关过的阶数，防止直接跳到用户还没有玩通关的关卡
        if (challengeGrade == 0) {
            if (JSON.parse(localStorage.getItem("passLDF" + i)).flag == "0") {
                gameStep = parseInt(JSON.parse(localStorage.getItem("passLDF" + i)).gameStep);
                break;
            }
        } else if (challengeGrade == 1) {
            if (JSON.parse(localStorage.getItem("HpassLDF" + i)).flag == "0") {
                gameStep = parseInt(JSON.parse(localStorage.getItem("HpassLDF" + i)).gameStep);
                break;
            }
        } else if (challengeGrade == 2) {
            if (JSON.parse(localStorage.getItem("twopassLDF" + i)).flag == "0") {
                gameStep = parseInt(JSON.parse(localStorage.getItem("twopassLDF" + i)).gameStep);
                break;
            }
        } else if (challengeGrade == 3) {
            if (JSON.parse(localStorage.getItem("threepassLDF" + i)).flag == "0") {
                gameStep = parseInt(JSON.parse(localStorage.getItem("threepassLDF" + i)).gameStep);
                break;
            }
        } else {
            if (JSON.parse(localStorage.getItem("fourpassLDF" + i)).flag == "0") {
                gameStep = parseInt(JSON.parse(localStorage.getItem("fourpassLDF" + i)).gameStep);
                break;
            }
        }
    }

    newgame();
} 

function getNumberBackgroundColor(number) {//获取数字的背景颜色
    switch (number) {
        case 0: return "#CCC0B3"; break;
        case 1: return "#eee4da"; break;
        case 2: return "#F2DBAF"; break;
        case 3: return "#f2b179"; break;
        case 4: return "#f59563"; break;
        case 5: return "#f67e5f"; break;
        case 6: return "#0FACCE"; break;
        case 7: return "#edcf72"; break;
        case 8: return "#edcc61"; break;
        case 9: return "#9c0"; break;
        case 10: return "#33b5e5"; break;
        case 11: return "#FF0000"; break;
        case 12: return "#a6c"; break;
        case 13: return "#93c"; break;
    }
    return "black";
}

function getLetterBackgroundColor(letter) {//获取数字的背景颜色
    switch (letter) {
        case "0": return "#CCC0B3"; break;
        case "A": return "#eee4da"; break;
        case "B": return "#F2DBAF"; break;
        case "C": return "#f2b179"; break;
        case "D": return "#f59563"; break;
        case "E": return "#f67e5f"; break;
        case "F": return "#0FACCE"; break;
        case "G": return "#edcf72"; break;
        case "H": return "#edcc61"; break;
        case "I": return "#9c0"; break;
        case "J": return "#33b5e5"; break;
        case "K": return "#FF0000"; break;
        case "L": return "#a6c"; break;
        case "M": return "#93c"; break;
    }
    return "black";

}

function getLetterNumber(letter) {//获取字母对应的数字
    switch (letter) {
        case "0": return 0; break;
        case 'A': return 1; break;
        case 'B': return 2; break;
        case 'C': return 3; break;
        case 'D': return 4; break;
        case 'E': return 5; break;
        case 'F': return 6; break;
        case 'G': return 7; break;
        case 'H': return 8; break;
        case 'I': return 9; break;
        case 'J': return 10; break;
    }
    return 0;
}

function getNumberLetter(number) {//获取数字对应的字母
    switch (number) {
        case 0: return "0"; break;
        case 1: return "A"; break;
        case 2: return "B"; break;
        case 3: return "C"; break;
        case 4: return "D"; break;
        case 5: return "E"; break;
        case 6: return "F"; break;
        case 7: return "G"; break;
        case 8: return "H"; break;
        case 9: return "I"; break;
        case 10: return "J"; break;
    }
    return "0";
}

function getLetterNumberThree(letter) {//获取字母对应的数字
    switch (letter) {
        case "0": return 0; break;
        case 'a': return 1; break;
        case 'b': return 2; break;
        case 'c': return 3; break;
        case 'd': return 4; break;
        case 'e': return 5; break;
        case 'f': return 6; break;
        case 'g': return 7; break;
        case 'h': return 8; break;
        case 'i': return 9; break;
        case 'j': return 10; break;
    }
    return 0;
}

function getNumberLetterThree(number) {//获取数字对应的字母
    switch (number) {
        case 0: return "0"; break;
        case 1: return "a"; break;
        case 2: return "b"; break;
        case 3: return "c"; break;
        case 4: return "d"; break;
        case 5: return "e"; break;
        case 6: return "f"; break;
        case 7: return "g"; break;
        case 8: return "h"; break;
        case 9: return "i"; break;
        case 10: return "j"; break;
    }
    return "0";
}

function getLetterNumberFour(letter) {//获取字母对应的数字
    switch (letter) {
        case "0": return 0; break;
        case '♠': return 1; break;
        case '♥': return 2; break;
        case '♣': return 3; break;
        case '♦': return 4; break;
        case '♪': return 5; break;
        case '♫': return 6; break;
        case '§': return 7; break;
        case '¶': return 8; break;
        case '∮': return 9; break;
        case '☻': return 10; break;
    }
    return 0;
}

function getNumberLetterFour(number) {//获取数字对应的字母
    switch (number) {
        case 0: return "0"; break;
        case 1: return "♠"; break;
        case 2: return "♥"; break;
        case 3: return "♣"; break;
        case 4: return "♦"; break;
        case 5: return "♪"; break;
        case 6: return "♫"; break;
        case 7: return "§"; break;
        case 8: return "¶"; break;
        case 9: return "∮"; break;
        case 10: return "☻"; break;
    }
    return "0";
}

function getNumberColor(number) {//获取数字的颜色
    if (number <= 5) {
        if (number == 0) {
            return "#CCC0B3";
        }
        return "#776e65";
    }
    return "white";
}

function getLetterColor(letter) {//获取字母字体的颜色
    if (letter <= "E") {
        if (letter == "0") {
            return "#CCC0B3";
        }
        return "#776e65";
    }
    return "white";
}

function initStandardLDF(tempBoard,fixedArr) {//生成一个标准的拉丁方
    var i = parseInt(Math.floor(Math.random() * gameStep));//随机生成一个0至gameStep-1之间的数字
    for (var j = 0; j < gameStep; j++) {
        var t = (i + j) % gameStep;
        for (var k = 0; k < gameStep; k++) {
            tempBoard[j][k] = (k + t) % gameStep + 1;           
        }
    }
    return getFixedNoLDF(initNoStandardLDF(tempBoard),fixedArr);
}

function initNoStandardLDF(tempBoard) {//将标准的拉丁方根据行与行、列与列之间交换
    var temp = 0;
    for (var k = 0; k < gameStep;k++ ) {
        var m = parseInt(Math.floor(Math.random() * gameStep));
        var n = parseInt(Math.floor(Math.random() * gameStep));
        for (var i = 0; i < gameStep; i++) {//列与列之间交换
            temp = tempBoard[i][m];
            tempBoard[i][m] = tempBoard[i][n];
            tempBoard[i][n] = temp;           
        }
        for (var j = 0; j < gameStep; j++) {//行与行之间交换
            temp = tempBoard[m][j];
            tempBoard[m][j] = tempBoard[n][j];
            tempBoard[n][j] = temp;
        }
    }
    return tempBoard;
}

function getFixedNoLDF(tempBoard, fixedArr) {//得到一个非拉丁方和固定的元素

    for (var k = 0; k < gameStep / 2; k++) {
        fixedArr[k] = parseInt(Math.floor(Math.random() * gameStep)) + 1;  //随机获取固定的元素 
    }
    fixedArr = $.unique(fixedArr); //将数组中重复的元素去掉

    var flag = 0;
    var temp = 0;
    for (var i = 0; i < gameStep * gameStep; i++) {
        var m = parseInt(Math.floor(Math.random() * gameStep));
        var b = parseInt(Math.floor(Math.random() * gameStep));
        var n = parseInt(Math.floor(Math.random() * gameStep));

        for (var j = 0; j < fixedArr.length; j++) {
            if (tempBoard[m][b] == fixedArr[j] || tempBoard[b][n] == fixedArr[j]) {
                flag = 1;//表明需要交换的数字与固定的数字冲突
                break;
            }
        }
        if (flag == 0) {
            temp = tempBoard[m][b];
            tempBoard[m][b] = tempBoard[b][n];
            tempBoard[b][n] = temp;
        }
        flag = 0;
    }
    return { arr: tempBoard, fixedArr: fixedArr };
}