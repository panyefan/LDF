var gameStep = 4; //游戏阶数

var challengeGrade = 0; //难度等级，其中0为低难度、1为中难度、2为二维度、3为三维度、4为四维度
var isShowChallengeGrade = false;//是否显示难度等级
var challengeNum = 0; //记录挑战中难度的次数，当为2时，挑战成功

var board = new Array(); //低、中难度所使用的数组
var twoBoard = new Array();//二维度所使用的数组
var threeBoard = new Array();//三维度所使用的数组
var fourBoard = new Array(); //四维度所使用的数组
var fixedArrNumber = new Array(); //保存一维度拉丁方需要固定的元素
var twoFixedArrNumber = new Array(); //保存二维度拉丁方需要固定的元素
var threeFixedArrNumber = new Array(); //保存三维度拉丁方需要固定的元素
var fourFixedArrNumber = new Array(); //保存四维度拉丁方需要固定的元素
var isLDFone = false;//标记一维度的矩阵是否为拉丁方
var isLDFtwo = false; //标记二维度的矩阵是否为拉丁方
var isLDFthree = false; //标记三维度的矩阵是否为拉丁方
var isLDFfour = false; //标记四维度的矩阵是否为拉丁方

var score = 0;//成绩
var allprompt = 0; //记录玩家点击全部提示的次数
var partprompt = 0; //记录玩家点击部分提示的次数
var isNumberRepeat = false;//难度在二维度以上，标记用户点击了部分提示，停止继续查找其他的冲突元素
var isClickHighScore = true; //标记玩家是否已经点击了高分榜
var showDifferGradeScore = 0;//用于在高分榜中显示不同的难度等级成绩，其中0为显示低难度成绩，1为中难度，2为二维度，3为三维度，4为四维度
var timerStartFlag = true; //标记玩家是否第一次点击方块片并计时开始
var clikcurrentItem = null; //记录玩家点击了那个方块片
var promptArr = null;//声明一个全局变量，指向一个提示元素的数组
var sundFlag = true; //标记用户是否关闭了声音
var clickHelpButton = false; //用于标记用户是否点击了帮助按钮
var clickLogButton = false; //用于标记用户是否点击了日记按钮
var helpFlag = 1;//用于标记帮助界面的切换


$(document).ready(function () {

    documentWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width; //当前屏幕有效的宽度$(window).width()
    documentHeight = (window.innerHeight > 0) ? window.innerHeight : screen.Height; //当前屏幕有效的高度$(window).width()
    gridContainerWidth = 0.98 * documentWidth; //整个网格方块的宽度
    cellSapce = gridContainerWidth / gameStep / gameStep; //方块片之间的间隔
    cellSideLength = (gridContainerWidth - cellSapce * (gameStep + 1)) / gameStep; //方块片的宽度
    cellLength = cellSideLength / 2; //二维以上的方块片的宽度

    newgame();
});

function challenge() {//难度等级
    if (!isShowChallengeGrade) {//显示游戏难度等级列表
        insertLog(DIFFICULTYBUTTOONLOG); //插入日记
        isShowChallengeGrade = true;
        if ($("#game-challengeGrade").length >0) {
            $("#game-challengeGrade").show();
        }else{
            var game_message = new String;
            game_message = "<div id=\"game-challengeGrade\" class=\"game-message game-over\"><p>游戏难度等级</p>";
            game_message += "<a id=\"lowGradebutton\" href=\"javascript:diffGrade(0);\" class=\"retry-button\">低难度</a>";
            game_message += "<a id=\"mediumGradebutton\" href=\"javascript:diffGrade(1);\" class=\"retry-button\">中难度</a>";
            game_message += "<a id=\"twoGradebutton\" href=\"javascript:diffGrade(2);\" class=\"retry-button\">二维度</a>";
            game_message += "<a id=\"threeGradebutton\" href=\"javascript:diffGrade(3);\" class=\"retry-button\">三维度</a>";
            game_message += "<a id=\"fourGradebutton\" href=\"javascript:diffGrade(4);\" class=\"retry-button\">四维度</a>";
            game_message += "</div>";
            $("#grid-container").append(game_message);
        }
    } else {
        isShowChallengeGrade = false;
        $("#game-challengeGrade").hide();
    }
}

