/**
 * Created by lenovo on 2015-12-11.
 */

//address-form

//个人资料
$(function () {
    $("#address-uerName").blur(function () {
        doUsername();
    })
    $("#address-phone").blur(function () {
        doTel();
    })
    $("#address-email").blur(function () {
        doEmail();
    })

    $("#address-save").click(function () {

        if (doUsername() && doTel() && doEmail()) {

            var myheadImage = $(".image_size").val();//图像上传未做
            var myuserName = $("#address-uerName").val();
            var myphone=$("#address-phone").val();
            var myemail=$("#address-email").val();
            var mySex = $('input:radio[name="sex"]:checked').val();
            var x = {"headImage": myheadImage, "userName": myuserName, "tel": myphone, "eMail": myemail, "sex": mySex};
            console.log(x);
            //$.ajax({
            //    type: "post",
            //    data: JSON.stringify(x),
            //    url: " ",
            //    dataType: "json",
            //    header: {"Content-Type": "application/json", "Accept": "application/json"},
            //    success: function (data) {
            //        console.log(data);
            //        alert("保存成功！");
            //
            //    }
            //});
        }
        else{
            alert("请输入您的正确信息！")
        }
    });

});

// 用户名的验证==========================
function doUsername(){
    var t = $("#address-uerName");
    var span = $(".namemsg");
    if( /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/ .test(t.val())){
        // var errorMsg='请输入昵称.';
        // t.append('<span class="formtips onError">'+errorMsg+'</span>');
        span.html("输入成功");
        return true;
    }else{
        span.html(" 中文、英文、数字、下划线、4-16个字符").css({color:"red",fontSize:"12px"});
        return false;
    }
}
// 手机号码的验证==========================
function doTel(){
    var t = $("#address-phone");
    var span = $(".telmsg");
    if(/^1[3578][0-9]{9}$/.test(t.val())){
        span.html("输入成功");
        return true;
    }else{
        span.html("手机号码格式错误").css({color:"red",fontSize:"12px"});
        return false;
    }
}
// 电子邮箱的验证==========================
function doEmail(){
    var t = $("#address-email");
    var span = $(".emailmsg");
    if(/^\w+@\w+(\.[a-zA-Z]{2,3})+$/.test(t.val())){
        span.html("输入成功");
        return true;
    }else{
        span.html('邮箱不合法').css({color:"red",fontSize:"12px"});
        return false;
    }
}
