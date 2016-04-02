var load=false;
$(document).ready(function(){
	if(!load){
        isload();
		loadname();
	    $().newaddess();
	   // $().getaddress();
	    $().foritem();
        getvoucher();
        getIntegral();
	    $().otherpageapos();
	    $("#cartsurbtn").cartsurbtn();
	    noinvoice();

        $("#shopVoucher").collapse("toggle");
        var x=  $("#cityname").attr("data-cityname");
        $(".form-mile.address-select input").val(x);
        load=true;
	}
    
});
//获取地址信息
$.fn.getaddress= function () {

  var  name=isload();
    var x={"custno":name};
    $.ajax({
        type:"post",
        datatype:'json',
        url: "http://192.168.113.14:8080/BSMD/getUserAddress.do",
        data:JSON.stringify(x),
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            //默认地址
            html1='';
            //其余地址
            html='';
            if(data.status=="success"){
                if(data.userAddressList.length==0){
                    $("#cartAddress").children(0).show();
                    var x=  $("#cityname").attr("data-cityname");
                    $(".form-mile.address-select input").val(x);
                    return;
                }
                var y;
                for(var i=0; i<data.userAddressList.length;i++){
                    y=data.userAddressList[i];
                    if(y.status==1){
                        html1+='<li data-aid="'+ y.addrNo+'" class="cart-address-card-choose"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html1+='<span class="cart-address-default"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html1+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html1+='<p class="cart-address-zipinf" data-area="'+ y.areaName+'" data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.areaName+'</p>';
                        html1+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }else{
                        html+='<li data-aid="'+ y.addrNo+'"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html+='<span class="cart-address-default _none"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html+='<p class="cart-address-zipinf" data-eare="'+ y.areaName+'" data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.areaName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }
                }
                html=html1+html;
                $("#cartaddresslist").html(html);
            }

        }
    })
};


