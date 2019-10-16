//////////////////////////////////////////// 수정 가능 변수
var imageWidth = 700;
var imageHeight = 500;
var imageMargin = 6;
var animateSpeed = 500;
var minRange = 100;

//////////////////////////////////////////// 수정 불가 변수
var nowCount = 0;
var imageCount = 0;
var bflag = 0;
var downX = 0;
var upX = 0;

$(function(){
    
    //드래그 방지
    $("body").addClass("no-drag");

    //사진 갯수 구하기 및 사이즈 설정
    setImageSize();

    //마우스 이벤트
    mouseDownMove();
});

function mouseDownMove()
{
    $(document).mousedown(function(event){
        bflag = 1;
        downX = event.pageX;
    });

    $(document).mouseup(function(event){
        if(1 == bflag)
        {
            upX = event.pageX;
            let X = downX - upX;

            if(minRange < X)
                rightMove();
            else if(X < -minRange)
                leftMove();
        }

        bflag = 0;
    });
}

function setImageSize()
{
    imageCount = $("img").length;

    $("#swiper").css({"width": imageWidth + "px", "height": imageHeight + "px"});
    $("#swiper > #image").css({"width": (imageWidth * imageCount) + (imageCount * imageMargin) + "px", "height": imageHeight + "px"});
    $("#swiper > #image > a > img").css({"width": imageWidth + "px", "height": imageHeight + "px"});
}

function setImageLeftMargin(index)
{
    let leftMargin = index * imageWidth + index * imageMargin;
    if(imageCount * imageWidth + imageCount * imageMargin <= leftMargin)
        leftMargin = 0;

    $("#swiper > #image").stop().animate({marginLeft : -leftMargin}, animateSpeed);
}

function leftMove()
{
    if(--nowCount <= -1)
        nowCount = imageCount - 1;

    setImageLeftMargin(nowCount);
}

function rightMove()
{
    if(0 == ++nowCount % imageCount )
        nowCount = 0;

    setImageLeftMargin(nowCount);
}
