
// /*---------�ύ�ջ���Ϣ �ĺ���-----------------------*/
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
// /*-----------------------��ȡ��Ʊ��Ϣ���Ƿ���Ҫ��Ʊ��---------------*/
function myInvoice(){
    var myInvoice=$(".radio_invoice").attr("data-value");

    if(myInvoice=="����Ҫ��Ʊ"){
        return myInvoice;
    }
    if(myInvoice=="��Ҫ��Ʊ"){
          var invoicecontent=$(".invoicecontent").value();
         return invoicecontent;
    }
}
/*----------------------------------------�ύ����ҳ��------------------------------------*/
$(document).ready(function(){
    $("#submitOrder").click(function(){

// /*-----------------------��ȡ֧����ʽ---------------------------*/
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
//    var x={"cust":"cust01", "areaName":"����С��"};
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
            // /*-----------------------------�ύ�ջ���ַ------------------------------*/
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
            /*--ʹ��һ��HTML���������ʱ��е����������򣬲������Ƕ�����Ϊ��---*/
            //function clearInputs(){
            //    $("#myAddInfo:input").each(function(){
            //        $(this).val('');
            //    });
            //}
            ///*--ȡ�����е�Ĭ���ύ�������ð�ť����¼��е�jQuery���븺��������--*/
            //$("#myAddInfo").submit(function(){
            //   return false;
            //});
            // /*-----------------------ѡ���ύ֧�������ͷ�ʽ---------------*/
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

            // /*-----------------------�Ƿ���Ҫ��Ʊ---------------*/
//            $('#myinvoice').click(function(){
//                var data = $("#myinvoice.col-sm-10").value(data-value);
//                //var data=$("#myinvoice:input").serializeArray();
//                $.post(url1,data,function(json){
//                    if(data=="����Ҫ��Ʊ"){
//                        alert(data.message);
//                    }
//                    if(data=="��Ҫ��Ʊ"){
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
            //// /*----------------------չʾ��Ʒ��Ϣ---------------*/
            //function showItem() {
            //    var x={"cust":"cust01", "areaName":"����С��"};
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
            //                html +='<td><p align="left">����'+json.showcar[i].itemNo+'</td>';
            //                html +='<td><p align="left"><img src="'+json.showcar[i].url+'"><a href="#">'+json.showcar[i].itemName+'</a></td>';
            //                html +='<td>'+json.showcar[i].itemSalePric+'</td>';
            //                html +='<td>'+json.showcar[i].num+'</td>';
            //                html +='<td>'+json.showcar[i].totalPrice+'</td>';//����Ʒ�ܼ�
            //                html +='</tr>';
            //            }
            //            $("table #itemlist").append(html);
            //
            //        }
            //    })
            //}