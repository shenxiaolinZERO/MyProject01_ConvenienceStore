var f=false;
$(document).ready(function () {
    if(f==false){
        isload();
        //顶部地址改变
        loadname();
        $().otherpageapos();
        //顶部地址改变
        $().poschange();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();
        $().toptabClick();
        loadItem();
        $().paymentbtn();
        f=true;
    }

})
$(function () {
    $('#myTab a').tab('show');
});

//选择小区完成
$.fn.villclick= function () {
//t顶部
    $("#vil").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name",e);
        $(".hd-prochg").hide();
        //拼装写入cookie
        var pos=$("#cit").attr("data-name")+$("#ear").attr("data-name")+$("#vil").attr("data-name");
        var post=$("#cit").attr("data-name")+"-"+$("#ear").attr("data-name")+"-"+$("#vil").attr("data-name");
        $("#cityname").attr("data-positon",pos);
        $("#cityname").attr("data-cityname",post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x=[$("#cit").attr("data-name"),$("#ear").attr("data-name"),$("#vil").attr("data-name")];
        $.cookie("proeare",x,{expires:7});
        //------------------------更新页面----检查商品是否该地区---------------------------//
        chgadcheck(post);

    })
}
//改变地区，检查是否有货
function chgadcheck(pos){
    var custno=isload();
    if(custno!=null&custno!=""){
        var x={"cust":custno, "areaName":pos};
        $.ajax({
            type: "post",
            url: "http://192.168.113.14:8080/BSMD/car/isOnArea.do",
            data:JSON.stringify(x),
            dataType: "json",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                console.log(data);
                if(data!=null){
                    var itemlist=$(".cart-prod");
                    for(var i=0;i<data.list.length;i++){
                        var barcode=$(itemlist[i]).attr("data-barcode");
                        if(barcode==data.list[i].barcode){
                            if(data.list[i].isOnArea){
                                $(itemlist[i]).attr("disabled","true");
                                $(itemlist[i]).children().css("pointer-events","auto");
                                $(itemlist[i]).removeClass("mask");
                                $(itemlist[i]).next().addClass("_none");
                            }else {
                                $(itemlist[i]).attr("disabled","false");
                                $(itemlist[i]).children().css("pointer-events","none");
                                $(itemlist[i]).addClass("mask");
                                $(itemlist[i]).next().removeClass("_none");
                            }
                        }
                    }
                }
            }
        })
            //地址改变商品问题。。。。。。
        $().checkstore();
        collectInf();
    }
}
//加载商品
function loadItem() {
    var name=isload();
    if(name!=null&&name!=""){
        var pos = $("#cityname").attr("data-cityname");
        var x={"cust":name, "areaName":pos};
        console.log(x)
        //$.cookie("store").
        $.ajax({
            type: "post",
             url: "http://192.168.113.14:8080/BSMD/car/showCar.do",
            data:JSON.stringify(x),
            dataType: "json",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                var json = data;
                console.log(data);
                html='';
                if(json.cartList==null){
                    //提示购物车为空
                    $(".emptycart").show();
                    $("#cartpaybar").hide();
                    return;
                }
                if(json!=null){
                    $(".emptycart").hide();
                    $("#cartpaybar").show();
                    //店铺列表
                    var html='';
                    var number=0;
                    var totalpri=0;
                    var itemnum=[];
                    for(var i=0;i<json.cartList.length;i++){
                        //商品名称
                        var itemname=json.cartList[i].itemName+" "+json.cartList[i].itemSize;
                        //店铺列表同时存库存
                        var shopNam="";
                        totalpri+=json.cartList[i].totalPrice;
                        number+=json.cartList[i].num;
                        for(var j=0;j<json.cartList[i].shopNameList.length;j++){
                            shopNam='<span data-id="'+json.cartList[i].shopNameList[j].shopNo+'">'+json.cartList[i].shopNameList[j].shopName+'<span>';
                        }
                        html+='<li class="cart-prod" data-container="body" data-toggle="popover" data-placement="top" data-content="库存不足！"' +
                            ' id="'+json.cartList[i].itemNo+'" data-barcode="'+json.cartList[i].barcode+'"><div class="col-lg-5">';
                        html+='<input type="checkbox"class="cart-checkbox cart-checkbox-checked" checked="yes" value="">';
                        html+='<a class="pic" target="_blank" onclick="" href="itemDetial.html?id='+json.cartList[i].itemNo+'"><img src="'+json.cartList[i].url+'"></a>';
                        html+='<div class="tit "><a title="'+itemname+'"target="_blank" href="itemDetial.html?id='+json.cartList[i].itemNo+'">'+itemname+'</a><strong class="not_stock _none">该商品库存不足</strong></div>';
                        html+='</div><div class="col-lg-2 price"><ins>'+(json.cartList[i].itemSalePrice).toFixed(2)+'</ins></div>';
                        html+='<div class="col-lg-1" style="margin-top: 15px"><input type="text" class="spinner"></div>';
                        html+='<div class="col-lg-1 count"><strong>'+(json.cartList[i].totalPrice).toFixed(2)+'</strong></div>'
                        html+='<div class="col-lg-2 store">'+shopNam+'</div>';
                        html+='<div class="col-lg-1 favorite"> <a class="favorites"  data-id="'+json.cartList[i].itemNo+'">移入收藏</a><br/> ';
                        html+='<a class="items-delete" num="1" productid="'+json.cartList[i].barcode+'">删除</a> </div></li><div class="_none notsell">商品此地区无货，您还可以选择其他商品</div>';
                        itemnum[i]=json.cartList[i].num;
                    }

                    var html2='';
                    for(var i=0;i<json.allShop.length;i++){
                        html2+='<input type="radio" name="store" value="1号店铺" data-id="'+json.allShop[i].shopNo+'"> <span>'+json.allShop[i].shopName+'</span> ' ;
                    }
                    $(".cart-list").append(html);
                    $(".checkstore").append(html2);
                    $("#cartnumber").html(number);
                    $("#totalpri").html(totalpri.toFixed(2));
                    y=itemnum;
                    var z=$(".spinner");
                    //spinner 设初值
                    for(i=0;i<itemnum.length;i++){
                        $(z[i]).spinner({value:itemnum[i],min:1});
                    }
                    $().stockcheck();
                    $().checkstore();
                    collectInf();

                }
            }
        })
    }

}
//增加数量
$.fn.stockcheck=function(){
    $(".cart-list").on("click",".increase",function () {
        var tempthis=$(this);
        //商品名称
        //商品数量
        var x=$(this).prev().val();
        //包围div
        var y=$(this).parent().parent();

        var z= y.prev();
        var c=Number($(z).children().first().html());
        var barcode= y.parent().attr("data-barcode");
        var itemnum= Number(x);
        //所选店铺
        var shopNo=$(".checkstore input[name=store]").filter(":checked").attr("data-id");
        var name=isload();

        if(name!=null&&name!="") {

            var js={"custNo":name,"barcode":barcode,"num":itemnum,"shopNo":shopNo};
            $.ajax({
                type:"post",
                data:JSON.stringify(js),
                dataType:"json",
                url: "http://192.168.113.14:8080/BSMD/car/updateItemNum.do",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (data) {
                    if(data.result=="success"){
                        y.next().html("<strong>"+(itemnum*c).toFixed(2)+"</strong>");
                        collectInf();

                    }else{
                        $(tempthis).prev().val(itemnum-1);
                        $(tempthis).attr("disabled","disabled");
                        var notstock= $(tempthis).parent().parent().prev().prev();
                        notstock.find(".not_stock").removeClass("_none");
                        collectInf();
                    }
                }
            })
        }


    })
    //商品数量减少
    $(".cart-list").on("click",".decrease",function () {
        var tempthis=$(this);
        var x=$(this).next().val();
        var y=$(this).parent().parent();
        var z= y.prev();
        //单价
        var c=$(z).children().first().html();
        var barcode= y.parent().attr("data-barcode");
        var itemnum= Number(x);

        //所选店铺
        var shopNo=$(".checkstore input[name=store]").filter(":checked").attr("data-id");
        var name=isload();

        if(name!=null&&name!="") {

            var js={"custNo":name,"barcode":barcode,"num":itemnum,"shopNo":shopNo};
            $.ajax({
                type:"post",
                data:JSON.stringify(js),
                dataType:"json",
                url: "http://192.168.113.14:8080/BSMD/car/updateItemNum.do",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (data) {
                    if(data.result=="success"){
                        y.next().html("<strong>"+(itemnum*c).toFixed(2)+"</strong>");
                        var notstock= $(tempthis).parent().parent().prev().prev();
                        notstock.find(".not_stock").addClass("_none");
                        collectInf();
                    }
                }
            })

        }
    })

    //购物车商品移除
    $(".cart-list").on("click",".items-delete",function(){
        var barcode=$(this).attr("productid");
        var name=isload();
        if(name!=null&&name!=""){
            var x={"custNo":name,"barcodes":[{"barcode":barcode}]};
            $.ajax({
                type:"post",
                data:JSON.stringify(x),
                dataType:"json",
                url: "http://192.168.113.14:8080/BSMD/car/deletFromCar.do",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (data) {
                    console.log(data);
                    if(data!=null){
                        var x=$(".cart-prod");
                        var notsell=$(".notsell");
                        for(var i=0;i< x.length;i++){

                            if($(x[i]).attr("data-barcode")==barcode){
                                $(x[i]).remove();
                                $(notsell[i]).remove();
                                collectInf();
                                if(x.length==1){
                                    //提示购物车为空
                                    $(".emptycart").show();
                                    $("#cartpaybar").hide();
                                }
                                break;
                            }

                        }
                    }
                }
            })
        }
    })
    //移入收藏夹
    $(".cart-list").on("click",".favorites", function () {
        var tempthis=$(this);
        var item=$(this).attr("data-id");
        var name=isload();
        if(name!=null&&name!=""&&item!=null){
            var info = {"custno": name, "itemNo": item};
            $.ajax({
                type: "post",
                url: "http://192.168.113.14:8080/BSMD/insertCollection.do",
                data: JSON.stringify(info),
                datatype: "json",
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    if (data.code == "success") {
                       $(tempthis).text("已收藏");
                        $(tempthis).css("color","#ff6666");
                    } else if(data.code == "error") {
                        $(tempthis).text("已收藏");
                        $(tempthis).css("color","#ff6666");
                    }
                }
            });
        }
    })
}
//判断店铺是否该地区有
function changestore(x,y){
    for(var i=0;i< x.length;i++){
        var z=$(x[i]).children();
        var flag=false;
        for(var j=0;j< z.length;j++){
            if($(z[j]).attr("data-id")==y){
                flag=true;
            }
        }
        if(flag==false){
            $(x[i]).parent().attr("disabled","false");
            $(x[i]).siblings().css("pointer-events","none");
            $(x[i]).parent().addClass("mask");
            $(x[i]).parent().next().removeClass("_none");
        }else{
            $(x[i]).parent().attr("disabled","true");
            $(x[i]).siblings().css("pointer-events","auto");
            $(x[i]).parent().removeClass("mask");
            $(x[i]).parent().next().addClass("_none");
        }

    }
}
//选择店铺没有变灰//
$.fn.checkstore=function(){
    var zz=$(".cart-bottom .checkstore input[name=store]");
    $(zz[0]).attr("checked","checked");
    var x=$(".col-lg-2.store");
    var y=$(zz[0]).attr("data-id")
    changestore(x,y);
    collectInf();
    $(".cart-bottom .checkstore").on("click","input[name=store]", function () {
        var x=$(".col-lg-2.store");
        var y=$(this).attr("data-id");
        changestore(x,y);
        collectInf();
    })
}
//全选的按钮
$.fn.selectall= function () {
    $("#qx").click(function() {
        $(".cart-checkbox").prop("checked", this.checked);
        collectInf();
    });
    $(".cart-checkbox").click(function() {
        var $subs = $(".cart-checkbox");
        $("#qx").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
        collectInf();
    });
}
function collectInf() {
    var col=$(".cart-prod").not(".mask");
    var totalnum=0;
    var totalprice=0;
    for(var i=0;i<col.length;i++) {
        if ($(col[i]).find(".cart-checkbox").is(':checked')) {
            totalnum += Number($(col[i]).find(".spinner.value").val());
            totalprice += Number($(col[i]).find(".col-lg-1.count>strong").html());
        }
    }
    $(".goondsnum").html(totalnum);
    $(".cart-paybar-info").html(totalprice.toFixed(2));
    $("#cartnumber").html(totalnum);
    $("#totalpri").html(totalprice.toFixed(2))

}


