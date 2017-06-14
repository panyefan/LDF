
function numberPanel() {//所有的元素输入面板初始化

    $('.numberPanel-cell').attr("style", { "background-color": "", "color": "" });
    $('.numberPanel-cell span').text('');

    var step = 1;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 5; j++) {
            var numberPanelCell = $("#numberPanel-cell-" + i + "-" + j);
            numberPanelCell.css('width', numberCellWidth);
            numberPanelCell.css('height', numberCellWidth);
            numberPanelCell.css('top', getNumTop(i, j));
            numberPanelCell.css('left', getNumLeft(i, j));
            if (step <= gameStep) {
                numberPanelCell.css('background-color', getNumberBackgroundColor(step));
                numberPanelCell.css('color', getNumberColor(step));
                numberPanelCell.css('font-size', 0.8 * numberCellWidth); //设置数字大小
                if (challengeGrade == 1 && challengeNum == 1) {//中难度
                    $("#numberPanel-cell-" + i + "-" + j + " span").text(getNumberLetter(step));
                } else {
                    $("#numberPanel-cell-" + i + "-" + j + " span").text(step);
                }
            }
            step++;
        }
    }

    //  contentType = content.substring(0, content.indexOf(":"));//分割字符串，如id:add得到id
    //    content = content.substring(content.indexOf(":") + 1, content.length); //得到add
    //    $("#floatBox").html($("#" + content + "").html());

    //点击隐藏数字输入面板
    $("#floatBoxBg").click(function () {
        closeNumberPanel();
    });
}

function promptNumberPanel() {//提示元素输入面板初始化

    $('.numberPanel-cell').attr("style", { "background-color": "", "color": "" });
    $('.numberPanel-cell span').text('');

    var step = 0;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 5; j++) {
            var numberPanelCell = $("#numberPanel-cell-" + i + "-" + j);
            numberPanelCell.css('width', numberCellWidth);
            numberPanelCell.css('height', numberCellWidth);
            numberPanelCell.css('top', getNumTop(i, j));
            numberPanelCell.css('left', getNumLeft(i, j));
            if (step < promptArr.length) {
                numberPanelCell.css('background-color', getNumberBackgroundColor(promptArr[step]));
                numberPanelCell.css('color', getNumberColor(promptArr[step]));
                numberPanelCell.css('font-size', 0.8 * numberCellWidth); //设置数字大小
                if (challengeGrade == 1 && challengeNum == 1) {//中难度
                    $("#numberPanel-cell-" + i + "-" + j + " span").text(getNumberLetter(promptArr[step]));
                } else {
                    $("#numberPanel-cell-" + i + "-" + j + " span").text(promptArr[step]);
                }
            }
            step++;
        }
    }

    //点击隐藏数字输入面板
    $("#floatBoxBg").click(function () {
        closeNumberPanel();
    });
}

$(function () {//初始化数字输入面板的鼠标事件\##################################
    $("#numberPanel .numberPanel-cell").each(function (i) {
        this.init = function () {
            this.numberClick();
        },
        this.numberClick = function () {

            //**********************************触摸事件
            var id = $(this).attr("id");
            document.getElementById(id).addEventListener('touchstart', function (e) {
                e.preventDefault();
                NumberPanelMouseOrTouchStart(this);
            });

            //*********************************鼠标事件
            $(this).mousedown(function (e) {
                e.preventDefault();
                NumberPanelMouseOrTouchStart(this);
            });
            //            $(document).mouseup(function (e) {
            //                e.preventDefault();
            //            });
        }
        this.init(); //此循环函数入口
    });
});


function NumberPanelMouseOrTouchStart(clikItem) {//将用户点击输入面板上的数字填充到相应的方块片中
    var Num = $(clikItem).text();
    if (Num == "") {
        return false;
    }
    else {
        insertLog(INPUTGAMELOG + $(clikcurrentItem).text() + "-->" + Num); //插入日记
        $(clikcurrentItem).text(Num);        
        //重新对方块片上色getLetterBackgroundColor getLetterColor
        if (sundFlag) {
            $('#chatAudio')[0].play(); //播放声音
        }
        if (challengeGrade == 1 && challengeNum == 1) {//中难度
            $(clikcurrentItem).css('background-color', getLetterBackgroundColor(Num));
            $(clikcurrentItem).css('color', getLetterColor(Num));
            board[parseInt($(clikcurrentItem).attr('m'))][parseInt($(clikcurrentItem).attr('n'))] = parseInt(getLetterNumber($(clikcurrentItem).text()));
        } else {
            $(clikcurrentItem).css('background-color', getNumberBackgroundColor(parseInt(Num)));
            $(clikcurrentItem).css('color', getNumberColor(parseInt(Num)));
            board[parseInt($(clikcurrentItem).attr('m'))][parseInt($(clikcurrentItem).attr('n'))] = parseInt($(clikcurrentItem).text());
        }

        closeNumberPanel();
        if (nospace(board).flag) {//判断是否填满数字
            if (onlyOne(clikcurrentItem).flag) {
                if (isLDF(clikcurrentItem)) {
                    if (challengeGrade == 0 && challengeNum == 0) {//低难度
                        youWin();
                    } else {//中难度挑战
                        challengeNum++;
                        if (challengeNum == 1) {
                            newgame();
                        }
                        if (challengeNum == 2) {
                            challengeNum = 0;
                            youWin();
                        }
                    }
                }
            }
        } 
    }
}

function showNumberPanel() {//显示数字输入面板
    $("#floatBoxBg").show();
    $("#floatBoxBg").animate({ opacity: "0" }, 0);
    $("#floatBox").css({ display: "block", left: (($(document).width()) / 2 - (numberPanelWidth / 2)) +4+ "px", top: (($(document).scrollTop()) / 2 - numberPanelHeight / 2) + "px", width: numberPanelWidth, height: numberPanelHeight }); //-4
    $("#floatBox").animate({ top: ($(document).scrollTop() + 302) + "px" }, 0);
}

function closeNumberPanel() {//隐藏数字输入面板
    $("#floatBoxBg").hide();
    $("#floatBox").hide();

    if (promptArr.length != 0) {//判断提示元素数组是否为空

        numberPanel(); //重新初始化所有元素提示面板
        promptArr.length = 0;//将数组置为空
    }
}

function showInputNumber(currentItems,board) {//将用户点击的方块片赋值给clikcurrentItem变量,参数currentItems为方块片对象，board为提示元素数组

    clikcurrentItem = currentItems;
    if (board.length != 0) {
        promptArr = board;
        promptNumberPanel();//提示元素面板初始化
    }
    showNumberPanel();
}

