/**
 * Created by lenovo on 2016-01-29.
 */
$(document).ready(function () {

    isLoad();
    //日期选择
    $("#beginTime").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#endTime').datepicker('option', 'minDate', d);
            }
        });
    $("#endTime").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#beginTime').datepicker('option', 'maxDate', d);
            }
        });
    var today = new Date();
    var d = new Date(today);
    d.setDate(d.getDate());
    var month = d.getMonth()+ 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var date= d.getFullYear() + "-" + month + "-" + day;
    $('#beginTime').val(date);
    $('#endTime').val(date);
    //日期控件结束================
        $("#condition1").hide();
        $("#condition2").hide();
        selectcondition();
        searchOrder();   //querystatu:2已接单   1待接单
    var no="",begin="",end="",quSta= 1,pageIndex= 1,pageCount=4;
    var orderObj={querystatu:quSta,shopNo:no,beginTime:begin,endTime:end,pageIndex:pageIndex,pageCount:pageCount};
    var jsonStr = JSON.stringify(orderObj);
    $.cookie("order", jsonStr);//将状态存储在cookie中
    //加载店铺
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
            for(var i=0;i<json.shopList.length;i++){
            html+='<option data-shopNo="'+json.shopList[i].shopNo+'" value="'+i+'" >'+json.shopList[i].shopName+'</option>';
            }
            $("#shopList").html("");
            $("#shopList").append(html);
        }
    });
        //加载未处理订单
        orderAjax(quSta,no,begin,end,pageIndex,pageCount);


        Order();
        accOrder();
        confirmOrder();//确认收货
       //updateData();//30秒一次刷新待处理订单数据

       $().pageclick();


})
//更新订单数目和订单
//function get_data()
//{
//    var jsonStr = $.cookie("order");//从cookie中取值
//    var obj = JSON.parse(jsonStr);
//    var x={querystatu:obj.querystatu,shopNo:obj.shopNo,startTime:obj.beginTime,endTime:obj.endTime};
//    orderAjax(obj.querystatu,obj.shopNo,obj.beginTime,obj.endTime);
//}
//====所有/未接单/已接单/已完成订单
function Order(){

    $("#allOrder").on("click", "a",function () {
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        obj.querystatu="";
        jsonStr = JSON.stringify(obj);
        $.cookie("order", jsonStr);
        orderAjax(obj.querystatu,obj.shopNo,obj.beginTime,obj.endTime,1,obj.pageCount);

    });
    $("#unProcessed").on("click", "a",function () {
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        obj.querystatu=1;
        jsonStr = JSON.stringify(obj);
        $.cookie("order", jsonStr);
        orderAjax(obj.querystatu,obj.shopNo,obj.beginTime,obj.endTime,1,obj.pageCount);



        });
    $("#haveProcessed").on("click","a", function () {
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        obj.querystatu=2;
        jsonStr= JSON.stringify(obj);
        $.cookie("order", jsonStr);
        orderAjax(obj.querystatu,obj.shopNo,obj.beginTime,obj.endTime,1,obj.pageCount);


    });
    $("#haveFinished").on("click","a", function () {
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        obj.querystatu=3;
        jsonStr= JSON.stringify(obj);
        $.cookie("order", jsonStr);
        orderAjax(obj.querystatu,obj.shopNo,obj.beginTime,obj.endTime,1,obj.pageCount);


    })

}
//订单
function orderAjax(sta,shopno,starttime,endtime,pageIndex,pageCount){
    var x = {querystatu:sta,shopNo:shopno,startTime:starttime,endTime:endtime,pageIndex:pageIndex,pageCount:pageCount};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchOrders.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            $().orderList(json);
        }
    });
}
//获取选择的选项条件，显示对应的文本框或时间选择控件
function selectcondition() {
    var conTitle=$("#conTitle option:checked").text();
    console.log(conTitle);
    if(conTitle=="--请选择--"){
        $("#condition1").hide();
        $("#condition2").hide();
    }
    if(conTitle=="店铺"){
        $("#condition1").show();
        $("#condition2").hide();
    }
    if(conTitle=="下单时间"){
        $("#condition1").hide();
        $("#condition2").show();
    }
}
//按所选条件查询==========可把当前订单的状态,查询条件存在cookie中。
function searchOrder(){
    $("#searchOrd").on("click", function () {
        var conTitle=$("#conTitle option:checked").text();
        var conShopNo="";
        var beginTime="";
        var endTime="";
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        var sta=obj.querystatu;
        console.log(conTitle);
        if(conTitle=="--请选择--"){
            alert("请选择所需的条件查询！");
            obj.shopNo="";
            obj.beginTime="";
            obj.endTime="";
        }
        if(conTitle=="店铺"){
             conShopNo=$("#shopList option:checked").attr("data-shopNo");
            obj.shopNo=conShopNo;
            obj.beginTime="";
            obj.endTime="";
        }
        if(conTitle=="下单时间"){
             beginTime=$("#beginTime").val();
             endTime=$("#endTime").val();
            obj.shopNo="";
             obj.beginTime=beginTime;
             obj.endTime=endTime;
        }
        jsonStr = JSON.stringify(obj);
        $.cookie("order", jsonStr);
        orderAjax(sta,obj.shopNo,obj.beginTime,obj.endTime,obj.pageIndex,obj.pageCount);

    })
}
//点击“接单” 2表示通过,4不接单。
function accOrder(){
    $("#orderList").on("click",".panel-heading button#acceptOrder",function () {
        var no=$(this).parent().nextAll(".panel-footer").children("span:first").attr("data-orderNo");
        var x={orderNo:no,result:"2"};
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/auditOrder.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
              console.log(data);
                var n1=Number($("#haveProcessed a").html());
                var n2=Number($("#unProcessed a").html());
                n1++;
                n2--;
                $("#haveProcessed a").html(n1);
                $("#unProcessed a").html(n2);
                $("#badgeOrder").html(n2);
            }
        });
        $(this).parent().parent().remove();
    });
}
//点击确认收货
function confirmOrder(){
    $("#orderList").on("click",".panel-heading button#confirmOrder",function () {
        var no=$(this).parent().nextAll(".panel-footer").children("span:first").attr("data-orderNo");
        var x={orderNo:no};
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/sureReceived.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                var n1=Number($("#haveFinished a").html());
                var n2=Number($("#haveProcessed a").html());
                n1++;
                n2--;
                $("#haveFinished a").html(n1);
                $("#haveProcessed a").html(n2);
            }
        });
        $(this).parent().parent().remove();
    });
}
//订单列表的拼接   orderStatu:  1:待接单 2：已接单 3：已完成
$.fn.orderList= function (json){
    var jsonStr = $.cookie("order");//从cookie中取值
    var obj = JSON.parse(jsonStr);

    var html='';
    for(var i=0;i<json.orderList.length;i++)
    {
        var j=((json.pageIndex-1)*obj.pageCount)+i+1;
        html+='<div class="panel panel-default"><div class="panel-heading">';
        html+='<span class="label label-primary">'+j+'</span>'
        html+='<span class="total" >订单总额：'+json.orderList[i].totalAmt+'元</span>';
        if(json.orderList[i].orderStatu==2){
            html+='<button type="submit" class="btn btn-primary " id="confirmOrder" style="width: 82px;float: right;margin-right: 10px">确认收货</button>';
            html+='<span class="label label-primary" >已接单</span></div>';
        }
         if(json.orderList[i].orderStatu==1)
        {
            //html+='<button type="submit" class="btn btn-primary " style="width: 82px;float: right">审核不通过</button>';
            html+='<button type="submit" class="btn btn-primary " id="acceptOrder" style="width: 82px;float: right;margin-right: 10px">接单</button>';
            html+='<span class="label label-primary" >待接单</span></div>';
        }
        if(json.orderList[i].orderStatu==3){
            html+='<span class="label label-primary" >已完成</span></div>';
        }
        if(json.orderList[i].orderStatu==4){
            html+='<span class="label label-primary" >退单中</span></div>';
        }
        html+='<div class="panel-body">';
        html+='<span style="display: block">店铺：'+json.orderList[i].shopName+'</span>';
        html+='<span style="float: right">收货人：'+json.orderList[i].userName+'</span>';

        html+='<span class="glyphicon glyphicon-time"> </span><span class="time">送达时间：'+json.orderList[i].arriveTime+'</span><br>';

        html+='<span class="glyphicon glyphicon-map-marker"></span><span   class="user-address">送达地址：'+json.orderList[i].address+'</span>';

        html+='<span  style="float: right">联系方式：'+json.orderList[i].tel+'</span>';
        html+='<table class="table " style="margin-top: 20px"><thead class="itemlist"><tr>';
        html+='<th>商品名称</th><th>数量</th><th>规格</th><th>折扣</th><th>价格(元)</th></tr></thead>';
        for(var j=0;j<json.orderList[i].orderDetailCust.length;j++)
        {
            html+='<tbody><tr><td class="goods"><div class="desc"><span target="_blank">'+json.orderList[i].orderDetailCust[j].itemName+'</span></div></td>';
            html+='<td style="width: 12%"><span>'+json.orderList[i].orderDetailCust[j].subQty+'</span></td>';
            html+='<td style="width: 12%"><span>'+json.orderList[i].orderDetailCust[j].itemSize+'</span></td>';
            html+='<td style="width: 12%"><span>'+json.orderList[i].orderDetailCust[j].discount+'</span></td>';
            html+='<td class="sprice"><span>'+pricefixto(json.orderList[i].orderDetailCust[j].realPrice)+'</span></td></tr>';
        }

        html+='</tbody></table></div>';
        html+='<div class="panel-footer">';
        html+='<span data-orderNo="'+json.orderList[i].orderNo+'">订单编号：'+json.orderList[i].orderNo+'</span>';
        html+='<span>下单时间：'+json.orderList[i].createDateString+'</span>';
        html+='</div></div>';

    }
     var html1=showPage(json.pageSize,json.pageIndex);
    $(".pag>.pagination").html(html1);
    $("#orderList").html("");
    $("#orderList").append(html);


    //已处理待处理个数加载
    var jsonStr = $.cookie("order");//从cookie中取值
    var obj = JSON.parse(jsonStr);
    var html3='';
    var all=json.already+json.not+json.complete;
    if(obj.querystatu===""){
        html3+='<a style="color: red;font-size: 2.1em">'+all+'</a>';
    }else{
        html3+='<a>'+all+'</a>';
    }
    $("#allOrder").html("");
    $("#allOrder").append(html3);

        var html1='';
       if(obj.querystatu===1){
           console.log(obj.querystatu);
           html1+='<a  style="color: red;font-size: 2.1em">'+json.not+'</a>';
       }
    else{
           html1+='<a >'+json.not+'</a>';
       }

        $("#unProcessed").html("");
        $("#unProcessed").append(html1);
        var html2='';
    if(obj.querystatu===2){
        html2+='<a style="color: red;font-size: 2.1em">'+json.already+'</a>';
    }
    else{
        html2+='<a >'+json.already+'</a>';
    }

        $("#haveProcessed").html("");
        $("#haveProcessed").append(html2);
    var html4='';
    if(obj.querystatu===3){
        html4+='<a  style="color: red;font-size: 2.1em">'+json.complete+'</a>';
    }
    else{
        html4+='<a >'+json.complete+'</a>';
    }

    $("#haveFinished").html("");
    $("#haveFinished").append(html4);
    $("#badgeOrder").html(json.not);
}


