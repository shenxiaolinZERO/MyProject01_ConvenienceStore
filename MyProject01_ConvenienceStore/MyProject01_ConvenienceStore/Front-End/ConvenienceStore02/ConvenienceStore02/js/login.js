/**
 * Created by lenovo on 2015/11/17.
 */
//点击登录按钮  将数据传给服务端
function checkname() {

    if ($("#username").val() == "") {
        $(".usermsg").html("用户名不能为空");
        return false
    }
    else {
        $(".usermsg").html("");
        return true;
    }

}
function checkpsw() {

    if ($("#psw").val() == "") {
        $(".pswmsg").html("密码不能为空");
        return false;
    }
    else {
        $(".pswmsg").html("");
        return true;
    }
}

function login_submit() {
    if (checkname() && checkpsw()) {
        var username = $("#username").val();
        var psw = strEnc($("#psw").val(), "1", "2", "3");
        var x = {"text":{"username": username, "password": psw}};
        $.ajax({
            type: "post",
            url: "http://192.168.199.233:8080/BSMD/loginSubmit.do",
            data: JSON.stringify(x),
            dataType: "json",
            header:{"Content-Type":"application/json",
                "Accept":"application/json"},
            error: function () {
                alert("error");
            },
            success: function (data) {
                console.log(data);
                if(data.status=="success"){
                    //将姓名写入cookie
                    setCookie('username',username,2);
                    location.href='index.html';
                }

            }
        });
        return true;

    }
    else return false;
}
$(document).ready(function () {
    $("#username").blur(function () {
        if ($(this).val() == "") {
            $(".usermsg").html("用户名不能为空");
            return false
        }
        else {
            $(".usermsg").html("");
            return true;
        }
    })
    $("#psw").blur(function () {
        if ($(this).val() == "") {
            $(".pswmsg").html("密码不能为空");
            return false;
        }
        else {
            $(".pswmsg").html("");
            return true;
        }
    })
})