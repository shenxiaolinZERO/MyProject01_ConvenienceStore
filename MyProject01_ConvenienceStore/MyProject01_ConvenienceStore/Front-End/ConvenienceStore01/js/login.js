/**
 * Created by lenovo on 2015/11/17.
 */
//点击登录按钮  将数据传给服务端

function login_submit(){
    //提示
    //if($("#phnum").val()==""){
    //    $("#phnum").popover();
    //    return false;
    //}else if($("#psw").val()==""){
    //    $("#psw").popover();
    //    return false;
    //}else{
         var x={"username":"myuser", "password":"123456"};
        $.ajax({
            type:"post",
            url:"http://192.168.199.242:8080/BSMD/item/index.do",
            data:JSON.stringify(x),
            dataType:"json",
            //header:{"Content-Type":"application/json",
            //    "Accept":"application/json"},
            error:function(){
                alert("error");
            },
            success:function(data){
                console.log(data);
                //if(types.toString()!="success"){
                //    alert(data);//输出登录失败原因
                //}else{
                //    window.location.href="index";//跳转到首页
                //}
            }
        });
    //}
}