/*---页码的跳转---*/
$.fn.pageclick = function () {
    $(".pagination").on("click", "a", function () {
        var jsonStr = $.cookie("order");//从cookie中取值
        var obj = JSON.parse(jsonStr);
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if($(this).hasClass("next")){

            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if($(this).prev().hasClass("forword")){
                return;
            }
            obj.pageIndex=pageIndex+1;
            jsonStr = JSON.stringify(obj);
            $.cookie("order", jsonStr);
            var jsonStr2 = $.cookie("order");//从cookie中取值
            var obj2 = JSON.parse(jsonStr2);
            orderAjax(obj2.querystatu,obj2.shopNo,obj2.beginTime,obj2.endTime,obj2.pageIndex,obj2.pageCount);

        }else if($(this).hasClass("forword")){
            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            obj.pageIndex=pageIndex-1;
            jsonStr = JSON.stringify(obj);
            $.cookie("order", jsonStr);
            var jsonStr2 = $.cookie("order");//从cookie中取值
            var obj2 = JSON.parse(jsonStr2);
            orderAjax(obj2.querystatu,obj2.shopNo,obj2.beginTime,obj2.endTime,obj2.pageIndex,obj2.pageCount);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            obj.pageIndex=pageIndex;
            jsonStr = JSON.stringify(obj);
            $.cookie("order", jsonStr);
            var jsonStr2 = $.cookie("order");//从cookie中取值
            var obj2 = JSON.parse(jsonStr2);
            orderAjax(obj2.querystatu,obj2.shopNo,obj2.beginTime,obj2.endTime,obj2.pageIndex,obj2.pageCount);
        }

    })
}
////获取条件
//function getCondition(){
//    var json = {};
//    //被改变的条件存入cookie
//    var jsonStr = $.cookie("order");
//    var obj = JSON.parse(jsonStr);
//    console.log("条件cookie" + obj.address);
//
//    json.pagecount = 8;
//    json.pageindex = Number(pageIndex);
//    json.querystatu = obj.querystatu;
//    if (obj.brandname != null && obj.brandname != "") {
//        json.brandname = obj.brandname;
//    }
//    else if (obj.itemname != null && obj.itemname != "") {
//        json.itemname = obj.itemname;
//    } else if (obj.classname != null && obj.classname != "") {
//        json.classname = obj.classname;
//        if(obj.propertyname!=null&&obj.propertyname!=""){
//            json.propertyname=obj.propertyname;
//        }
//    }
//    if(obj.orderstyle!=null&&obj.orderstyle!=""){
//        json.orderstyle=obj.orderstyle;
//    }
//    if(obj.ordercondition!=null&&obj.ordercondition!=""){
//        json.ordercondition=obj.ordercondition;
//    }
//    return json;
//}
