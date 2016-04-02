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
        span.removeClass("_none");
        return true;
    }else{
        span.html("手机号码格式错误").css({color:"red",fontSize:"12px"});
        span.removeClass("_none");
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
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        span.removeClass("_none");
        return true;
    }
    else{
        span.html('密码6-16位');
        span.removeClass("_none");
        return false;
    }
}

// 确认密码的验证==========================
function doRepass(){
    var t = $("#psw1");
    var span = $(".pswmsg");
    if(t.val() == $("#psw2").val() && t.val() != ''){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        span.removeClass("_none");
        return true;
    }else{
        span.html("两次密码不一致");
        span.removeClass("_none");
        return false;
    }
}
function docheck(){
    var num=$("#checknum");
    var span=$(".checkmsg");
   if(num.val()==""){
       span.html("验证码不为空");
       return false;
   }else{
       span.html('<span class="glyphicon glyphicon-ok-circle" style="color: #26BC85"> </span>');
       span.removeClass("_none");
       return true;
   }

}
//选择小区完成
$.fn.villclick = function () {
//t顶部
    $("#vil").on("click", "a", function () {
        //取得选择的小区
        var e = $(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name", e);
        $(".hd-prochg").hide();
        //拼装写入cookie
        var pos = $("#cit").attr("data-name") + $("#ear").attr("data-name") + $("#vil").attr("data-name");
        var post = $("#cit").attr("data-name") + "-" + $("#ear").attr("data-name") + "-" + $("#vil").attr("data-name");
        $("#cityname").attr("data-positon", pos);
        $("#cityname").attr("data-cityname", post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x = [$("#cit").attr("data-name"), $("#ear").attr("data-name"), $("#vil").attr("data-name")];
        $.cookie("proeare", x, {expires: 7});
    })
}

$(document).ready(function(){
    $().otherpageapos();
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick()
    $.Menulist();
    $("#telelphone").blur(function(){
        doTel();
    })
    $("#psw2").blur(function(){
        doRepass();
    })
    $("#psw1").blur(function(){
        dopsw();
    })
    $("#checknum").blur(function(){
        docheck();
    })
    $("#checkbtn").bind("click",function(){
        if ( doTel() && dopsw() && doRepass()) {
            var tel = $("#telelphone").val();
            var psw = strEnc($("#psw2").val(), "1", "2", "3");
            var x={"password":psw,"tel":tel};
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                dataType: "json",
                url: "http://192.168.113.14:8080/BSMD/validateAndSend.do",
                success: function (data) {
                    console.log(data);
                    if(data.message=="success"){
                        var k = strEnc(data.id, "1", "2", "3");
                        sessionStorage.setItem("id_it_id",k);
                    }
                }
            })
        }
        else{
            return false;
        }
    });

    $("#register").on("click", function () {
        if ( doTel() && dopsw() && doRepass()&& docheck()) {
            var tel = $("#telelphone").val();
            var psw = strEnc($("#psw2").val(), "1", "2", "3");
            var id=strDec(sessionStorage.getItem("id_it_id"),"1", "2", "3");
            var code=$("#checknum").val();
            var x={"userInfo":{"password":psw,"tel":tel},"id":id,"validateCode":code};
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                dataType: "json",
                url: "http://192.168.113.14:8080/BSMD/register.do",
                success: function (data) {
                    console.log(data);
                    if (data.message =="success") {
                        var html = '';
                        html += '<div class="modal fade" id="regmod" tabindex="-1" role="dialog" aria-labelledby="myMod" aria-hidden="true">';
                        html += '<div class="modal-dialog"><div class="modal-header"> <button type="button" class="close"data-dismiss="modal" aria-hidden="true"> &times; </button>';
                        html += '<h4 class="modal-title" id="myModalLabel">模态框（Modal）标题 </h4></div><div class="modal-body">' + data.code + '</div>';
                        html += '<div class="modal-footer"> <button type="button" class="btn btn-default"data-dismiss="modal">关闭 </button> <button type="button" class="btn btn-primary">提交更改 </button> </div>';
                        html += '</div></div>';
                        $("body").append(html);
                        $("#regmod").css("top", "25%");
                        $("#regmod .modal-dialog").css("background-color", "#fff");
                        $("#regmod").modal('show');
                        setTimeout("second()","1000");
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