/**
 * Created by lenovo on 2015-11-13.
 */
$(function () {

    //$.loadfirst();
    $.goodlist();
   // $.firstMenulist();
    $("#order").listclic();

    $.imageRed();
    //商品搜索
    $("#searchitem").mysearch();
    //顶部地址改变
    $().poschange();
    $().otherpageapos();
    $("#sortSellnum").sortSellnum();
    /*var scrollHandler=function(){
     var winH=$(window).height();
     var pageH=$(document.body).height();
     var scrollT=$(window).scrollTop();
     var aa= (pageH - winH - scrollT) / winH;
     if(aa<0.02){
     $.loadfirst();
     }
     }
     $(window).scroll(scrollHandler);*/
});

$.fn.listclic=function () {
    var icon1 = "glyphicon glyphicon-chevron-up";
    var icon2 = "glyphicon glyphicon-chevron-down";
    $("#order>li").on("click",function () {
        var issue = $(this).children("span");
        if (issue.hasClass(icon1)) {
            issue.removeClass(icon1);
            issue.addClass(icon2);
        } else {
            issue.removeClass(icon2);
            issue.addClass(icon1);
        }
    });
}
$.loadfirst=function() {
    var json = [{"pic": "images/kebike.jpg", "name": "可比克 薯片美味三连罐 105g*3罐/组 ", "price": "￥3.90", "count": "300"},
        {"pic": "images/leshi.jpg", "name": "乐事薯片(墨西哥鸡汁番茄)45g/袋  ", "price": "￥8.90", "count": "500"},
        {"pic": "images/shutiao.jpg", "name": "好丽友 薯愿马铃薯膨化食品超值组合装 104g*3罐/组  ", "price": "￥5.90", "count": "500"},
        {"pic": "images/shanghaojia.jpg", "name": "上好佳 醇脆薯片 烤肉口味 110g/罐 ", "price": "￥4.90", "count": "800"}]
    var html = '<div class="goods">';
    for (var i = 0; i < json.length; i++) {

        html += '<div class="goods_div" >';
        html += '<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
        html += '<div class="goods_pic"><a href="#" target="_blank"> <img  class="goods_color" src=' + json[i].pic + '></a></div>';
        html += '<div class="goods_details"><a href="#" target="_blank">' + json[i].name + '</a></div>';
        html += '<div class="goods_price"><div class="pull-left"><strong class="goods_price_num">' + json[i].price + '</strong></div><div class="pull-right"><strong class="goods_price_num">' + json[i].count + '</strong></div></div>';
        html += '<div class="goods_button"><a target="_blank" href="#">加入购物车</a><a  target="_blank" href="#">收藏</a></div>';
        html += '</div>';
    }
    html += '</div>';
    $("#goods_list").append(html);
}
//销量排序
$.fn.sortSellnum=function(){
    $("#sortSellnum").on("click",function() {


        //var goodsSell = $("#sortSellnum").val();
        var sort = {"orderstyle": "asc","ordercondition ":"item_bynum1","name":"机械","address":"福州-鼓楼区-胜利小区"};
        $.ajax({
            type: "post",
            url: "http://192.168.199.242:8080/BSMD/item/search.do ",
            data: JSON.stringify(sort),
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                var html1='';
                for (var i = 0; i < data.itemlist.length; i++) {
                    html1 += '<div class="goods_div" >';
                    html1 += '<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
                    html1 += '<div class="goods_pic"><a href="#" target="_blank"> <img  class="goods_color" src="' + data.itemlist[i].url + '"></a></div>';
                    html1 += '<div class="goods_details"><a href="#" target="_blank">' + data.itemlist[i].itemName + '</a></div>';
                    html1 += '<div class="goods_price"><div class="pull-left"><strong class="goods_price_num">' + data.itemlist[i].itemSalePrice;
                    html1 += '</strong></div><div class="pull-right"><strong class="goods_price_num">' + data.itemlist[i].itemBynum1 + '</strong></div></div>';
                    html1 += '<div class="goods_button"><a target="_blank" href="#">加入购物车</a><a  target="_blank" href="#">收藏</a></div>';
                    html1 += '</div>';
                }
                $("#goods_list").html("");
                $("#goods_list").append(html1);


            }


        });
    });

}

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




