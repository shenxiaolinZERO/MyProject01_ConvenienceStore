/**
 * Created by lenovo on 2016-03-01.
 */
$(document).ready(function () {
    isLoad();
    itemClass();
    shopList();
    PromoitemList("","",1,3);
    searchPromoitem();
    updateRate();
    deletePromoItem();
    batchDelete();//批量删除
    itemList("","","",1,3);//加载商品列表
    selectall();//全选
    $().pageclick2();//点击全部商品列表的页码
    $().pageclick1();//点击促销商品列表的页码
    addItem();//添加促销商品
    get_data();//先加载待订单数
    //updateData();//30秒一次刷新待处理订单数据

})
//加载店铺
function shopList(){
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchShop.do",
        dataType: "json",
        //data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            var html='';
            html+='<option value="0">全部</option>';
            for(var i=0;i<json.shopList.length;i++){
                var j=i+1;
                html+='<option data-shopNo="'+json.shopList[i].shopNo+'" value="'+j+'" >'+json.shopList[i].shopName+'</option>';
            }
            $("#shopName1").html("");
            $("#shopName1").append(html);
            $("#shopName2").html("");
            $("#shopName2").append(html);
        }
    });


}
//加载商品类别
function itemClass(){
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchItemClass.do",
        dataType: "json",
        //data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            var html='';
            html+='<option value="0">全部</option>';
            for(var i=1;i<json.classList.length;i++){
                html+='<option value="'+i+'" data-itemClass="'+json.classList[i].itemClass+'">'+json.classList[i].className+'</option>';
            }
            $("#bigClass1").html("");
            $("#bigClass1").append(html);
            $("#bigClass2").html("");
            $("#bigClass2").append(html);
        }
    });
}

//按条件和店铺搜索促销商品
function searchPromoitem(){
    $("#searchList").on("click", function(){
        var itemCla=showClass1();
        var shopno=showShop1();
        PromoitemList(itemCla,shopno,1,3);

    });
    $("#searchItem").on("click", function(){
        var itemCla=showClass2();
        var shopno=showShop2();
        var itemName=$.trim( $("#itemKey").val());
        console.log(itemName);
        itemList(shopno,itemCla,itemName,1,3);

    });


}

//改变类别时
function showClass1(){
    var itemClaName=$("#bigClass1 option:checked").text();
    var itemCla;
    if(itemClaName==="全部"){
        itemCla="";
    }else{
        itemCla=$("#bigClass1 option:checked").attr("data-itemClass");
    }

    return itemCla;
}
//改变店铺时
function showShop1(){
    var shopName=$("#shopName1 option:checked").text();
    var shopno;
    if(shopName==="全部"){
        shopno="";
    }else{
        shopno=$("#shopName1 option:checked").attr("data-shopNo");
    }

    return shopno;
}

