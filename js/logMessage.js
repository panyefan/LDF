
var UPPASSBUTTOONLOG = " [按钮] 上一关";
var NEXTPASSBUTTOONLOG = " [按钮] 下一关|继续前进";
var TWOPROMPTBUTTOONLOG = " [按钮] 两分提示";
var FIVEPROMPTBUTTOONLOG = " [按钮] 五分提示";
var DIFFICULTYBUTTOONLOG = " [按钮] 难度等级";
var ZEROBUTTOONLOG = " [按钮] 低难度";
var ONEBUTTOONLOG = " [按钮] 中难度";
var TWOBUTTOONLOG = " [按钮] 二维度";
var THREEBUTTOONLOG = " [按钮] 三维度";
var FOURBUTTOONLOG = " [按钮] 四维度";
var OPENHIGHSCOREBUTTOONLOG = " [按钮] 查看高分榜";
var CLOSEHIGHSCOREBUTTOONLOG = " [按钮] 关闭高分榜";
var LOOKHIGHSCOREBUTTOONLOG = " [按钮] 查看中难度成绩榜";
var LOOKLOWSCOREBUTTOONLOG = " [按钮] 查看低难度成绩榜";
var DEKARONBUTTOONLOG = " [按钮] 我来挑战";
var OPENSOUNDBUTTOONLOG = " [按钮] 打开声音";
var CLOSESOUNDBUTTOONLOG = " [按钮] 关闭声音";
var LOOKHELPBUTTOONLOG = " [按钮] 查看帮助";
var CLOSEHELPBUTTOONLOG = " [按钮] 关闭帮助";
var LOOKLOGBUTTOONLOG = " [按钮] 查看日记";
var CLOSLOGBUTTOONLOG = " [按钮] 关闭日记";
var INTOGAMELOG = " [游戏|按钮|按钮] 进入游戏|重新开始|再试一次";
var INITGAMELOG = " [游戏] 初始化的矩阵";
var LDFGAMELOG = " [游戏] 拉丁方矩阵";
var SWAPGAMELOG = " [游戏] 交换数字";
var INPUTGAMELOG = " [游戏] 输入数字";
var WINLOG = " [胜利] 游戏胜利（低难度）";
var HIGHWINLOG = " [胜利] 游戏胜利（中难度）";
var NEWHIGHWINLOG = " [胜利] 刷新成绩";
var FAILURELOG = " [失败] 游戏失败";
var LOCALSTORAGEINFOLOG = " [信息] 浏览器不支持本地存储";


var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

//插入日记
function insertLog(logStr) {
    $("#logInfo").append(currentTime() + " " + logStr+"\n");
}

//获取系统当前时间
function currentTime() {
    var d = new Date();
    return d.toLocaleString();
}

function insertDifferGradeDiary(str) {//插入日记，游戏胜利后插入当前难度的拉丁方矩阵序列
    if (challengeGrade == 2) {
        matrixSequence(str + "(一维度)", board); //插入日记，matrixSequence该函数用于插入矩阵的序列
        matrixSequence(str + "(二维度)", twoBoard);
    } else if (challengeGrade == 3) {
        matrixSequence(str + "(一维度)", board);
        matrixSequence(str + "(二维度)", twoBoard);
        matrixSequence(str + "(三维度)", threeBoard);
    } else if (challengeGrade == 4) {
        matrixSequence(str + "(一维度)", board);
        matrixSequence(str + "(二维度)", twoBoard);
        matrixSequence(str + "(三维度)", threeBoard);
        matrixSequence(str + "(四维度)", fourBoard);
    } else {
        matrixSequence(str, board);
    }
}

function matrixSequence(str, tempBoard) {//获取矩阵的初始换序列（用于插入日记使用）
    var boardStr = "";
    for (var i = 0; i < gameStep; i++) {
        for (var j = 0; j < gameStep; j++) {
            boardStr += tempBoard[i][j] + " ";
        }
    }
    insertLog(str + boardStr); //插入日记
}



window.onload = function () {
    var save = document.getElementById("save");
    // IE
    if (/msie/i.test(navigator.userAgent)) {
        save.onclick = function () {
            var path = prompt("输入保存路径和文件名", "C:\\logLDF.txt");
            var content = document.getElementById("logInfo").value;
            content = content.replace(/\n/g, "\r\n");
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var s = fso.CreateTextFile(path, true);
            s.WriteLine(content);
            s.Close();
        };
    }
    // Firefox/Chrome/Safari/Opera
    else {
        // 鼠标经过 a 的时候就开始 base64 编码
        save.onmouseover = function () {
            var content = document.getElementById("logInfo").value;
            this.setAttribute("href","data:application/octet-stream;base64,"+ Base64.encode(content));
        };
    }
};