/**
 * Created by lenovo on 2015/11/21.
 */
function isnumber(str){
    str.replace()
}
$(document).ready(function(){
    //������  ����Ϊ11
    var re=/[^1-9]{11}/;
    var re=new RegExp("","")
    //�û���
    $("#phone").focus(function(){
        $(".namemsg")[0].innerHTML='<i class="ati"></i>�û���Ϊ�ֻ�����';
        $(".namemsg").css("display","block");

    })
    $("#phone").onkeyup=function(){


    }
    $("#phone").onblur=function(){
       //���зǷ��ַ�
        var re=/[^1-9]{8,11}/g;
        if($(this).test(this.value)){
            $(".namemsg")[0].innerHTML='<i class="ati"></i>��������ȷ���ֻ�����'
        }
        //����Ϊ��
        else if($(this).value=""){
            $(".namemsg")[0].innerHTML='<i class="ati"></i>�ֻ����벻��Ϊ��"';
        }
        else
            $(".namemsg")[0].innerHTML='<i class="ati"></i>'
        //���Ȳ�����8���ַ�
        //���Ȳ�����11������
        //ok
    }
})