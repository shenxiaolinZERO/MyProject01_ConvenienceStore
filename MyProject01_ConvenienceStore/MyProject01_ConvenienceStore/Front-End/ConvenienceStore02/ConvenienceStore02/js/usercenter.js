/**
 * Created by lenovo on 2015-11-24.
 */
/**
 * Created by hp on 2015/11/13.
 */
$(document).ready(function () {
    $(".order_table").hover(function () {
        $(this).css("border", "1px solid #F54D56");
    }, function () {
        $(this).css("border", "1px solid #eee");
    });
});
//上下改变图标
$(function () {
    var icon1 = "glyphicon glyphicon-chevron-up";
    var icon2 = "glyphicon glyphicon-chevron-down";
    $("#order>li").click(function () {
        var issue = $(this).children("span");
        if (issue.hasClass(icon1)) {
            issue.removeClass(icon1);
            issue.addClass(icon2);
        } else {
            issue.removeClass(icon2);
            issue.addClass(icon1);
        }
    });
});




/***********************************安全设置***************************************/

/*--更换手机号第1步--*/
($(function () {
    $(".info_number>.setting").click(function () {
        if($(this).text()=="设置"){
            $(".pnumber").css("display","block");
            $(this).text("收起");
        }else{
            $(".pnumber").css("display","none");
            $(".new_pnumber").css("display","none");
            $(".new_check").css("display","none");
            $(this).text("设置");
        }
    });
}))();
/*--更换手机号第2步--*/
($(function(){
    $(".pnumber>button").click(function(){
        $(".pnumber").css("display","none");
        $(".new_pnumber").css("display","block");
        var pnumber=$(".new_pnumber>input");
        //if(!/^[$/){
        //
        //}
    });
}))
/*--更换手机号第3步--*/
($(function(){
    $(".new_pnumber>button").click(function(){
        $(".new_pnumber").css("display","none");
        $(".new_result").css("display","block");
    });
    $(".new_result>button").click(function(){
        $(".new_result").css("display","none");
        $(".info_number>.setting").text("设置");
    });
}))
/*--邮箱--*/
$(function () {
    $(".info_email>.setting").click(function () {
        if ($(".email_confirm").css("display") == "none") {
            $(".email_confirm").css("display", "block");
            $(".info_email>.setting").text("收起");
        }
        else {
            $(".email_confirm").css("display", "none");
            $(".info_email>.setting").text("设置");
        }
    });
})
/*--修改密码--*/
$(function () {
    $(".info_password>.setting").click(function () {
        if ($(".set_password").css("display") == "none") {
            $(".set_password").css("display", "block");
            $(".info_password>.setting").text("收起");
        }
        else {
            $(".set_password").css("display", "none");
            $(".info_password>.setting").text("设置");
        }
    });
})