//改变类别时
function showClass2(){
    var itemClaName=$("#bigClass2 option:checked").text();
    var itemCla;
    if(itemClaName==="全部"){
        itemCla="";
    }else{
        itemCla=$("#bigClass2 option:checked").attr("data-itemClass");
    }

    return itemCla;
}
//改变店铺时
function showShop2(){
    var shopName=$("#shopName2 option:checked").text();
    var shopno;
    if(shopName==="全部"){
        shopno="";
    }else{
        shopno=$("#shopName2 option:checked").attr("data-shopNo");
    }

    return shopno;
}
//修改折扣率
function updateRate(){
    $("tbody#promoItem").on("click","tr td a#update",function(){
        var rate=$(this).parent().parent().children(".ra").children().html();
        var no=$(this).parent().parent().children(".goods").children().attr("data-itemNo");
        var name=$(this).parent().parent().children(".goods").children().html();
        var primPrice=$(this).parent().parent().children(".sprice").children().html();//原价
        var priority=$(this).parent().parent().children(".pri").children().html();//优先级
        $("#PromoName").html(name);
        $("#rate").val(rate);
        $("#prior").val(priority)
        submitRate(no,primPrice);
    });
}
//修改模态框的提交更改  需增加一个优先级字段
function submitRate(no,primPrice){
    $("#submitRate").on("click",function(){
        var rate=$("#rate").val();
        var yha=(rate*primPrice).toFixed(2);
        var priority=$("#prior").val();
        var x={itemNo:no,discountRate:rate,yhAmt:yha,orderNo:priority};
        $.ajax({
            type:"post",
            url:"http://192.168.113.15:8080/BSMD/Administrator/updateItemCx.do",
            dataType:"json",
            data:JSON.stringify(x),
            header:{"Content-Type": "application/json", "Accept": "application/json"},
            success:function(data){
                console.log(data);
                var d=$("table tbody#promoItem tr");
                $.each(d,function (){
                    var itemNo=$(this).children(".goods").children().attr("data-itemNo");
                    if(itemNo==no){
                        $(this).children("td.pri").remove();
                        var html3='<td style="width: 15%" class="pri"><span>'+priority+'</span></td>';
                        $(this).children("td.goods").after(html3);
                        $(this).children("td.ra").remove();
                        var html1='<td class="ra"><span>'+rate+'</span></td>';
                        $(this).children("td.ya").before(html1);
                        $(this).children("td.ya").remove();
                        var html2='<td class="ya"><span>'+yha+'</span></td>';
                        $(this).children("td.ra").after(html2);

                    }
                })
            }
        });


    })
}
//删除某个促销商品
function deletePromoItem(){
    $("tbody#promoItem").on("click","tr td a#delete",function(){
        var no=[];
        no[0]=$(this).parent().parent().children(".goods").children().attr("data-itemNo");
        var x={itemNos:no};
        deleteAjax(x);
        $(this).parent().parent().remove();
    });

}
function deleteAjax(x){
    $.ajax({
        type:"post",
        url:"http://192.168.113.15:8080/BSMD/Administrator/deleteItemCx.do",
        dataType:"json",
        data:JSON.stringify(x),
        header:{"Content-Type": "application/json", "Accept": "application/json"},
        success:function(data){
            console.log(data);
            alert("删除成功！");

        }
    });
}
//增加促销商品=====打折是在售价的基础上进行的吗？？
function addItem(){
    $("#unpromoItem").on("click","td a#add",function(){
        var itemName=$(this).parent().parent().children("td.goods").children("span").html();
        var no=$(this).parent().parent().children("td.goods").children("span").attr("data-itemNo");
        var itemPrice=$(this).parent().parent().children("td.sprice").children("span").html();
        $("#unPromoName").html(itemName);
        $("#submitRate2").click(function(){
            var itemRate=$("#editRate").val();
            var shopno=showShop2();
            var yh=pricefixto(itemPrice*itemRate);
            var prior=$("#priority").val();
            if(shopno==""){
                alert("请选择店铺！");
            }else if(itemRate==""){
                alert("请填写折扣率");
            }else if(prior==""){
                alert("请填写优先级！");
            }
            else{
                var x={itemNo:no,yhAmt:yh,discountRate:itemRate,branchNo:shopno,orderNo:prior};
                $.ajax({
                    type: "post",
                    url: "http://192.168.113.15:8080/BSMD/Administrator/insertItemCx.do",
                    dataType: "json",
                    data: JSON.stringify(x),
                    header: {"Content-Type": "application/json", "Accept": "application/json"},
                    success: function (data) {
                        console.log(data);
                        if(data.message==""){
                            alert("添加成功");
                        }else{
                            alert(data.message);
                        }

                        $("#bigClass1 option:checked").text("全部");
                        $("#shopName1 option:checked").text("全部");
                        PromoitemList("","",1,3);
                    }
                });
            }
        });
    });
}
//加载全部商品列表 shopno itemname classname
function itemList(shopNo,className,itemName,index,count){
    var x={shopno:shopNo,itemname:itemName,classname:className,pageindex:index,pagecount:count};
    $.ajax({
        type: "post",
        url: "http://192.168.113.14:8080/BSMD/item/item.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            var html='';
            for(var i=0;i<json.itemlist.list.length;i++){
                html+='<tr>';
                html+='<td class="goods"><span target="_blank" data-itemNo="'+json.itemlist.list[i].itemNo+'">'+json.itemlist.list[i].itemName+'</span>';
                //var primePrice=(json.cxList[i].itemCx.yhAmt/json.cxList[i].itemCx.discountRate).toFixed(2);
                html+='<td class="sprice"><span>'+pricefixto(json.itemlist.list[i].itemSalePrice)+'</span></td>';
                //html+='<td style="width: 15%"><span>'+json.cxList[i].shopName+'</span></td>';
                html+='<td class="ra"><span>1</span></td>';
                //html+='<td class="ya"><span>'+pricefixto(json.cxList[i].itemCx.yhAmt)+'</span></td>';
                html+='<td ><a id="add" data-toggle="modal"  data-target="#myAdd">添加</a></td></tr>';
            }
            var html1=showPage(json.itemlist.pageSize,json.itemlist.pageIndex);
            console.log(json.itemlist.pageSize);
            $("#page2").html(html1);
            $("#unpromoItem").html("");
            $("#unpromoItem").append(html);
        }
    });
}
//增加促销商品  branchNo：店铺编号   yhAmt：优惠价