//添加新地址
$.fn.newaddess=function(){
    $(".assotheraddress").on("click",function(){
        $(".address_management").slideToggle(1000);
        var x=  $("#cityname").attr("data-cityname");
        $(".form-mile.address-select input").val(x);
    });
    $("#cartaddresslist").on("click","li", function () {
        $(this).addClass("cart-address-card-choose");
        $(".cart-address-default").addClass("_none");
        $(this).siblings().removeClass("cart-address-card-choose");
    });
    //点击保存地址
    $("#address-save .address-btn").on("click", function () {
        // var username= $("#username").html();
        var name=$("#add_name").val();
        var t=$("#address-region input").val();
        t=t.split("-");
        var city=t[0];
        var county=t[1];
        var areaName=t[2];
        var address= $("#ueraddr").val();
        var tel=$("#usertel").val();
        var status=0;
        if($("#address-default").is(':checked')){
            status=1;
        }
        var custno=isload();
        var orderinf= JSON.parse( $.cookie("orderinf"));
        var x={"custno":custno,"id":orderinf.id,"name":name,"city":city,"county":county,"areaName":areaName,"address":address,"tel":tel,"status":status};

        $.ajax({
            type:"post",
            datatype:'json',
            url: "http://192.168.113.14:8080/BSMD/insertUserAddress.do",
            data:JSON.stringify(x),
            header: {"Content-type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);

                if(data!=null){
                    var html='';
                    var y=data;
                    if(y.status==1){
                        html+='<li data-aid="'+ y.addrNo+'" class="cart-address-card-choose"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html+='<span class="cart-address-default"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html+='<p class="cart-address-zipinf" data-area="'+ areaName+'"data-city="'+city+'" data-county="'+ county+'">福建省'+city+county+areaName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                        $("#cartaddresslist li").removeClass("cart-address-card-choose");
                        $(".cart-address-default").addClass("_none")
                    }else{
                        html+='<li data-aid="'+ y.addrNo+'"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html+='<span class="cart-address-default _none"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html+='<p class="cart-address-zipinf" data-eare="'+ areaName+'" data-city="'+city+'" data-county="'+ county+'">福建省'+city+county+areaName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }

                }
                $("#cartaddresslist").append(html);
                $(".address_management").slideUp(1000);
            }
        })


    });
    //支付方式
    $("#input-payment").on("click","input[name=payment] ", function () {
        $(this).parent().addClass("on_click");
        $(this).parent().siblings().removeClass("on_click");
    })
};
//请求商品信息
$.fn.foritem=function(){
     var x= JSON.parse($.cookie("cart"));
    console.log(x);
    if(x!=null){
        $.ajax({
            type:"post",
            data:JSON.stringify(x),
            dataType:"json",
            url: "http://192.168.113.14:8080/BSMD/car/settlement.do",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                console.log(data);
                if(data!=null){
                    //店铺
                    var a='<span  >'+data.shopName+'</span>';
                    $("#store").append(a);
                    //总价
                    $(".cart-paybar-info").html(data.settleMoney.toFixed(2));
                    //商品中件数
                    var  totalNum=0;
                    var   html='';
                    for(var i=0;i<data.settleList.length;i++){
                        var x=data.settleList[i];
                        totalNum+=x.num;
                        html+='<tr id="'+ x.barcode+'" data-itemsize="'+ x.itemSize+'" data-number="'+ x.num+'" data-tol="'+ x.totalPrice+'">';
                        html+='<td class="col-lg-5">'+ x.brandName+' '+ x.itemName+'</td> <td class="col-lg-2">'+x.itemSize+'</td>';
                        html+='<td class=col-lg-1"">'+ x.itemSalePrice+'</td> <td class=col-lg-2"">'+ x.num+'</td><td class="col-lg-2">'+x.totalPrice+'</td>';

                    }
                    $(".goondsnum").html(totalNum);
                    $("#itemlist").html(html);
                    setOrderInf();
                }
            }
        });
        $("#store").attr("data-sid", x.shopNo)
    }

};
//商品总价及优惠信息计算
function setOrderInf(){
   var orderinf= JSON.parse( $.cookie("orderinf"));
    console.log(orderinf);
    if(orderinf!=null){
        $(".cart-paybar-info").html(pricefixto(orderinf.orderPrice.realPay));
        var text='积分抵用'+orderinf.orderPrice.integralPrice+'元     '+'礼券抵用'+
            orderinf.orderPrice.stampPrice+'元      '+'已优惠'+orderinf.orderPrice.freePay+'元';
        $("#cartsurbtn").attr("data-content",text);
        $("#cartsurbtn").popover("show");
        $("#cartpaybar .clear>strong").text(orderinf.orderPrice.getIntegral);
    }
}
//获取用户拥有优惠信息
function getvoucher(){
    var custno=isload();
    var shopNo=$("#store").attr("data-sid");
    var x={"custNo":custno,"shopNo":shopNo};
    $.ajax({
        type:"post",
        data:JSON.stringify(x),
        dataType:"json",
        url: "http://192.168.113.14:8080/BSMD/user/getStamps",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            if(data.message=="success"){
                console.log(data);
                var  stamps=data.stamps;
                if(stamps==""||data.stamps==null){
                    $("#voucher ").html("<h5 >暂无可使用的礼券</h5>");
                }else {
                    var html=' <h6>使用抵用券</h6>';
                    for(var i=0;i<stamps.length;i++){
                        if(stamps[i].status==4){
                            html+='<div data-toggle="popover" data-container="body" data-placement="top" data-content="" class="voucher-p" data-sid="'+stamps[i].shopNo+'" data-id="'+stamps[i].stampNo +
                                '" data-flowno="'+stamps[i].stampFlowNo+'"><h5 class="voucher-title">'+
                                '<span style="font-size: 12px">编号：</span>'+stamps[i].stampNo+'</h5><div class="fl">' +
                                '<span class="price">¥</span> <i class="money">'+stamps[i].stampAmt+'</i> <span>['+stamps[i].stampTypeName+']</span>' +
                                ' </div> <div class="fr" style="margin-left: 30px;font-size: 12px">使用期限：<br/> ' +
                                '<i>'+stamps[i].startValidDate_String+'</i><br/> -<i>'+stamps[i].endValidDate_String+'</i> </div></div>';
                        }

                    }
                    $("#voucher").html(html);
                    useVoucher();
                }
                voucherStyle();

            }
        }
    });

}
//获取用户积分
function getIntegral(){
    //用户积分
    var custno=isload();
    var  y={"custNo":custno};
    $.ajax({
        type:"post",
        data:JSON.stringify(y),
        dataType:"json",
        url: "http://192.168.113.14:8080/BSMD/user/getIntegral",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {

            var html='';
            if(data.message=="success"){
                if(data.integral==0){
                    html+='<h5>暂无可用积分</h5>'
                }else {
                    html='<h6>积分</h6><span>目前可用积分</span><span style="color: #aa0000">'+data.integral+'</span>' +
                        '  <label>请输入要使用的积分</label>' +
                        '<input type="number" style="width: 50px;"  min="1" max="'+data.integral+'" step="1">';

                    $(".getIntegral").html(html);
                   useIntegral();
                    return;
                }


            }else {
                html+='<h5>暂无可用积分</h5>'
            }
            $(".getIntegral").html(html);

        }
    })
    var shopNo=$("#store").attr("data-sid");
    var x={"custNo":custno,"shopNo":shopNo};
    //获取店铺优惠
    $.ajax({
        type: "post",
        data: JSON.stringify(x),
        dataType: "json",
        url: "http://192.168.113.14:8080/BSMD/getStamps",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            console.log(data);
            if(data.message=="success"){
                var html='';
                if(data.stamps.length<=0){
                    $("#shopVoucher").prev().hide();
                }
                for(var i=0;i<data.stamps.length;i++){
                    if(data.stamps[i].shopNo=="all"){
                        continue;
                    }
                    html+='<li> <em>.</em>'+data.stamps[i].stampTypeName+'<button type="button" ' +
                        'data-id="'+data.stamps[i].stampNo+'" >立即领取</button></li>'
                }
                $("#shopVoucher").html(html);
                addShopStamp();
            }else {
                $("#shopVoucher").prev().hide();
            }
        }
    })
}
//领取礼券
function addShopStamp(){
    $("#shopVoucher button").bind("click",function(){
        var custNo=isload();
        var stampNo=$(this).attr("data-id");
        var json={"custNo":custNo,"stampNo":stampNo};
        if(stampNo!=null){
            $.ajax({
                data: JSON.stringify(json),
                dataType: "json",
                type: "post",
                url: "http://192.168.113.14:8080/BSMD/user/addStamp",
                header: {"Content-Type": "application/json", "Accept": "appliction/json"},
                success: function (data) {
                    console.log(data);
                    if(data.message=="success"){
                        alert("领取成功！");
                        getvoucher();
                    }else {
                        alert(data.message);
                    }
                }
            })
        }
    })



}
//使用积分或礼券
function  useIntegral(){
    $(".getIntegral input").on("input propertychange", function () {
        var orderinf= JSON.parse( $.cookie("orderinf"));
        var id=orderinf.id;
        var tempthis=$(this);
        var integral=Number( $(this).val());
        var max=Number($(this).attr("max"));
        if(integral>max){
            integral=max;
            $(this).val(max);
        }
        var json={"integral":integral,"id":id};
        if(id!=null&&integral!=null){
            $.ajax({
                data:JSON.stringify(json),
                dataType:"json",
                type:"post",
                url: "http://192.168.113.14:8080/BSMD/order/useIntegral",
                header: {"Content-Type": "application/json", "Accept": "appliction/json"},
                success: function (data) {
                    console.log(data);
                    if(data.message=="success"){

                        var  orderinf= data.orderPrice;
                        if(orderinf!=null){
                            $(".cart-paybar-info").html(pricefixto(orderinf.realPay));
                            var text='积分抵用'+orderinf.integralPrice+'元     '+'礼券抵用'+
                                orderinf.stampPrice+'元      '+'已优惠'+orderinf.freePay+'元';
                            $("#cartsurbtn").attr("data-content",text);
                            $("#cartsurbtn").popover("show");
                            $("#cartpaybar .clear>strong").text(orderinf.getIntegral);
                        }
                    }else {
                        var tt=data.message;
                        $(tempthis).attr("data-content",tt);
                    }

                }


            })
        }
    })
}
function  useVoucher(){
    $(".voucher-p").on("click", function () {
        var orderinf= JSON.parse( $.cookie("orderinf"));
        var id=orderinf.id;
        var tempthis=$(this);
       var stampFlowNo= $(this).attr("data-flowno");
        var json={"stampFlowNo":stampFlowNo,"id":id};
        if(id!=null&&stampFlowNo!=null){
            $.ajax({
                data:JSON.stringify(json),
                dataType:"json",
                type:"post",
                url: "http://192.168.113.14:8080/BSMD/order/useStamp",
                header: {"Content-Type": "application/json", "Accept": "appliction/json"},
                success: function (data) {
                    if(data.message=="success"){
                       var  orderinf= data.orderPrice;
                        if(orderinf!=null){
                            $(".cart-paybar-info").html(pricefixto(orderinf.realPay));
                            var text='积分抵用'+orderinf.integralPrice+'元     '+'礼券抵用'+
                                orderinf.stampPrice+'元      '+'已优惠'+orderinf.freePay+'元';
                            $("#cartsurbtn").attr("data-content",text);
                            $("#cartsurbtn").popover("show");
                            $("#cartpaybar .clear>strong").text(orderinf.getIntegral);
                        }
                    }else {
                       var tt=data.message;
                        $(tempthis).attr("data-content",tt);
                        $(tempthis).popover("show");
                        $(tempthis).css("background-color","#ccc")
                    }

                }
            })
        }
    })
}

