/**
 * Created by lenovo on 2015/11/21.
 */
function isnumber(str){
    str.replace()
}
$(document).ready(function(){
    //纯数字  长度为11
    var re=/[^1-9]{11}/;
    var re=new RegExp("","")
    //用户名
    $("#phone").focus(function(){
        $(".namemsg")[0].innerHTML='<i class="ati"></i>用户名为手机号码';
        $(".namemsg").css("display","block");

    })
    $("#phone").onkeyup=function(){


    }
    $("#phone").onblur=function(){
       //含有非法字符
        var re=/[^1-9]{8,11}/g;
        if($(this).test(this.value)){
            $(".namemsg")[0].innerHTML='<i class="ati"></i>请输入正确的手机号码'
        }
        //不能为空
        else if($(this).value=""){
            $(".namemsg")[0].innerHTML='<i class="ati"></i>手机号码不可为空"';
        }
        else
            $(".namemsg")[0].innerHTML='<i class="ati"></i>'
        //长度不少于8个字符
        //长度不超过11个数字
        //ok
    }
})