function upgame() {//上一关

    challengeNum = 0;

    gameStep--;
    insertLog(UPPASSBUTTOONLOG); //插入日记
    newgame();
}

function nextgame() {//下一关

    challengeNum = 0;

    gameStep++;
    insertLog(NEXTPASSBUTTOONLOG); //插入日记
    newgame();    
}

function newgame() {
    hideShow(); //关卡按钮显示
    clearMessage(); //清除胜利界面
    prepareForMobile(); //设置网格和方块片大小
    initGridNum(); //初始化方块片的分布及随机产生数字方块片
    numberPanel(); //数字输入面板初始化
    numberDrag(); //数字拖拽事件初始化

    insertLog(INTOGAMELOG); //插入日记
    insertDifferGradeDiary(INITGAMELOG); //插入拉丁方矩阵序列的日记
}

function clearMessage() {
    if (challengeGrade == 1 && challengeNum == 1) {//中难度
        //中难度，时间不重置
    }
    else {
        reset(); //时间重置
        score = 0;
        $("#score").text(score);
        allprompt = 0; //记录玩家点击全部提示的次数
        partprompt = 0;
        challengeNum = 0;
    }
    $('#grid-container #game-message').remove(); //将胜利界面移除
    $("#helpShow").hide();//帮助界面
    $("#logDIV").hide(); //日记界面
    showDifferGradeScore = 0; //高分榜中查看不同等级成绩按钮的计数
}

function hideShow() {
    timerStartFlag = true;
    $('#upgamebutton').show();
    $('#nextgamebutton').show();
    if (gameStep == 4) {
        $('#upgamebutton').hide();
    }
    if (gameStep == 5) {
        $('#upgamebutton').show();
    }
    if (gameStep == 9) {
        $('#nextgamebutton').show();
    }
    if (gameStep == 10) {
        $('#nextgamebutton').hide();
    }
    if (JSON.parse(localStorage.getItem("passLDF" + gameStep)) != null) {//用于判断本地存储中是否存在关于本游戏的数据记录       
        if (challengeGrade == 0) {
            if (JSON.parse(localStorage.getItem("passLDF" + gameStep)).flag == "0") {
                $('#nextgamebutton').hide();//在当前游戏难度，阶数还没有玩通关的关卡中的下一关按钮隐藏
            }
        } else if (challengeGrade == 1) {
            if (JSON.parse(localStorage.getItem("HpassLDF" + gameStep)).flag == "0") {
                $('#nextgamebutton').hide();
            }
        } else if (challengeGrade == 2) {
            if (JSON.parse(localStorage.getItem("twopassLDF" + gameStep)).flag == "0") {
                $('#nextgamebutton').hide();
            }
        } else if (challengeGrade == 3) {
            if (JSON.parse(localStorage.getItem("threepassLDF" + gameStep)).flag == "0") {
                $('#nextgamebutton').hide();
            }
        } else {
            if (JSON.parse(localStorage.getItem("fourpassLDF" + gameStep)).flag == "0") {
                $('#nextgamebutton').hide();
            }
        }        
    }
    if (challengeGrade == 1 && challengeNum == 1) {//中难度
        $('#newgamebutton').hide();//即出现ABCD矩阵时，将重新开始按钮隐藏
    } else {
        $('#newgamebutton').show();
    }
}

