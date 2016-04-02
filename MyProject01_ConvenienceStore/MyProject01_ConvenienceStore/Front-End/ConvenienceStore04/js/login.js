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
        var x = {"username": username, "password": psw};
        $.ajax({
            type: "post",
             url: "http://192.168.113.14:8080/BSMD/loginMobile.do",
            data: JSON.stringify(x),
            dataType: "json",
            //header:{"Content-Type":"application/json",
             //   "Accept":"application/json"},
            error: function () {
                alert("error");
            },
            success: function (data) {
                console.log(data);

                if(data.status=="success"){
                    $.cookie('username',data.userInfo.custNo,2);
                    $.cookie('userphone',data.userInfo.tel,2);
                    $("#fakeLoader").fakeLoader({
                        timeToHide:2000,//加载效果持续时间
                        zIndex:"999",
                        spinner:"spinner4",
                        bgColor:"#3498db"
                    });
                    for(var time=2;time>0;time--){
                        setInterval(function () {
                            time = parseInt(time);
                            if (time >0) {
                            } else {
                                location.href='index.html?username='+data.userInfo.custNo;
                            }
                        }, 2000);
                    }

                }
                else{
                    $("#errorlogin").html(data.status);
                    return;
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