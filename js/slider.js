//////////////////////////////////////////// 수정 가능 변수
var imageWidth = 700;
var imageHeight = 500;
var imageMargin = 6;
var animateSpeed = 500;
var sliderSpeed = 2000;
//////////////////////////////////////////// 수정 불가 변수
var nowCount = 0;
var imageCount = 0;
var timer;

$(function(){
    
    //드래그 방지
    $("body").addClass("no-drag");

    //전체 사진 갯수 구하기
    setImageSize();

    //타이머 시작
    timer = start();

    //화살표 눌렀을때
    moveShowPicture();

    //하단에 라디오버튼 중앙정렬
    setRadioBtnPos();

    //라디오버튼 클릭 시
    clickRadioBtn();
});

function setImageSize()
{
    imageCount = $("img").length;

    $("#slider").css({"width": imageWidth + "px", "height": imageHeight + "px"});
    $("#slider > #image").css({"width": (imageWidth * imageCount) + (imageCount * imageMargin) + "px", "height": imageHeight + "px"});
    $("#slider > #image > a > img").css({"width": imageWidth + "px", "height": imageHeight + "px"});
}

function setRadioBtnPos()
{
    let str = "<input type='radio' name='slider' value=''> ";
    for(let i = 0; i < imageCount; i++)
        $("#radio").append(str);

    let sliderWidth = $("#slider").width();
    let radioWidth = $("#radio").width();

    let movePos = sliderWidth / 2 - radioWidth / 2;
    $("#radio").css("left", movePos);

    if(0 < $("input:radio[name='slider']").length)
        setRadioIndex(0);
}

function clickRadioBtn()
{
    $("input:radio[name='slider']").change(function(){
        nowCount = $(this).index();
        setImageLeftMargin(nowCount);

        clearInterval(timer);
        timer = start(); 
    });
}

function setRadioIndex(index)
{
    $("input:radio[name='slider']").eq(index).prop("checked", true);
}

//화살표 눌렀을때
function moveShowPicture()
{
    $("#leftBtn").click(function(){
        leftMove();
        clearInterval(timer);
        timer = start();
    });

    $("#rightBtn").click(function(){
        rightMove()
        clearInterval(timer);
        timer = start();
    });
}

function start()
{
    return setInterval(function()
    {
        rightMove();
    }, sliderSpeed)
}

function setImageLeftMargin(index)
{
    let leftMargin = index * imageWidth + index * imageMargin;
    if(imageCount * imageWidth + imageCount * imageMargin <= leftMargin)
        leftMargin = 0;

    $("#slider > #image").stop().animate({marginLeft : -leftMargin}, animateSpeed);
}

function leftMove()
{
    if(--nowCount <= -1)
        nowCount = imageCount - 1;

    setImageLeftMargin(nowCount);
    setRadioIndex(nowCount);
}

function rightMove()
{
    if(0 == ++nowCount % imageCount )
        nowCount = 0;

    setImageLeftMargin(nowCount);
    setRadioIndex(nowCount);
}