function prepareForMobile() {
//    if (documentWidth > 500) {//屏幕大于500时，采用固定式大小
//        gridContainerWidth = 500;
//    }
    if (!navigator.userAgent.match(/mobile/i)) {//不是移动设备并小于固定的高度##############################################注意，放到移动设备上时，这里要注释掉
        gridContainerWidth = documentHeight - 154;
    }//##################################################
    cellSapce = gridContainerWidth / gameStep / gameStep;//方块片之间的宽度
    cellSideLength = (gridContainerWidth - cellSapce * (gameStep + 1)) / gameStep;//低、中难度的方块片的宽度
    cellLength = cellSideLength / 2;//二维以上方块片的宽度

    if (challengeGrade >= 2) {//如果难度在二维度以上，将大的方块片宽度缩短一半，这是为了方便方块片拖拽函数的计算
        cellSideLength = cellLength;
    }

    numberPanelWidth = gridContainerWidth - cellSapce * 2;  //数字输入面板宽度
    numberCellSapce = numberPanelWidth / 5 / 5;  //数字输入方块片之间的间隔
    numberCellWidth = (numberPanelWidth - numberCellSapce * 6) / 5;  //数字输入方块片的宽度
    numberPanelHeight = numberCellWidth * 2 + numberCellSapce * 3; //数字输入面板高度

    $('#grid-container').css('width', gridContainerWidth - 2 * cellSapce);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSapce);
    $('#grid-container').css('padding', cellSapce);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth); //边缘半径

    //帮助界面
    $("#helpShow").css("width", gridContainerWidth-10 + "px");
    $("#helpShow").css("height", gridContainerWidth-10 + "px");
    $("#helpDiv").css("left", $('#grid-container').offset().left+5);
    $("#helpDiv").css("top", $('#grid-container').offset().top+5);
    $("#helpDiv").css("z-index", 99999);
    $("#helpDiv").css("position", "absolute");

    //日记界面
    $("#logDIV").css("width", gridContainerWidth - 16 + "px");
    $("#logDIV").css("height", gridContainerWidth - 16 + "px");
    $("#logDIV").css("left", $('#grid-container').offset().left + 5);
    $("#logDIV").css("top", $('#grid-container').offset().top + 5);
    $("#logDIV").css("z-index", 9999);
    $("#logDIV").css("position", "absolute");

    $(".saveDIV").css("width", gridContainerWidth - 10 + "px"); //设置保存按钮的DIV的宽度
    $(".savebutton").css("margin-left", gridContainerWidth/2 - 20 + "px"); 
}

function initGridNum() {
    init();
    generateOneNumber(); //随机初始化一个非拉丁方矩阵
}

function getNumTop(i, j) {//获取当前数字输入方块片的距离顶端的距离
    return numberCellSapce + i * (numberCellSapce + numberCellWidth);
}

function getNumLeft(i, j) {//获取当前数字输入方块片距离左边的距离
    return numberCellSapce + j * (numberCellSapce + numberCellWidth);
}

function getPosTop(i, j) {//获取当前方块片的距离顶端的距离
    return cellSapce + i * (cellSapce + cellSideLength);
}

function getPosLeft(i, j) {//获取当前方块片距离左边的距离
    return cellSapce + j * (cellSapce + cellSideLength);
}

function getGridTop(i, j, grade) {//获取当前方块片的距离顶端的距离（二维度以上）
    if (grade == 1) {
        return cellSapce + i * (cellLength + cellLength + cellSapce);
    }
    if (grade == 2) {
        return cellSapce + i * (cellLength + cellLength + cellSapce);
    }
    if (grade == 3) {
        return cellSapce + cellLength + i * (cellLength + cellSapce + cellLength);
    }
    if (grade == 4) {
        return cellSapce + cellLength + i * (cellLength + cellSapce + cellLength);
    }
}

function getGridLeft(i, j, grade) {//获取当前方块片距离左边的距离（二维度以上）
    if (grade == 1) {
        return cellSapce + j * (cellLength + cellLength + cellSapce);
    }
    if (grade == 2) {
        return cellSapce + cellLength + j * (cellLength + cellSapce + cellLength);
    }
    if (grade == 3) {
        return cellSapce + j * (cellLength + cellLength + cellSapce);
    }
    if (grade == 4) {
        return cellSapce + cellLength + j * (cellLength + cellSapce + cellLength);
    }
}

function nospace(arr) {//判断网格内的方块片是否全部填满，填满返回true
    var obj = new Object();
    for (var i = 0; i < gameStep; i++) {
        for (var j = 0; j < gameStep; j++) {
            if (arr[i][j] == 0) {
                obj.i = i;
                obj.j = j;
                obj.flag = false;

                return obj;
            }
        }
    }
    obj.flag = true;  
    return obj;
}


