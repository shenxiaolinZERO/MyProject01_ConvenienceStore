
//首页加载
$(document).ready(function () {

    onmenu();
    //loadmenu();
    //页面加载地址检查和选择
    checkCookie();
    $().poschange();
    //商品搜索
    $("#searchitem").mysearch();
    //地址选择的访问隐藏
    $("#curSelect").click(function () {

        $(".selectpro").slideToggle();
        $("#tabvillage").removeClass("active");
        $("#tabpro").addClass("active");
        $("#village").removeClass("active in");
        $("#province").addClass("active in");
    });

    //首页中部滑动
    $(".midslide").each(function () {
        $(this).luara({width: "330", height: "360", interval: 5000, selected: "selected", deriction: "left"})
    });
    //隐藏显示

    $(".megamenu").megamenu();
    //顶部滑动
    $("#slider").responsiveSlides({
        auto: true,
        nav: false,
        speed: 500,
        namespace: "callbacks",
        pager: true,
    });

})