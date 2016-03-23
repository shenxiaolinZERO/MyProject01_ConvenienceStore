
// /*---------提交收货信息 的函数-----------------------*/
function myInfo(){
    var name=$("#name").val();
    var detailAddress=$("#detailAddress").val();

    var phoneNumber=$("#phoneNumber").val();

    $("#btnSubmit").click(function(){
        $(".yourInfo label").append("<strong>"+name+"</strong>");
        $(".yourInfo label").append("<b>"+detailAddress+"</b>");
        $(".yourInfo label").append("<b>"+phoneNumber+"</b>");
    })
}
// /*-----------------------提取发票信息（是否需要发票）---------------*/
function myInvoice(){
    var myInvoice=$(".radio_invoice").attr("data-value");

    if(myInvoice=="不需要发票"){
        return myInvoice;
    }
    if(myInvoice=="需要发票"){
          var invoicecontent=$(".invoicecontent").value();
         return invoicecontent;
    }
}
/*----------------------------------------提交订单页面------------------------------------*/
$(document).ready(function(){
    $("#submitOrder").click(function(){

// /*-----------------------提取支付方式---------------------------*/
        var payment=$(".radio_payment").attr("data-value");

        var orderSend={"myInfomation":myInfo(),"myPayment":payment,"myInvoice":myInvoice()};
         $.ajax({
            type: "post",
            url: "http://192.168.199.134:8080/BSMD/order/insert.do",
            data:JSON.stringify(orderSend),
            //header: {
            //    "Content-Type": "application/json;charset=utf-8",
            //    "Accept": "application/json"
            //},
            success: function (data) {
                var json = data;
                console.log(data);
                if(data.status!="success"){
                     alert("failed!");
                }
                else{
                    location.href=pay_order.html;
                }
            }
        })
    })
})


















//
//function con_order_js() {
//    var x={"cust":"cust01", "areaName":"明阳小区"};
//    $.ajax({
//        type: "post",
//        url: "http://192.168.199.134:8080/BSMD/order/insert.do",
//        data:JSON.stringify(x),
//        dataType: "json",
//        header: {
//            "Content-Type": "application/json;charset=utf-8",
//            "Accept": "application/json"
//        },
//        success: function (data) {
//            var json = data;
//            console.log(data);
//            var html = '';
            //$("#btnSubmit").click(function(){
            //    alert($(this).text());
            //})
            // /*-----------------------------提交收货地址------------------------------*/
            //$('#btnSubmit').click(function(){
            //    var data=$("#myAddInfo:input").serializeArray();
            //    $.post(url1,data,function(json){
            //        if(json.status=="fail"){
            //            alert(json.message);
            //        }
            //        if(json.status=="success"){
            //            alert(json.message);
            //            //clearInputs();
            //        }
            //    },"json");
            //});
            /*--使用一个HTML过滤器访问表单中的所有输入域，并将它们都设置为空---*/
            //function clearInputs(){
            //    $("#myAddInfo:input").each(function(){
            //        $(this).val('');
            //    });
            //}
            ///*--取消表单中的默认提交动作，让按钮点击事件中的jQuery代码负责发送数据--*/
            //$("#myAddInfo").submit(function(){
            //   return false;
            //});
            // /*-----------------------选择提交支付及配送方式---------------*/
         //$('#mypayment').click(function(){
         //       var data=$("#mypayment:input").serializeArray();
         //       $.post(url1,data,function(json){
         //           if(json.status=="fail"){
         //               alert(json.message);
         //           }
         //           if(json.status=="success"){
         //               alert(json.message);
         //               //clearInputs();
         //           }
         //       },"json");
         //   });
         //   //var item = $('input[name=payment][checked]').val();
         //   //alert(item);
         //
         //   var item = $("#mypayment.radio_payment").val();

            // /*-----------------------是否需要发票---------------*/
//            $('#myinvoice').click(function(){
//                var data = $("#myinvoice.col-sm-10").value(data-value);
//                //var data=$("#myinvoice:input").serializeArray();
//                $.post(url1,data,function(json){
//                    if(data=="不需要发票"){
//                        alert(data.message);
//                    }
//                    if(data=="需要发票"){
//                        alert(json.message);
//                        //clearInputs();
//                    }
//                },"json");
//
//                var invoicecontent=$("#myinvoice.invoicecontent").val();
//                $.post(url1,invoicecontent,function(json){
//                    alert(invoicecontent.message);
//                },"json")
//            });
//        }
//    });
//}
/*
$(document).read(function(){
    $("input").focus(function(){
        $(this).css("backgroud-color","#cccccc");
    });
    $("input").blur(function(){
        $(this).css("backgroud-color","#ffffff");
    });

});*/
            //// /*----------------------展示商品信息---------------*/
            //function showItem() {
            //    var x={"cust":"cust01", "areaName":"明阳小区"};
            //    $.ajax({
            //        type: "post",
            //        url: "http://192.168.199.241:8080/BSMD/car/showCar.do",
            //        data:JSON.stringify(x),
            //        dataType: "json",
            //        header: {
            //            "Content-Type": "application/json",
            //            "Accept": "application/json"
            //        },
            //        success: function (data) {
            //            var json = data;
            //            console.log(data);
            //            var html = '';
            //            for(var i=0;i<json.showcar.length;i++){
            //                html +='<tr align="center">';
            //                html +='<td><p align="left">包裹'+json.showcar[i].itemNo+'</td>';
            //                html +='<td><p align="left"><img src="'+json.showcar[i].url+'"><a href="#">'+json.showcar[i].itemName+'</a></td>';
            //                html +='<td>'+json.showcar[i].itemSalePric+'</td>';
            //                html +='<td>'+json.showcar[i].num+'</td>';
            //                html +='<td>'+json.showcar[i].totalPrice+'</td>';//该商品总价
            //                html +='</tr>';
            //            }
            //            $("table #itemlist").append(html);
            //
            //        }
            //    })
            //}