
$.fn.mainmenu = function (e) {
    $(".mainmenu > .odd").mouseenter(function(){
       // onmenu();
        $(this).addClass("oddhover");
        $(this).siblings().removeClass("oddhover");
        var index=$(this).index(".mainmenu > .odd");
       $(".submenu1").css('width','500px');
        $(".submenu1").fadeIn(0,0.8);
    }).mouseleave(function(){
       // $(".mainmenu > .odd").stop();
       // $(".subblock").remove();

    })
    $("#nav").mouseleave(function(){
        $(".mainmenu > .odd").removeClass("oddhover");
        $(".submenu1").fadeOut();
        $(".subblock").remove();
    })

}
$(document).ready(function () {

   // onmenu();
    //loadmenu();
    $("#myModal").modal('show');
    //首页中部滑动
    $(".midslide").each(function () {
        $(this).luara({width: "330", height: "360", interval: 5000, selected: "selected", deriction: "left"})
    });
    //隐藏显示
    $(".mainmenu").mainmenu();
    $(".megamenu").megamenu();

    //topslider
        $("#slider").responsiveSlides({
            auto: true,
            nav: false,
            speed: 500,
            namespace: "callbacks",
            pager: true,
        });
    $('.spinner').spinner();

})