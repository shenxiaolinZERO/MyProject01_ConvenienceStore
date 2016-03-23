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
    var json=[{"pic":"images/kebike.jpg","name":"可比克 薯片美味三连罐 105g*3罐/组 ","price":"￥3.90","count":"300"},
        {"pic":"images/leshi.jpg","name":"乐事薯片(墨西哥鸡汁番茄)45g/袋  ","price":"￥8.90","count":"500"},
        {"pic":"images/shutiao.jpg","name":"好丽友 薯愿马铃薯膨化食品超值组合装 104g*3罐/组  ","price":"￥5.90","count":"500"},
        {"pic":"images/shanghaojia.jpg","name":"上好佳 醇脆薯片 烤肉口味 110g/罐 ","price":"￥4.90","count":"800"}]
    var html='<div class="goods">';
    for( var i=0;i<json.length;i++){

        html+='<div class="goods_div" >';
        html+='<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
        html+='<div class="goods_pic"><a href="#" target="_blank"> <img  class="goods_color" src='+json[i].pic+'></a></div>';
        html+='<div class="goods_details"><a href="#" target="_blank">'+json[i].name+'</a></div>';
        html+='<div class="goods_price"><div class="pull-left"><strong class="goods_price_num">'+json[i].price+'</strong></div><div class="pull-right"><strong class="goods_price_num">'+json[i].count+'</strong></div></div>';
        html+='<div class="goods_button"><a target="_blank" href="#">加入购物车</a><a  target="_blank" href="#">收藏</a></div>';
        html+='</div>';
    }
    html+='</div>';
    $("#goods_list").append(html);

    /*鼠标移入图片变红色，移出恢复*/

    $(".goods_div").mouseover(function(){
        $(this).css({"border":"1px solid red"});
    });
    $(".goods_div").mouseout(function(){
        $(this).css({"border":"1px solid #fff"});
    });
    /*-------用户信息中没有填昵称时的提醒-------*/

    $('form :input').blur(function(){
        var $parent=$(this).parent();
        $parent.find(".formtips").remove();
        //验证昵称
        if($(this).is('#user_unick')){
            if(this.value==""){
                var errorMsg='请输入昵称.'
                $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
            }
            else{
                var okMsg='输入正确.';
                $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>')
            }
        }
    });
        //保存
        $('#btn_submit').click(function(){
            $("form :input.required").trigger('blur');
            var numError=$('form.onError').length;
            if(numError){
                return false;
            }
            alert("保存成功");
        });



}


