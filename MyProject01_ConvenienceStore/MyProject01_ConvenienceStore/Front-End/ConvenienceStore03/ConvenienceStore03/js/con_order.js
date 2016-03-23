$(document).ready(function(){
    $().newaddess();
 $().getaddress();
    $().otherpageapos();
    loadname();
    noinvoice();
})
//获取地址信息
$.fn.getaddress= function () {

   // $("#usename").html();
    var x={"username":"hh"};
    $.ajax({
        type:"post",
        datatype:'json',
        url:"http://192.168.199.233:8080/BSMD/getUserAddress.douserAddressList",
        data:JSON.stringify(x),
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            //默认地址
            html1='';
            //其余地址
            html='';
            if(data.status=="success"){
                var y;
                for(var i=0; i<data.userAddressList.length;i++){
                    y=data.userAddressList[i];
                    if(y.status==1){
                        html1+='<li data-aid="'+ y.addrNo+'" class="cart-address-card-choose"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html1+='<span class="cart-address-default"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html1+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html1+='<p class="cart-address-zipinf" data-eare="'+ y.areaName+'"data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.areaName+'</p>';
                        html1+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }else{
                        html+='<li data-aid="'+ y.addNo+'"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html+='<span class="cart-address-default _none"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html+='<p class="cart-address-zipinf" data-eare="'+ y.areaName+'"data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.eareName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }
                }
                html=html1+html;
                $("#cartaddresslist").html(html);
            }

        }
    })
}


//添加新地址
$.fn.newaddess=function(){
    $(".assotheraddress").on("click",function(){
        $(".address_management").slideToggle(1000);
        var x=  $("#cityname").attr("data-cityname");
        $(".form-mile.address-select input").val(x);
    })
    $("#cartaddresslist").on("click","li", function () {
        $(this).addClass("cart-address-card-choose");
        $(".cart-address-default").addClass("_none")
        $(this).siblings().removeClass("cart-address-card-choose");
    })
    //点击保存地址
    $("#address-save .address-btn").on("click", function () {
        // var username= $("#usename").html();
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
        var x={"username":"hh","name":name,"city":city,"county":county,"areaName":areaName,"address":address,"tel":tel,"status":status}

        $.ajax({
            type:"post",
            datatype:'json',
            url:"http://192.168.199.233:8080/BSMD/insertUserAddress.do",
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
                        html+='<p class="cart-address-zipinf" data-eare="'+ y.areaName+'"data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.areaName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                        $("#cartaddresslist li").removeClass("cart-address-card-choose");
                        $(".cart-address-default").addClass("_none")
                    }else{
                        html+='<li data-aid="'+ y.addNo+'"> <a class="cart-address-card " data-aid="'+ y.addrNo+'" href="javascript:;">';
                        html+='<span class="cart-address-default _none"> 默认地址</span> <h5 class="cart-address-tit">'+ y.name+'</h5> <hr class="cart-hr" style="width: 160px;  border: 1px solid #eee;" noshade>';
                        html+='<p class="cart-address-strert">'+ y.address+'</p>';
                        html+='<p class="cart-address-zipinf" data-eare="'+ y.areaName+'"data-city="'+y.city+'" data-county="'+ y.county+'">福建省'+y.city+y.county+y.areaName+'</p>';
                        html+='<p class="cart-address-phone">'+ y.tel+'</p> <i class="cart-address-edit" style="display: none">编辑</i></a> </li>';
                    }

                }
                $("#cartaddresslist").append(html);
                $(".address_management").slideUp(1000);
            }
        })


    })
    //支付方式
    $("#input-payment").on("click",".pay_method_item ", function () {
        $(this).addClass("on_click");
        $(this).siblings().removeClass("on_click");
    })
}
//发票
function noinvoice(){
    $("#noinvoice").on("click",function(){
        $("#InvoiceEditDiv").slideToggle(1000);
    })
}
//确认结算
//$.fn.