function init() {

    $(".grid-cell").remove(); //将所有的grid-cell层移除掉
    var gridCell = new String;
    for (var i = 0; i < gameStep; i++) {
        for (var j = 0; j < gameStep; j++) {
            if (challengeGrade == 2) {//难度等级为二维度
                gridCell += "<div class=\"grid-cell\" id=\"grid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"twoGrid-cell-" + i + "-" + j + "\"></div>";
            } else if (challengeGrade == 3) {
                gridCell += "<div class=\"grid-cell\" id=\"grid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"twoGrid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"threeGrid-cell-" + i + "-" + j + "\"></div>";
            } else if (challengeGrade == 4) {
                gridCell += "<div class=\"grid-cell\" id=\"grid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"twoGrid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"threeGrid-cell-" + i + "-" + j + "\"></div>";
                gridCell += "<div class=\"grid-cell\" id=\"fourGrid-cell-" + i + "-" + j + "\"></div>";
            } else {
                gridCell += "<div class=\"grid-cell\" id=\"grid-cell-" + i + "-" + j + "\"></div>";
            }
        }
    }
    $("#grid-container").append(gridCell); //重新生成grid-cell层

    if (challengeGrade >= 2) {//游戏难度在二维度以上，设置grid-cell层统一的宽度和高度
        $('.grid-cell').css('width', cellLength);
        $('.grid-cell').css('height', cellLength);
    } else {
        $('.grid-cell').css('width', cellSideLength);
        $('.grid-cell').css('height', cellSideLength);
    }

    for (var i = 0; i < gameStep; i++) {//初始化方块片位置的分布
        for (var j = 0; j < gameStep; j++) {
            if (challengeGrade == 2) {//难度等级为二维度
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css('top', getGridTop(i, j, 1));
                gridCell.css('left', getGridLeft(i, j, 1));
                var twoGridCell = $("#twoGrid-cell-" + i + "-" + j);
                twoGridCell.css('top', getGridTop(i, j, 2));
                twoGridCell.css('left', getGridLeft(i, j, 2));
            } else if (challengeGrade == 3) {
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css('top', getGridTop(i, j, 1));
                gridCell.css('left', getGridLeft(i, j, 1));
                var twoGridCell = $("#twoGrid-cell-" + i + "-" + j);
                twoGridCell.css('top', getGridTop(i, j, 2));
                twoGridCell.css('left', getGridLeft(i, j, 2));
                var threeGridCell = $("#threeGrid-cell-" + i + "-" + j);
                threeGridCell.css('top', getGridTop(i, j, 3));
                threeGridCell.css('left', getGridLeft(i, j, 3));
            } else if (challengeGrade == 4) {
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css('top', getGridTop(i, j, 1));
                gridCell.css('left', getGridLeft(i, j, 1));
                var twoGridCell = $("#twoGrid-cell-" + i + "-" + j);
                twoGridCell.css('top', getGridTop(i, j, 2));
                twoGridCell.css('left', getGridLeft(i, j, 2));
                var threeGridCell = $("#threeGrid-cell-" + i + "-" + j);
                threeGridCell.css('top', getGridTop(i, j, 3));
                threeGridCell.css('left', getGridLeft(i, j, 3));
                var fourGridCell = $("#fourGrid-cell-" + i + "-" + j);
                fourGridCell.css('top', getGridTop(i, j, 4));
                fourGridCell.css('left', getGridLeft(i, j, 4));
            } else {
                var gridCell = $("#grid-cell-" + i + "-" + j);
                gridCell.css('top', getPosTop(i, j));
                gridCell.css('left', getPosLeft(i, j));
            }          
        }
    }

    for (var i = 0; i < gameStep; i++) {//初始化数组
        board[i] = new Array();
        twoBoard[i] = new Array();
        threeBoard[i] = new Array();
        fourBoard[i] = new Array();
        for (var j = 0; j < gameStep; j++) {
            board[i][j] = 0;
            twoBoard[i][j] = 0;
            threeBoard[i][j] = 0;
            fourBoard[i][j] = 0;
        }
    }
    updateBoardView();

    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();//将所有的数字方块片移除掉
    for (var i = 0; i < gameStep; i++) {
        for (var j = 0; j < gameStep; j++) {
            if (challengeGrade == 2) {//难度等级为二维度
                //添加数字方块片
                $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="twoNumber-cell-' + i + '-' + j + '"></div>');
                var theNumberCell = $("#number-cell-" + i + "-" + j);
                var twoNumberCell = $("#twoNumber-cell-" + i + "-" + j);
                $(theNumberCell).attr({ m: i, n: j, grade: 1 });  //为每个数字方块片添加自定义属性下标值，grade为1表明为低、中难度，2为二维度，3为三维度，4为四维度
                $(twoNumberCell).attr({ m: i, n: j, grade: 2 });
                theNumberCell.css('top', getGridTop(i, j, 1));
                theNumberCell.css('left', getGridLeft(i, j, 1));
                twoNumberCell.css('top', getGridTop(i, j, 2));
                twoNumberCell.css('left', getGridLeft(i, j, 2));
            } else if (challengeGrade == 3) {
                $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="twoNumber-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="threeNumber-cell-' + i + '-' + j + '"></div>');
                var theNumberCell = $("#number-cell-" + i + "-" + j);
                var twoNumberCell = $("#twoNumber-cell-" + i + "-" + j);
                var threeNumberCell = $("#threeNumber-cell-" + i + "-" + j);
                $(theNumberCell).attr({ m: i, n: j, grade: 1 });  //为每个数字方块片添加自定义属性下标值，grade为1表明为低、中难度，2为二维度，3为三维度，4为四维度
                $(twoNumberCell).attr({ m: i, n: j, grade: 2 });
                $(threeNumberCell).attr({ m: i, n: j, grade: 3 });
                theNumberCell.css('top', getGridTop(i, j, 1));
                theNumberCell.css('left', getGridLeft(i, j, 1));
                twoNumberCell.css('top', getGridTop(i, j, 2));
                twoNumberCell.css('left', getGridLeft(i, j, 2));
                threeNumberCell.css('top', getGridTop(i, j, 3));
                threeNumberCell.css('left', getGridLeft(i, j, 3));
            } else if (challengeGrade == 4) {
                $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="twoNumber-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="threeNumber-cell-' + i + '-' + j + '"></div>');
                $("#grid-container").append('<div class="number-cell" id="fourNumber-cell-' + i + '-' + j + '"></div>');
                var theNumberCell = $("#number-cell-" + i + "-" + j);
                var twoNumberCell = $("#twoNumber-cell-" + i + "-" + j);
                var threeNumberCell = $("#threeNumber-cell-" + i + "-" + j);
                var fourNumberCell = $("#fourNumber-cell-" + i + "-" + j);
                $(theNumberCell).attr({ m: i, n: j, grade: 1 });  //为每个数字方块片添加自定义属性下标值，grade为1表明为低、中难度，2为二维度，3为三维度，4为四维度
                $(twoNumberCell).attr({ m: i, n: j, grade: 2 });
                $(threeNumberCell).attr({ m: i, n: j, grade: 3 });
                $(fourNumberCell).attr({ m: i, n: j, grade: 4 });
                theNumberCell.css('top', getGridTop(i, j, 1));
                theNumberCell.css('left', getGridLeft(i, j, 1));
                twoNumberCell.css('top', getGridTop(i, j, 2));
                twoNumberCell.css('left', getGridLeft(i, j, 2));
                threeNumberCell.css('top', getGridTop(i, j, 3));
                threeNumberCell.css('left', getGridLeft(i, j, 3));
                fourNumberCell.css('top', getGridTop(i, j, 4));
                fourNumberCell.css('left', getGridLeft(i, j, 4));
            } else {
                //添加数字方块片
                $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
                var theNumberCell = $("#number-cell-" + i + "-" + j);
                $(theNumberCell).attr({ m: i, n: j, grade: 1 });  //为每个数字方块片添加自定义属性下标值，grade为1表明为低、中难度，2为二维度，3为三维度，4为四维度
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
            }           
        }
    }

    $('.number-cell').css('color', getNumberBackgroundColor(0));
    $('.number-cell').text(0);//所有的数字方块片默认显示为0

    if (challengeGrade >= 2) {//游戏难度在二维度以上，设置number-cell层统一的宽度和高度
        $('.number-cell').css('width', cellLength);
        $('.number-cell').css('height', cellLength);
        $('.number-cell').css('line-height', cellLength + 'px'); //设置数字行高
        $('.number-cell').css('font-size', 0.8 * cellLength + 'px'); //设置数字大小
    } else {
        $('.number-cell').css('width', cellSideLength);
        $('.number-cell').css('height', cellSideLength);
        $('.number-cell').css('line-height', cellSideLength + 'px'); //设置数字行高
        $('.number-cell').css('font-size', 0.8 * cellSideLength + 'px'); //设置数字大小
    }
}

