$(document).ready(function () {
  loadItem();
    ////顶部地址改变
    $().poschange();
    $().otherpageapos();
    $().stockcheck();
    loadname();
    $().paymentbtn();
})
$(function () {
    $('#myTab a').tab('show');
});

//加载商品吧
function loadItem() {
    var x={"cust":"cust01", "areaName":"明阳小区"};
    //$.cookie("store").
    $.ajax({
        type: "post",
        url: "http://192.168.199.241:8080/BSMD/car/showCar.do",
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
            if(json!=null){
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
                    html+='<li class="cart-prod" id="'+json.cartList[i].itemNo+'" data-barcode="'+json.cartList[i].barcode+'"> <div class="col-lg-5">';
                    html+='<input type="checkbox"class="cart-checkbox cart-checkbox-checked" checked="yes" value="">';
                    html+='<a class="pic" target="_blank" onclick="" href="#"><img src="'+json.cartList[i].url+'"></a>';
                    html+='<div class="tit "><a title="'+itemname+'"target="_blank" href="">'+itemname+'</a><strong class="_none">该商品已下架或无货</strong></div>';
                    html+='</div><div class="col-lg-2 price"><ins>'+(json.cartList[i].itemSalePrice).toFixed(2)+'</ins></div>';
                    html+='<div class="col-lg-1" style="margin-top: 15px"><input type="text" class="spinner"></div>';
                    html+='<div class="col-lg-1 count"><strong>'+(json.cartList[i].totalPrice).toFixed(2)+'</strong></div>'
                    html+='<div class="col-lg-2 store">'+shopNam+'</div>';
                    html+='<div class="col-lg-1"> <a class="favorites" onclick="" pruductid="'+json.cartList[i].itemNo+'" href="">移入收藏</a><br/> ';
                    html+='<a class="items-delete" num="1" productid="'+json.cartList[i].itemNo+'" onclick="" href="#">删除</a> </div></li>';
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
                $(".goondsnum").html(number);
                $(".cart-paybar-info").append(totalpri.toFixed(2));
                $('.spinner').spinner({});
                y=itemnum;
                var x=  $(".spinner.value.passive");
                for(i=0;i<itemnum.length;i++){

                    $(x[i]).val(itemnum[i]);
                }
                $().stockcheck();
                $().checkstore();
                collectInf();
            }
        }
    })
}
//增加数量
$.fn.stockcheck=function(){
    $(".cart-list").on("click",".increase",function () {

        //用户名称

        var x=$(this).prev().val();
        var y=$(this).parent().parent();
        var z= y.prev();
        var c=$(z).children().first().html();
        var barcode= y.parent().attr("data-barcode");
        var itemnum= Number(z.val())+1;
        //所选店铺
        var shopNo=$(".checkstore input[name=store]").filter(":checked").attr("data-id");
        var js={"custNo":"cust01","barcode":barcode,"num":itemnum,"shopNo":shopNo};
        $.ajax({
            type:"post",
            data:JSON.stringify(js),
            dataType:"json",
            url:"http://192.168.199.241:8080/BSMD/car/updateItemNum.do",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                if(data.result=="success"){
                    z.val(itemnum);
                    y.next().html("<strong>"+(x*c).toFixed(2)+"</strong>")
                    var t=$(".count");
                    var tol=0;
                    for(var i=0;i< t.length;i++){
                        tol+=Number($(t[i]).children().html());
                    }
                    $(".col-lg-4 .cart-paybar-info").html(tol.toFixed(2));
                    $("#totalpri").html(tol.toFixed(2));
                    //商品总数量修改
                    var totalnum=0;
                    $(".spinner.value").each(function () {
                        totalnum+= Number($(this).val());
                    })
                    $("#cartnumber").html(totalnum);
                    $(".col-lg-4 .goondsnum").html(totalnum);

                }else{
                    z.val(itemnum-1);
                    $(this).attr("disable","disable");
                    alert("库存不足");
                }
            }
        })
        collectInf();


    })
}
//增加数量
$.fn.stockcheck=function(){
    $(".cart-list").on("click",".decrease",function () {
        var x=$(this).next().val();
        var y=$(this).parent().parent();
        var z= y.prev();
        var c=$(z).children().first().html();
        y.next().html("<strong>"+(x*c).toFixed(2)+"</strong>")
        //var t=$(".count");
        //var tol=0;
        //for(var i=0;i< t.length;i++){
        //    tol+=Number($(t[i]).children().html());
        //}
        //$(".col-lg-4 .cart-paybar-info").html(tol.toFixed(2));
        //$("#totalpri").html(tol.toFixed(2));
        ////商品总数量修改
        //var totalnum=0;
        //$(".spinner.value").each(function () {
        //    totalnum+= Number($(this).val());
        //})
        //$("#cartnumber").html(totalnum);
        //$(".col-lg-4 .goondsnum").html(totalnum);
        collectInf();
    })
    $(".cart-list").on("click",".increase",function () {

        //用户名称

        var x=$(this).prev().val();
        var y=$(this).parent().parent();
        var z= y.prev();
        var c=$(z).children().first().html();
        var barcode= y.parent().attr("data-barcode");
        var itemnum= Number(z.val())+1;
        //所选店铺
        var shopNo=$(".checkstore input[name=store]").filter(":checked").attr("data-id");
        var js={"custNo":"cust01","barcode":barcode,"num":itemnum,"shopNo":shopNo};
        $.ajax({
            type:"post",
            data:JSON.stringify(js),
            dataType:"json",
            url:"http://192.168.199.241:8080/BSMD/car/updateItemNum.do",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                if(data.result=="success"){
                    z.val(itemnum);
                    y.next().html("<strong>"+(x*c).toFixed(2)+"</strong>")
                    collectInf();
                }else{
                    z.val(itemnum-1);
                    $(this).attr("disable","disable");
                    alert("库存不足");
                }
            }
        })


    })
}
//选择店铺没有变灰
$.fn.checkstore=function(){
    var zz=$(".cart-bottom .checkstore input[name=store]");
    $(zz[0]).attr("checked","checked");
    var x=$(".col-lg-2.store");
    var y=$(zz[0]).attr("data-id")
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
        }else{
            $(x[i]).parent().attr("disabled","true");
            $(x[i]).siblings().css("pointer-events","auto");
            $(x[i]).parent().removeClass("mask");
        }
    }
    collectInf();
    $(".cart-bottom .checkstore").on("click","input[name=store]", function () {
        var x=$(".col-lg-2.store");
        var y=$(this).attr("data-id");
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
            }else{
                $(x[i]).parent().attr("disabled","true");
                $(x[i]).siblings().css("pointer-events","auto");
                $(x[i]).parent().removeClass("mask");
            }
        }
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
        var json='{'
        for(var i=0;i<num.length;i++){
            json+='"';
            json+=i+'":"';
            json+=num[i];
            if(i!=num.length-1){
                json+='",'
            }
        }
        json+='}';
        var y='{'
        for(var i=0;i<barcode.length;i++){
            y+='"';
            y+=i+'":"';
            y+=barcode[i];
            if(i!=barcode.length-1){
                y+='",'
            }
        }

        y+='}';
        y=JSON.parse(y);
        json=JSON.parse(json);
        var x={"shopNo":shopno,"cust":"cust01","item":y,"num":json};

       console.log(x);

    })
}

