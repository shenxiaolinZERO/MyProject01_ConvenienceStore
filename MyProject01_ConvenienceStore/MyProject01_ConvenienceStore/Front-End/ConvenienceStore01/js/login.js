/**
 * Created by lenovo on 2015/11/17.
 */
//�����¼��ť  �����ݴ��������

function login_submit(){
    //��ʾ
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
                //    alert(data);//�����¼ʧ��ԭ��
                //}else{
                //    window.location.href="index";//��ת����ҳ
                //}
            }
        });
    //}
}
