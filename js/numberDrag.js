
function numberDrag() {//数字拖拽交换

    $(function () {//当页面加载完毕时执行这个函数
        function Pointer(x, y) {//坐标
            this.x = x;
            this.y = y;
        }
        function Position(left, top) {//位置
            this.left = left;
            this.top = top;
        }
        $("#grid-container .number-cell").each(function (i) {//为每一个方块片添加拖拽、移动、碰撞、交换位置效果
            this.init = function () {
                this.box = $(this); //获取本方块片对象               

                this.drag(); //调用拖拽函数
            },
			this.move = function (callback) {  //移动时的动画效果

			    $(this).stop(true).animate({
			        /*
			        animate(params,[speed],[easing],[fn])创建自定义动画

			        params:一组包含作为动画属性和终值的样式属性和及其值的集合

			        speed:三种预定速度之一的字符串("slow","normal", or "fast")或表示动画时长的毫秒数值(如：1000)

			        easing:要使用的擦除效果的名称(需要插件支持).默认jQuery提供"linear" 和 "swing".

			        fn:在动画完成时执行的函数，每个元素执行一次
			        */

			        left: newPosition.left,
			        top: newPosition.top
			    }, 0, function () {
			        if (callback) {
			            callback.call(this);
			        }
			    });
			},
            this.collisionCheck = function () {//碰撞检测
                var currentItem = this;
                var isSwap = false;
                $(this).siblings(".number-cell").each(function () {//sibling，找到每个div的所有同辈元素中带有类名为number-cell的元素
                    //                    var a = currentItem.pointer.x; //拖拽块相对于大方块片的坐标
                    //                    var b = currentItem.pointer.y;
                    //                    var e = this.box.offset().left; //方块片相对于浏览器原点的坐标
                    //                    var f = this.box.offset().top;
                    //                    var dx = $(this).position().left; //方块片相对于大方块片的位置坐标
                    //                    var dy = $(this).position().top;

                    if (
                    //循环遍历检测当前方块片与别的方块片是否重叠，是否都是同一个维度的
                        currentItem.pointer.x >= $(this).position().left &&
						currentItem.pointer.y >= $(this).position().top &&
						(currentItem.pointer.x <= $(this).position().left + cellSideLength) &&
						(currentItem.pointer.y <= $(this).position().top + cellSideLength) &&
                        ($(currentItem).attr('grade') == $(this).attr('grade'))
            		) {
                        var overlapWidth = $(this).position().left - currentItem.pointer.x + cellSideLength;
                        var overlapHeight = $(this).position().top - currentItem.pointer.y + cellSideLength;

                        if ((overlapWidth * overlapHeight) / (cellSideLength * cellSideLength) >= 0.04) {//重叠区域大于4%
                            overlapOldPosition.left = $(this).position().left; //保存被碰撞块原来的位置
                            overlapOldPosition.top = $(this).position().top;
                            if ($(this).attr('fixed') != "1") {//判断被碰撞块不是固定方块片
                                isSwap = this.swap(currentItem, this); //方块片交换数字

                                if (challengeGrade == 0 || challengeGrade == 1) {//难度在低、中难度
                                    if (nospace(board).flag) {//判断是否填满数字                                
                                        if (onlyOne(this)) {
                                            if (isLDF(this)) {
                                                if (challengeGrade == 0 && challengeNum == 0) {
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
                                } else {//难度在二维度以上
                                    if (onlyOne(this)) {
                                        if (isLDF(this)) {
                                            isLDFone = false;
                                            isLDFtwo = false;
                                            isLDFthree = false;
                                            isLDFfour = false; 
                                            youWin();
                                        }
                                    }
                                }

                            }
                        }
                        return false; //跳出each循坏
                    }
                });
                if (isSwap == false) {//恢复方块片原来的位置
                    newPosition.left = dragOldPosition.left;
                    newPosition.top = dragOldPosition.top;
                    currentItem.move(function () {
                        $(this).css({
                            "opacity": "1",
                            "z-index": 0
                        });
                    });
                }
                isSwap = false;
            },
            this.swap = function (dragItem, overlapItem) { // 交换位置，只是将数字进行交换，方块片还是原来的   
                insertLog(SWAPGAMELOG + $(dragItem).text() + "<-->" + $(overlapItem).text()); //插入日记
                var temp = null; //将方块片的数字交换
                temp = $(dragItem).text();
                $(dragItem).text($(overlapItem).text());
                $(overlapItem).text(temp);
                if (sundFlag) {
                    $('#chatAudio')[0].play(); //播放声音
                }

                if (challengeGrade == 2) {
                    board[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = parseInt($(dragItem).text());
                    board[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = parseInt($(overlapItem).text());
                    twoBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumber($(dragItem).text());
                    twoBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumber($(overlapItem).text());
                } else if (challengeGrade == 3) {
                    board[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = parseInt($(dragItem).text());
                    board[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = parseInt($(overlapItem).text());
                    twoBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumber($(dragItem).text());
                    twoBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumber($(overlapItem).text());
                    threeBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumberThree($(dragItem).text());
                    threeBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumberThree($(overlapItem).text());
                } else if (challengeGrade == 4) {
                    board[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = parseInt($(dragItem).text());
                    board[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = parseInt($(overlapItem).text());
                    twoBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumber($(dragItem).text());
                    twoBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumber($(overlapItem).text());
                    threeBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumberThree($(dragItem).text());
                    threeBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumberThree($(overlapItem).text());
                    fourBoard[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumberFour($(dragItem).text());
                    fourBoard[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumberFour($(overlapItem).text());
                } else {
                    if (challengeGrade == 1 && challengeNum == 1) {//中难度
                        board[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = getLetterNumber($(dragItem).text());
                        board[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = getLetterNumber($(overlapItem).text());
                        //重新对交换数字后的方块片上色getLetterBackgroundColor getLetterColor
                        $(dragItem).css('background-color', getLetterBackgroundColor($(dragItem).text()));
                        $(dragItem).css('color', getLetterColor($(dragItem).text()));

                        $(overlapItem).css('background-color', getLetterBackgroundColor($(overlapItem).text()));
                        $(overlapItem).css('color', getLetterColor($(overlapItem).text()));
                    } else {
                        board[parseInt($(dragItem).attr('m'))][parseInt($(dragItem).attr('n'))] = parseInt($(dragItem).text());
                        board[parseInt($(overlapItem).attr('m'))][parseInt($(overlapItem).attr('n'))] = parseInt($(overlapItem).text());

                        $(dragItem).css('background-color', getNumberBackgroundColor(parseInt($(dragItem).text())));
                        $(dragItem).css('color', getNumberColor(parseInt($(dragItem).text())));

                        $(overlapItem).css('background-color', getNumberBackgroundColor(parseInt($(overlapItem).text())));
                        $(overlapItem).css('color', getNumberColor(parseInt($(overlapItem).text())));
                    }
                }
                //拖拽块回到原来的位置
                newPosition.left = dragOldPosition.left;
                newPosition.top = dragOldPosition.top;
                dragItem.move(function () {//调用方块片移动时的函数
                    $(this).css({
                        "opacity": "1",
                        "z-index": 0
                    });
                });

                return true;
            },
			this.drag = function () { // 拖拽
			    var oldPosition = new Position(); //位置
			    var oldPointer = new Pointer(); //光标
			    var isDrag = false;
			    var isMove = false; //标记拖拽块是否移动过，防止用户只点击而没有移动而产生的错误
			    var dragCurrentItem = null;


			    newPosition = new Position(); //方块片经过移动之后的新位置（全局变量）
			    dragOldPosition = new Position(); //记录拖拽方块片未移动之前的位置(全局变量)
			    overlapOldPosition = new Position(); //记录被重叠的方块片的位置(全局变量)

			    var gridContainer = $('#grid-container');
			    var mousedownSum = 0; //记录用户点击当前方块片的次数
			    var saveXY = new Pointer(); //保存用户点击一次当前方块片后的坐标			    


			    function mouseDownOrTouchStart(e, isTouch) {
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
			        $(dragCurrentItem).children('.prompt').remove(); //将提示DIV层移除
			        if ($(dragCurrentItem).attr('fixed') != "1") {//判断不是固定方块片和难度是在低、中难度			            
			            oldPointer.x = (isTouch == 1 ? e.touches[0].clientX : e.clientX) - gridContainer.offset().left; //获取相对于grid-container层的坐标
			            oldPointer.y = (isTouch == 1 ? e.touches[0].clientY : e.clientY) - gridContainer.offset().top;
			            oldPosition.left = $(dragCurrentItem).position().left;
			            oldPosition.top = $(dragCurrentItem).position().top;

			            dragOldPosition.left = oldPosition.left;
			            dragOldPosition.top = oldPosition.top;
			            isDrag = true;

			            if (challengeGrade == 0 || challengeGrade == 1) {//难度在低、中难度
			                mousedownSum++;
			                if (mousedownSum == 1) {//保存用户点击一次当前方块片后的坐标
			                    saveXY.x = isTouch == 1 ? oldPosition.left : oldPointer.x;
			                    saveXY.y = isTouch == 1 ? oldPosition.top : oldPointer.y;
			                }
			                if ($(dragCurrentItem).text() == "0") {//空白的方块片，实际上此处隐藏着数字0
			                    showInputNumber(dragCurrentItem,new Array()); //显示数字输入面板
			                    mousedownSum = 0;
			                } else if (mousedownSum >= 2 && saveXY.x == (isTouch == 1 ? oldPosition.left : oldPointer.x) && saveXY.y == (isTouch == 1 ? oldPosition.top : oldPointer.y)) {//用户点击了两次并且点击的位置是一样的
			                    showInputNumber(dragCurrentItem,new Array());
			                    mousedownSum = 0;
			                }
			                if (saveXY.x != (isTouch == 1 ? oldPosition.left : oldPointer.x) || saveXY.y != (isTouch == 1 ? oldPosition.top : oldPointer.y)) {//第一次点击坐标与第二次点击坐标不一样
			                    mousedownSum = 0;
			                }
			            }
			        }
			    }

			    function mouseMoveOrTouchMove(e, isTouch) {
			        if (!isDrag) return false;
			        //当前光标相对于grid-container层的坐标
			        var currentPointer = new Pointer((isTouch == 1 ? e.touches[0].clientX : e.clientX) - gridContainer.offset().left, (isTouch == 1 ? e.touches[0].clientY : e.clientY) - gridContainer.offset().top);

			        $(dragCurrentItem).css({
			            "opacity": "0.6", //不透明度
			            "z-index": 999//z指数
			        });
			        newPosition.left = currentPointer.x - oldPointer.x + oldPosition.left; //当前正在移动的方块片位置
			        newPosition.top = currentPointer.y - oldPointer.y + oldPosition.top;
			        $(dragCurrentItem).css({
			            left: newPosition.left,
			            top: newPosition.top
			        });
			        dragCurrentItem.pointer = currentPointer;
			        isMove = true;
			        mousedownSum = 0;
			    }

			    function mouseUpOrTouchEnd(e) {
			        if (!isDrag) return false;
			        isDrag = false;
			        if (isMove) {
			            dragCurrentItem.move(function () {//调用方块片移动时的函数
			                $(this).css({
			                    "opacity": "1",
			                    "z-index": 0
			                });
			            });
			            dragCurrentItem.collisionCheck(); // 先检测是否碰撞，然后开始交换位置
			            isMove = false;
			            //alert($(dragCurrentItem).attr('m') + "," + $(dragCurrentItem).attr('n'));
			        } else {
			            return false;
			        }
			    }

			    //**********************************触摸事件
			    var id = $(this).attr("id");
			    document.getElementById(id).addEventListener('touchstart', function (e) {
			        e.preventDefault();
			        dragCurrentItem = this;
			        mouseDownOrTouchStart(e, 1);
			    });
			    document.addEventListener('touchmove', function (e) {
			        e.preventDefault();
			        mouseMoveOrTouchMove(e, 1);
			    });
			    document.addEventListener('touchend', function (e) {
			        mouseUpOrTouchEnd(e);
			    });

			    //**********************************鼠标事件

			    $(this).mousedown(function (e) {
			        e.preventDefault();
			        dragCurrentItem = this;
			        mouseDownOrTouchStart(e, 0);
			    });
			    $(document).mousemove(function (e) {
			        e.preventDefault();
			        mouseMoveOrTouchMove(e, 0);
			    });
			    $(document).mouseup(function (e) {
			        e.preventDefault();
			        mouseUpOrTouchEnd(e);
			    });
			}
            this.init(); //此$(".number-cell").each循环的入口，以上各种函数都是由此函数统一调用
        });
    });
}