/*鼠标移入图片变红色，移出恢复*/
$.imageRed=function(){


    $("#goods_list").on("mouseover",".goods_div",function(){
        $(this).css({"border":"1px solid red"});
    });
    $("#goods_list").on("mouseout",".goods_div",function(){
        $(this).css({"border":"1px solid #fff"});
    });
}
//获取URL中的参数
function getUrlParam(name){
    var reg =new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null){
        console.log(r);
        return decodeURI(r[2]);
    }
    return null;
}
/*---------------加载商品列表---------------*/
$.goodlist=function(){

    //获取url的key值

    var reg=getUrlParam("key");
    console.log(reg);
    // if(reg==null) return;
    x={"name":reg,"address":"福州-鼓楼区-胜利小区"};
    console.log(x);
    //请求页面
    $.ajax({
        type:"post",
        data:JSON.stringify(x),
        url:"http://192.168.199.242:8080/BSMD/item/search.do",
        dataType:"json",
        header:{"Content-Type":"application/json","Accept":"application/json"},
        success:function(data){
            var json=data;
            var html1='';
            for(var i=0;i<json.itemlist.length;i++)
            {
                html1+='<div class="goods_div" >';
                html1+='<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
                html1+='<div class="goods_pic"><a href="#" target="_blank"> <img  class="goods_color" src="'+json.itemlist[i].url+'"></a></div>';
                html1+='<div class="goods_details"><a href="#" target="_blank">'+json.itemlist[i].itemName+'</a></div>';
                html1+='<div class="goods_price"><div class="pull-left"><strong class="goods_price_num">'+json.itemlist[i].itemSalePrice;
                html1+='</strong></div><div class="pull-right"><strong class="goods_price_num">'+json.itemlist[i].itemBynum1+'</strong></div></div>';
                html1+='<div class="goods_button"><a target="_blank" href="#">加入购物车</a><a  target="_blank" href="#">收藏</a></div>';
                html1+='</div>';
            }

            $("#goods_list").append(html1);

        }
    })
}
/*-------------end加载商品列表*/
/*---------------加载菜单列表---------------*/
$.firstMenulist=function() {

    //获取url的key值
    var reg=getUrlParam("key");
    console.log(reg);
   // if(reg==null) return;
    x={"name":reg,"address":"福州-台江区-幸福小区"};
    console.log(x);
    $.ajax({
        type:"post",
        url:"",
        dataType:"json",
        data:JSON.stringify(x),
        header:{"Content-Type":"application/json","Accept":"application/json"},
        success:function(data){
            var json = data;
            console.log(json);
            var html2 = '<div style="width: 240px;"><ul class="nav-tabs nav-stacked navlist _menu" id="order">';
            for (var i = 0; i < json.bigclass.length; i++) {
                html2 += '<li data-toggle="collapse" data-target="#'+i+'">' + json.bigclass[i].name + '<span class="glyphicon glyphicon-chevron-up"></span></li>';
                html2 +='<ul class="collapse in nav-tabs nav-stacked navlist-l _menuDetail" id='+i+'>';
                html2+='<li>';
                for (var j=0; j<json.bigclass[i].property.length;j++) {
                    html2 += '<li><a  class="" href="#"> ' + json.bigclass[i].property[j].propertyName + '</a> </li>';

                }
                html2 += '</ul>';
            }
            html2 += '</ul></div>';
            $("#menuList").append(html2);


        }
    })


}
/*----------end加载菜单列表*/
/*---------------加载筛选条件---------------
 $.conditionList=function(){
 $.ajax({
 type:"post",
 url:"http://192.168.199.242:8080/BSMD/item/index.do",
 dataType:"json",
 header:{"Content-Type":"application/json","Accept":"application/json"},
 success:function(data){
 var json=data;
 var html4=' <ul  class="f_list" >';
 for(var i=0;i<json.length;i++){
 html4+='<li><a  class="" href="#"> '+json[i].name+'</a> </li>';
 }
 html4+='</ul> ';
 $("#brand").append();




 }
 })
 }*/
/*---------------发送排序---------------
 $.firstMenulist=function() {
 //var name = {"name": [{"n": "xxxxx",}]};
 var name = {"sort": "1"};
 $.ajax({
 type: "post",
 url: "http://192.168.199.242:8080/BSMD/item/index.do",
 data: JSON.stringify(name),
 dataType: "json",
 header: {"Content-Type": "application/json", "Accept": "application/json"},
 success: function (data) {


 }
 })
 }*/
//点击商品因调整转至商品详情界面，需要信息：地址+商品编号，地址从顶部获取，编号从商品div的data-id获取
$.fn.itemclick=function(){
    $("#goods_list").on("click","a",function(){

    })
}



//获取头部地址信息的函数