//发票
function noinvoice(){
    $("#invoiceModify").on("click",function(){
        $("#InvoiceEditDiv").slideToggle(1000);
        $("#noinvoice").css("color","#cccccc")
    })
}
//提交订单
$.fn.cartsurbtn=function(){
    $("#cartsurbtn").on("click",function(){
        var shopNo=Number($("#store").attr("data-sid"));
        var z=$(".cart-address-card-choose");
        var addNo=$(z[0]).attr("data-aid");
        if(addNo==null||addNo==""){
            $("#cartAddress").children().show();
            window.location.hash = "#cartAddress";
            return;
        }
        //总计
        var totalAmt=Number($("#cartpaybar .cart-paybar-info").html());
        //var x=$("#itemlist>tr");
        //var barcode=[];
        //var subQty=[];
        //
        //for(var i=0;i< x.length;i++){
        //    barcode[i]= $(x[i]).attr("id");
        //    subQty[i]=$(x[i]).attr("data-number");
        //}
        //var t=[];
        //for( var  i=0;i<barcode.length;i++){
        //    var json={};
        //    json.barcode=barcode[i];
        //    json.subQty=subQty[i];
        //    t.push(json);
        //}
        //发票明细
        var invoiceFlag=$("#needDetailContent").val();
        //备注信息
        var backinf=$("#backinf").val();
        //付款方式
        var payway=$("input[name=payment]:checked").attr("data-type");
        var custno=isload();
        //抵用券
        var voucher=$("#voucher .voucher-active").attr("data-id");
        if(voucher!=null){

        }
        var orderinf= JSON.parse( $.cookie("orderinf"));
        var id=orderinf.id;

        var x={"custNo":custno,"id":id,"addrNo":addNo,"memo":backinf,"arriveTime":"","payWay":payway,"invoiceFlag":0};

        $.ajax({
            type:"post",
            data:JSON.stringify(x),
            dataType:"json",
            url: "http://192.168.113.14:8080/BSMD/order/submit",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                console.log(data);
                if(data.message=="success"){
                   //var y=JSON.parse($.cookie("barcodes"));
                   // $.ajax({
                   //     type:"post",
                   //     data:JSON.stringify(y),
                   //     dataType:"json",
                   //     url: "http://192.168.113.14:8080/BSMD/car/deletFromCar.do",
                   //     header: {
                   //         "Content-Type": "application/json",
                   //         "Accept": "application/json"
                   //     },
                   //     success: function (json) {
                   //         console.log(json);
                   //         if(json!=null){
                   //
                   //         }
                   //     }
                   // });
                    location.href="cart-home.html?or="+data.orderNo;
                }
                else {
                    alert(data.message);
                }
            }
        })

    })
};

//抵用券样式
function voucherStyle(){
    $(".voucher-p").on("click", function () {
        $(this).addClass("voucher-active");
        $(this).siblings(".voucher-p").removeClass("voucher-active");
    })
}