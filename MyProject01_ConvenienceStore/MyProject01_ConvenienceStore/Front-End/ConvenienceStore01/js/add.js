/**
 * Created by lenovo on 2015-11-13.
 */
$(function () {



    $.loadfirst();
    var scrollHandler=function(){
        var winH=$(window).height();
        var pageH=$(document.body).height();
        var scrollT=$(window).scrollTop();
        var aa= (pageH - winH - scrollT) / winH;
       if(aa<0.02){
           $.loadfirst();
       }
    }
    $(window).scroll(scrollHandler);
});
$.loadfirst=function(){
    var json=[{"pic":"images/kebike.jpg","name":"�ɱȿ� ��Ƭ��ζ������ 105g*3��/�� ","price":"��3.90","count":"300"},
        {"pic":"images/leshi.jpg","name":"������Ƭ(ī���缦֭����)45g/��  ","price":"��8.90","count":"500"},
        {"pic":"images/shutiao.jpg","name":"������ ��Ը��������ʳƷ��ֵ���װ 104g*3��/��  ","price":"��5.90","count":"500"},
        {"pic":"images/shanghaojia.jpg","name":"�Ϻü� ������Ƭ �����ζ 110g/�� ","price":"��4.90","count":"800"}]
    var html='<div class="goods">';
    for( var i=0;i<json.length;i++){

        html+='<div class="goods_div" >';
        html+='<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
        html+='<div class="goods_pic"><a href="#" target="_blank"> <img  class="goods_color" src='+json[i].pic+'></a></div>';
        html+='<div class="goods_details"><a href="#" target="_blank">'+json[i].name+'</a></div>';
        html+='<div class="goods_price"><div class="pull-left"><strong class="goods_price_num">'+json[i].price+'</strong></div><div class="pull-right"><strong class="goods_price_num">'+json[i].count+'</strong></div></div>';
        html+='<div class="goods_button"><a target="_blank" href="#">���빺�ﳵ</a><a  target="_blank" href="#">�ղ�</a></div>';
        html+='</div>';
    }
    html+='</div>';
    $("#goods_list").append(html);

    /*�������ͼƬ���ɫ���Ƴ��ָ�*/

    $(".goods_div").mouseover(function(){
        $(this).css({"border":"1px solid red"});
    });
    $(".goods_div").mouseout(function(){
        $(this).css({"border":"1px solid #fff"});
    });
    /*-------�û���Ϣ��û�����ǳ�ʱ������-------*/

    $('form :input').blur(function(){
        var $parent=$(this).parent();
        $parent.find(".formtips").remove();
        //��֤�ǳ�
        if($(this).is('#user_unick')){
            if(this.value==""){
                var errorMsg='�������ǳ�.'
                $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
            }
            else{
                var okMsg='������ȷ.';
                $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>')
            }
        }
    });
        //����
        $('#btn_submit').click(function(){
            $("form :input.required").trigger('blur');
            var numError=$('form.onError').length;
            if(numError){
                return false;
            }
            alert("����ɹ�");
        });



}


