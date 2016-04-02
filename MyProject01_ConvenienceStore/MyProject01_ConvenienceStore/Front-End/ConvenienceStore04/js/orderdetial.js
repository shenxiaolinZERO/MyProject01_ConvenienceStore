/**
 * Created by lenovo on 2015-12-20.
 */
$(document).ready(function(){
    checkCookie()
    loadname();
    cartnum(isload());
})
function checkCookie() {

    //getCookie("proeare");

    var proeare = $.cookie("proeare");
    if (proeare != null && proeare != "") {
        proeare = proeare.split(',');
        var pos = proeare[0] + proeare[1] + proeare[2];
        var x = proeare[0] + "-" + proeare[1] + "-" + proeare[2];
        $("#cityname").attr("value", pos);
        $("#cityname").attr("data-cityname", x);
        //商品搜索
        $("#searchitem").mysearch();
        //顶部地址改变
        $().poschange();
        $().otherpageapos();
        getdetail()
        return;
    }else {
        location.href="index.html";
    }
}
function getdetail(){
   var id=getUrlParam("id");
    console.log(id);
   if(id!=null&&id!=""){
       var x={"orderNo":id};
       console.log(x);
       $.ajax({
           type:"post",
            url: "http://192.168.113.14:8080/BSMD/order/select/info",
           dataType: "json",
           data: JSON.stringify(x),
           //header:{
           //    "Content-Type": "application/json",
           //    "Accept": "application/json"
           //},
           success: function (data) {
               console.log(data);
               if(data!=null){

                   var html='';
                   html+='<tr> <td class="info_title" valign="top">收货地址：</td> <td class="inforamtion">'+data.order.orderInfo.receiveAddress.custNo+','
                       +data.order.orderInfo.receiveAddress.tel+','+data.order.orderInfo.receiveAddress.address+'</td> </tr>';
                   html+='<tr> <td class="info_title" valign="top">买家留言：</td> <td class="inforamtion">--</td> </tr>';
                   html+='<tr><td class="info_title" valign="top">订单编号：</td> <td class="inforamtion">'+ data.order.orderInfo.orderNo+'</td> </tr>';
                   html+='<tr> <td class="info_title" valign="top">店铺：</td> <td class="inforamtion">某某店铺</td> </tr>';
                   $(".info_dis>tbody").html(html);
                   var html1='';
                   html1+=' <span class="no">订单编号：'+data.order.orderInfo.orderNo+'<span class="deal_time">成交时间：</span>'+data.order.orderInfo.createDate+'</span>';
                   $(".or_table .order_info").html(html1);
                   var html2='';
                   for(var i=0;i<data.order.itemList.length;i++){
                       if(i==0){
                            html2+='<tr class="or_item"> <td class="ogoods"> <a href="itemDetial.html" target="_blank" id="'+data.order.itemList[i].item.itemNo+'">' +
                                    '<img src="'+data.order.itemList[i].item.url+'" alt="商品详情"></a>';
                           html2+='<div class="" style="display: inline"> <span> <a href="itemDetial.html" target="_blank">'+data.order.itemList[i].item.itemName+'</a> </span></div> </td>';
                           html2+='<td class="osprice"><span>'+data.order.itemList[i].realPrice+'</span></td>';
                           html2+='<td class="oquantity">'+data.order.itemList[i].subQty+'</td>';
                           html2+='<td class="ofavour"> <span class="total_price"></span></td>';
                           html2+='<td class="ostatus"><p>交易成功</p></td>';
                           html2+=' <td class="other" rowspan="'+data.order.itemList.length+'"  ><span>'+data.order.orderInfo.totalAmt+'</span> </td> </tr>';
                       }
                       else{
                           html2+='<tr class="or_item"> <td class="ogoods"> <a href="itemDetial.html" target="_blank" id="'+data.order.itemList[i].item.itemNo+'">' +
                               '<img src="'+data.order.itemList[i].item.url+'" alt="商品详情"></a>';
                           html2+='<div class="" style="display: inline"> <span> <a href="itemDetial.html" target="_blank">'+data.order.itemList[i].item.itemName+'</a> </span></div> </td>';
                           html2+='<td class="osprice"><span>'+data.order.itemList[i].realPrice+'</span></td>';
                           html2+='<td class="oquantity">'+data.order.itemList[i].subQty+'</td>';
                           html2+='<td class="ofavour"> <span class="total_price"></span></td>';
                           html2+='<td class="ostatus"><p>交易成功</p></td></tr>';
                       }
                   }
                   $(".or_table>tbody").append(html2);
                   $(".or_total .tfont").html("￥"+data.order.orderInfo.totalAmt)
               }
           }
       });
   }
}

//选择小区完成
$.fn.villclick= function () {
    $("#village").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#tabvillage>a").text(e);
        $("#village").attr("data-name",e);
        // var pos=$("#curSelect").attr("data-position");
        // pos=pos+e;
        // $("#curSelect").attr("data-position",pos);
        var pos=$("#city").attr("data-name")+$("#eare").attr("data-name")+$("#village").attr("data-name");
        $("#curSelect").val(pos);
        $(".selectpro").hide();
    })
//t顶部
    $("#vil").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name",e);
        //var pos=$("#cityname").attr("data-position");
        //pos=pos+e;
        //$("#cityname").attr("data-position",pos);
        //$("#cityname").val(pos);
        $(".hd-prochg").hide();
        var pos=$("#cit").attr("data-name")+$("#ear").attr("data-name")+$("#vil").attr("data-name");
        var post=$("#cit").attr("data-name")+"-"+$("#ear").attr("data-name")+"-"+$("#vil").attr("data-name");
        $("#cityname").attr("data-positon",pos);
        $("#cityname").attr("data-cityname",post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x=[$("#cit").attr("data-name"),$("#ear").attr("data-name"),$("#vil").attr("data-name")];
        $.cookie("proeare",x,{expires:7});
    })
}