function generateOneNumber() {//随机初始化一个非拉丁方矩阵
    if (challengeGrade == 2) {
        var arr1 = initStandardLDF(board, fixedArrNumber);//获取一个非拉丁方矩阵和固定的元素
        var arr2 = initStandardLDF(twoBoard,twoFixedArrNumber);
        for (var i = 0; i < gameStep;i++ ) {
            for (var j = 0; j < gameStep; j++) {
                $("#number-cell-" + i + "-" + j).text(arr1.arr[i][j]);
                $("#twoNumber-cell-" + i + "-" + j).text(getNumberLetter(arr2.arr[i][j]));
            }
        }
        $(".number-cell").css('color', getNumberColor(1));
        showFixedNumber(arr1, "number-cell", 11);
        showFixedNumber(arr2, "twoNumber-cell", 3);
    } else if (challengeGrade == 3) {
        var arr1 = initStandardLDF(board, fixedArrNumber);
        var arr2 = initStandardLDF(twoBoard, twoFixedArrNumber);
        var arr3 = initStandardLDF(threeBoard, threeFixedArrNumber);
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                $("#number-cell-" + i + "-" + j).text(arr1.arr[i][j]);
                $("#twoNumber-cell-" + i + "-" + j).text(getNumberLetter(arr2.arr[i][j]));
                $("#threeNumber-cell-" + i + "-" + j).text(getNumberLetterThree(arr3.arr[i][j]));
            }
        }
        $(".number-cell").css('color', getNumberColor(1));
        showFixedNumber(arr1, "number-cell", 11);
        showFixedNumber(arr2, "twoNumber-cell", 3);
        showFixedNumber(arr3, "threeNumber-cell", 5);
    } else if (challengeGrade == 4) {
        var arr1 = initStandardLDF(board, fixedArrNumber);
        var arr2 = initStandardLDF(twoBoard, twoFixedArrNumber);
        var arr3 = initStandardLDF(threeBoard, threeFixedArrNumber);
        var arr4 = initStandardLDF(fourBoard, fourFixedArrNumber);
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                $("#number-cell-" + i + "-" + j).text(arr1.arr[i][j]);
                $("#twoNumber-cell-" + i + "-" + j).text(getNumberLetter(arr2.arr[i][j]));
                $("#threeNumber-cell-" + i + "-" + j).text(getNumberLetterThree(arr3.arr[i][j]));
                $("#fourNumber-cell-" + i + "-" + j).text(getNumberLetterFour(arr4.arr[i][j]));
            }
        }
        $(".number-cell").css('color', getNumberColor(1));
        showFixedNumber(arr1, "number-cell", 11);
        showFixedNumber(arr2, "twoNumber-cell", 3);
        showFixedNumber(arr3, "threeNumber-cell", 5);
        showFixedNumber(arr4, "fourNumber-cell", 8);
    } else {
        var randNumber = 1;
        for (var i = 1; i <= gameStep; i++) {
            var randx = parseInt(Math.floor(Math.random() * gameStep));
            var randy = parseInt(Math.floor(Math.random() * gameStep));
            board[randx][randy] = randNumber;
            var currentFixedItem = $("#number-cell-" + randx + "-" + randy);

            currentFixedItem.css('background-color', getNumberBackgroundColor(11)); //将固定的数字用红色背景显示出来
            currentFixedItem.css('color', getNumberColor(6));
            if (challengeGrade == 1 && challengeNum == 1) {//中难度
                currentFixedItem.text(getNumberLetter(randNumber));
            } else {
                currentFixedItem.text(randNumber);
            }

            currentFixedItem.attr({ fixed: 1 }); //将其标记为固定方块片
            randNumber++;
        }
    }
}

