/**
 * Created by lenovo on 2015/11/21.
 */

// 用户名的验证==========================
function doUsername(){
    var t = $("#username");
    var span = $(".namemsg");
    if( /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{4,16}$/ .test(t.val())){
        span.html("<span class='glyphicon glyphicon-ok-circle' style='color: #26BC85'></span>");
        return true;
    }else{
        span.html(" 中文、英文、数字、下划线、4-16个字符");
        return false;
    }
}
// 手机号码的验证==========================
function doTel(){
    var t = $("#telelphone");
    var span = $(".telmsg");
    if(/^1[3578][0-9]{9}$/.test(t.val())){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        return true;
    }else{
        span.html("手机号码格式错误").css({color:"red",fontSize:"12px"});
        return false;
    }
}
// 电子邮箱的验证==========================
function doEmail(){
    var t = $("#email");
    var span = $(".emailmsg");
    if(/^\w+@\w+(\.[a-zA-Z]{2,3})+$/.test(t.val())){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        return true;
    }else{
        span.html('邮箱不合法');
        return false;
    }
}
//密码验证==============================
function dopsw(){
    var t=$("#psw1");
    var span=$(".psw1msg");
    if(/^\w*[a-zA-Z]+\w*$/.test(t.val())){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>')
        return true;
    }
    else{
        span.html('密码位数6-16位，至少有一位是字母');
        return false;
    }
}
// 确认密码的验证==========================
function doRepass(){
    var t = $("#psw1");
    var span = $(".pswmsg");
    if(t.val() == $("#psw2").val() && t.val() != ''){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        return true;
    }else{
        span.html("两次密码不一致");
        return false;
    }
}
$(document).ready(function(){
    $("#username").blur(function(){
        doUsername();
    })
    $("#telelphone").blur(function(){
        doTel();
    })
    $("#email").blur(function(){
        doEmail();
    })
    $("#psw2").blur(function(){
        doRepass();
    })
    $("#psw1").blur(function(){
        dopsw();
    })



    $("#register").on("click", function () {
        if (doUsername() && doTel() && dopsw() && doRepass() && doEmail()) {
            var user = $("#username").val();
            var tel = $("#telelphone").val();
            var psw = strEnc($("#psw2").val(), "1", "2", "3");
            var eMail = $("#email").val();
            var x={"username":user,"password":psw,"tel":tel,"eMail":eMail};
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                dataType: "json",
                url: "http://192.168.199.233:8080/BSMD/registerMobile.do",
                success: function (data) {

                    console.log(data);
                    if (data.code =="success") {
                        var html = '';
                           htmhtml += '<div class="modal fade" id="regmod" tabindex="-1" role="dialog" aria-labelledby="myMod" aria-hidden="true">';
                        l += '<div class="modal-dialog"><div class="modal-header"> <button type="button" class="close"data-dismiss="modal" aria-hidden="true"> &times; </button>';
                        html += '<h4 class="modal-title" id="myModalLabel">模态框（Modal）标题 </h4></div><div class="modal-body">' + data.code + '</div>';
                        html += '<div class="modal-footer"> <button type="button" class="btn btn-default"data-dismiss="modal">关闭 </button> <button type="button" class="btn btn-primary">提交更改 </button> </div>';
                        html += '</div></div>';
                        $("body").append(html);
                        $("#regmod").css("top", "25%");
                        $("#regmod .modal-dialog").css("background-color", "#fff");
                        $("#regmod").modal('show');
                        location.href='login.html';
                    }
                }
            })
        }
        else{
            return false;
        }
    })
})