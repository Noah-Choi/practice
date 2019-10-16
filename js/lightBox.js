var pictureCount;
var ShowPictureNum;

$(function(){
    
    //드래그 방지
    $("body").addClass("no-drag");

    //전체 사진 갯수 구하기
    pictureCount = $("#pictureCollect > ul > li").length;

    modalEvent();
    rePosition();
    moveShowPicture();
    keyEvent();
});

//모달창 관련 함수
function modalEvent()
{
    // 모달창 열기 이벤트
    $("#pictureCollect > ul > li > img").on("click", function()
    {
        //현재 선택한 사진 번호 저장
        ShowPictureNum = $(this).parent().index();

        let lsrc = $(this).attr("src");
        let lalt = $(this).attr("alt");
        $("#modalImg").attr({"src" : lsrc, "alt" : lalt});
        $("#overlay").css({ visibility: "visible", opacity: 1});

        moveModal();
    });

    // 모달창 닫기 이벤트 
    $(".close").on("click", function()
    {
        modalHide();
    });

    // 모달창 외 클릭 시 모달창 닫기 이벤트
    $(document).on("click", function(e)
    {  
        if($("#overlay").is(e.target)) 
            modalHide();
    });
}

function modalHide()
{
    $("#overlay").css({ visibility:"hidden", opacity:0 });
}

//사진의 크기, 위치 및 모달창 위치 지정
function moveModal(){

    $("#modalImg").removeAttr("style");

    let windowWidth = $(window).width();
    let windowHeight = $(window).height();

    let lwidth = $("#modalImg").width();
    let lheight = $("#modalImg").height();

    //사진 사이즈 조정
    while(true)
    {
        if(windowWidth <= lwidth + 20 || windowHeight <= lheight + 20)
        {
            lwidth = (lwidth / 10) * 9;
            lheight = (lheight / 10) * 9;
        }
        else
            break;
    }

    lleft = windowWidth / 2 - lwidth / 2;
    ltop = windowHeight / 2 - lheight / 2;
    $("#myModal").css({"left": lleft, "top": ltop});

    $("#leftBtn").css("top", "-" + lheight / 2 + "px");
    $("#rightBtn").css("top", "-" + lheight / 2 + "px");

    $("#modalImg").css({"width": lwidth + "px", "height": lheight + "px"});

    //화살표 표시 여부 설정
    moveBtnShowHide()
}

//브라우저 크기 변경시
function rePosition()
{
    $(window).resize(function() {
        moveModal();
     });
}

//화살표 눌렀을때
function moveShowPicture()
{
    $("#leftBtn").click(function(){
        leftMove();
    });

    $("#rightBtn").click(function(){
        rightMove()
    });
}

function leftMove()
{
    if(ShowPictureNum <= 0)
        return;

    ShowPictureNum--;
    let lsrc = $("#pictureCollect > ul > li").eq(ShowPictureNum).children().attr("src");
    let lalt = $("#pictureCollect > ul > li").eq(ShowPictureNum).children().attr("alt");
    $("#modalImg").attr({"src" : lsrc, "alt" : lalt});

    moveModal();
}

function rightMove()
{
    if(pictureCount <= ShowPictureNum + 1)
        return;

    ShowPictureNum++;
    let lsrc = $("#pictureCollect > ul > li").eq(ShowPictureNum).children().attr("src");
    let lalt = $("#pictureCollect > ul > li").eq(ShowPictureNum).children().attr("alt");
    $("#modalImg").attr({"src" : lsrc, "alt" : lalt});

    moveModal();
}

//화살표 보일지 여부
function moveBtnShowHide()
{
    if(0 == ShowPictureNum)
        $("#leftBtn").css("display", "none");
    else
        $("#leftBtn").css("display", "block");

    if(pictureCount == ShowPictureNum + 1)
        $("#rightBtn").css("display", "none");
    else
        $("#rightBtn").css("display", "block");
}

function keyEvent(){
    $(document).keydown(function(event) {
        if (event.keyCode == '37') 
            leftMove();
        else if (event.keyCode == '39') 
            rightMove();
        else if (event.keyCode == '27') 
            modalHide();
      });
}