function showFixedNumber(array, str,colorID) {//遍历出固定的方块片
    for (var k = 0; k < array.fixedArr.length; k++) {
        for (var i = 0; i < gameStep; i++) {
            for (var j = 0; j < gameStep; j++) {
                if (array.fixedArr[k] == array.arr[i][j]) {
                    var fixedItem = $("#"+str+"-" + i + "-" + j);
                    fixedItem.css('background-color', getNumberBackgroundColor(colorID)); //将固定的数字用红色背景显示出来
                    fixedItem.css('color', getNumberColor(6));
                    fixedItem.attr({ fixed: 1 }); //将其标记为固定方块片
                }
            }
        }
    }
}

$(document).ready(function () {
    //localStorage.clear();
    if (window.localStorage) {//支持localStorage
        if (localStorage.getItem("passLDF4") == null) {//本地成绩不存在，即是第一次玩本游戏
            createScoreStorage(); //初始化成绩数据
            $("#helpShow").show(); //显示帮助界面
        }
    }
    else {
        alert("你的浏览器不支持本地存储，请更新至最新版本或者使用其他浏览器试试！");
        insertLog(LOCALSTORAGEINFOLOG); //插入日记
    }

    var isMobile = {//判断是否是用 移动设备 浏览的
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        $("#help").remove();
        $("#sound").remove();
        $("#log").remove();
        $("<img id=\"help\" alt=\"\" src=\"images/help.png\"/>").appendTo("body");
        $("<img id=\"log\" alt=\"\" src=\"images/log.png\"/>").appendTo("body");
        $("<img id=\"sound\" alt=\"\" src=\"images/openSound.png\"/>").appendTo("body");
    }

    //声音控制
    $("#sound").bind("click", function () {
        if (sundFlag) {
            sundFlag = false;
            $("#sound").attr("src", "images/closeSound.png");
            insertLog(CLOSESOUNDBUTTOONLOG); //插入日记
        } else {
            sundFlag = true;
            $("#sound").attr("src", "images/openSound.png");
            insertLog(OPENSOUNDBUTTOONLOG); //插入日记
        }
    })

    //帮助
    $("#help").bind("click", function () {
        if (!clickHelpButton) {
            insertLog(LOOKHELPBUTTOONLOG); //插入日记
            clickHelpButton = true;
            $("#helpShow").show();
        } else {
            insertLog(CLOSEHELPBUTTOONLOG); //插入日记
            clickHelpButton = false;
            helpFlag = 1;
            $("#helpShow").attr("src", "images/1.png");
            $("#helpShow").hide();
        }
    })

    //日记
    $("#log").bind("click", function () {
        if (!clickLogButton) {
            insertLog(LOOKLOGBUTTOONLOG); //插入日记
            clickLogButton = true;
            $("#logDIV").show();
        } else {
            insertLog(CLOSLOGBUTTOONLOG); //插入日记
            clickLogButton = false;
            $("#logDIV").hide();
        }
    })


    //用户点击帮助界面时进行的切换
    $("#helpShow").bind("click", function () {
        helpFlag++;
        if (2 == helpFlag) {
            $("#helpShow").attr("src", "images/2.png");
        } else if (3 == helpFlag) {
            $("#helpShow").attr("src", "images/3.png");
        } else if (4 == helpFlag) {
            $("#helpShow").attr("src", "images/4.png");
        } else {
            helpFlag = 1;
            clickHelpButton = false;
            $("#helpShow").attr("src", "images/1.png");
            $("#helpShow").hide();
        }
    })

});