//加载促销商品列表
function PromoitemList(itemCla,shopno,Index,Count){

    var x={itemClass:itemCla,shopNo:shopno,pageIndex:Index,pageCount:Count};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchItemCx.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            itemContent(json);



        }
    });
}
//批量删除
function batchDelete(){
    $("#batchDelete").on("click",function(){
        var d=$("table tbody#promoItem tr");
        var i=0;
        var no=[];
        $.each(d,function (){
            var check=$(this).children(".item_all").children("input").is(':checked');


            if(check){
                no[i]=$(this).children(".item_all").children("input").attr("data-No");
                i=i+1;
            }
        })
        var x={itemNos:no};
        deleteAjax(x);
        $("#shopName1 option:checked").text("全部");
        $("#bigClass1 option:checked").text("全部");
        PromoitemList("","",1,3);

    })

}
/*---促销商品页码的跳转---*/
$.fn.pageclick1= function (){
    $("#page1").on("click", "a",function () {
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if($(this).hasClass("next")){
            var page=$("#page1").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if($(this).prev().hasClass("forword")){
                return;
            }
            pageIndex=pageIndex+1;
            $("#shopName1 option:checked").text("全部");
            $("#bigClass1 option:checked").text("全部");
            PromoitemList("","",pageIndex,3);



        }else if($(this).hasClass("forword")){
            var page=$("#page1").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            pageIndex=pageIndex-1;
            $("#shopName1 option:checked").text("全部");
            $("#bigClass1 option:checked").text("全部");
            PromoitemList("","",pageIndex,3);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            $("#shopName1 option:checked").text("全部");
            $("#bigClass1 option:checked").text("全部");
            PromoitemList("", "", pageIndex, 3);
        }
    })
}
/*---全部商品页码的跳转---*/
$.fn.pageclick2 = function (){
    $("#page2").on("click", "a",function () {
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if($(this).hasClass("next")){
            var page=$("#page2").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if($(this).prev().hasClass("forword")){
                return;
            }
            pageIndex=pageIndex+1;
            $("#shopName2 option:checked").text("全部");
            $("#bigClass2 option:checked").text("全部");
            $("#itemKey").val("");
            itemList("","","",pageIndex,3);


        }else if($(this).hasClass("forword")){
            var page=$("#page2").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            pageIndex=pageIndex-1;
            $("#shopName2 option:checked").text("全部");
            $("#bigClass2 option:checked").text("全部");
            $("#itemKey").val("");
            itemList("","","",pageIndex,3);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            $("#shopName2 option:checked").text("全部");
            $("#bigClass2 option:checked").text("全部");
            $("#itemKey").val("");
            itemList("","","",pageIndex,3);
        }

    })
}


function itemContent(json){
    var html='';
    for(var i=0;i<json.cxList.length;i++){
        html+='<tr><td class="item_all"><input type="checkbox" class="cart-checkbox cart-checkbox-checked"  value="" data-No="'+json.cxList[i].itemNo+'"></td>';
        html+='<td class="goods"><span target="_blank" data-itemNo="'+json.cxList[i].itemNo+'">'+json.cxList[i].itemName+'</span>';
        var primePrice=(json.cxList[i].itemCx.yhAmt/json.cxList[i].itemCx.discountRate).toFixed(2);
        html+='<td style="width: 15%" class="pri"><span>'+json.cxList[i].itemCx.orderNo+'</span></td>';
        html+='<td style="width: 15%"><span>'+json.cxList[i].shopName+'</span></td>';
        html+='<td class="sprice"><span>'+primePrice+'</span></td>';
        html+='<td class="ra"><span>'+json.cxList[i].itemCx.discountRate+'</span></td>';
        html+='<td class="ya"><span>'+pricefixto(json.cxList[i].itemCx.yhAmt)+'</span></td>';
        html+='<td><a id="update" style="display: block" data-toggle="modal"  data-target="#myUpdate">修改</a><a id="delete">删除</a></td></tr>';
    }
    var html1=showPage(json.pageSize,json.pageIndex);
    $(".pag>#page1").html(html1);
    $("#promoItem").html("");
    $("#promoItem").append(html);
}