//把购买的商品信息收集，和选店铺信息收集
$.fn.paymentbtn= function () {

    $("#paybtn").on("click", function () {
        if($("#totalpri").html()=="0.00"){
            $("#paybtn").popover("show");
            setTimeout(function(){  $("#paybtn").popover("hide");},3000);
            return;
        }




        var shopno=$(".checkstore").find( "input[name=store]:checked").attr("data-id");
        var col=$(".cart-prod").not(".mask");
        var barcode=[];
        var num=[];
        for(var i=0;i<col.length;i++) {
            if ($(col[i]).find(".cart-checkbox").is(':checked')) {
                barcode[i]= $(col[i]).attr("data-barcode");
                num[i]=$(col[i]).find(".spinner.value").val();
            }
        }
        var t=[];
        var barcodes=[];
        for(var i=0;i<num.length;i++){
            var json={};
            var j={};
            json.num=num[i];
            json.barcode=barcode[i];
            j.barcode=barcode[i];
            t.push(json);
            barcodes.push(j);
        }
       var name=isload();
        if(name!=""&&name!=null){
            var x={"shopNo":shopno,"custNo":name,"itemList":t};
            var y={"custNo":name,"barcodes":barcodes};
            console.log(x);

            var json={"shopNo":shopno,"custNo":name,"itemlist":t};
            var jsonStr=JSON.stringify(json);
            $.cookie("cart",jsonStr,{expires:2});
            $.cookie("barcodes",JSON.stringify(y),{expires:2});
            $.ajax({
                type:"post",
                data:JSON.stringify(x),
                dataType:"json",
                url: "http://192.168.113.14:8080/BSMD/order/settlement",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (data) {
                    console.log(data);
                    if(data.message=="success"){
                        location.href="con_order.html?id="+data.id;
                        $.cookie("orderinf",JSON.stringify(data));

                    }
                    else if(data.message=="商品库存不足"){
                        if(data.list.length>0){
                            for(var i;i<data.list.length;i++){
                               var t= document.getElementById(data.list[i]);
                                $(t).popover("show");
                            }

                        }

                    }
                    else {
                        alert(data.message)
                    }

                }
            })
        }
    })
}

