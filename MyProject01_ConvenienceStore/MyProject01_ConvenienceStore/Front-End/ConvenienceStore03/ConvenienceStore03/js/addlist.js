/**
 * Created by lenovo on 2015-12-11.
 */
//地址管理
$(function () {
    showCit();
    $("#addlists").click(function () {
        var x={"username":"hh"};

        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            url: "http://192.168.199.233:8080/BSMD/getUserAddress.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                alert("保存成功！");
                var html='';
                html+='<ul><li class="c-2">'+ data.name+'</li>';
                html+='<li class="c-6">'+myprovice+data.city+ data.county+ data.areaName+data.address+'</li>';
                html+='<li class="c-2"><span>'+x.tel+'</span></li>';
                if(data.status==0){
                    html+='<li class="c-2"><a href="#" class="defaultAdd" data-aid="'+data.addrNo+ '">设为默认 </a><a href="#" class="change" data-aid="'+data.addrNo+ '">修改 </a><a href="#" class="delete" data-aid="'+data.addrNo+'"> 删除</a></li>';
                }else{
                    $(".defaultAdd").html("设为默认");
                    html+='<li class="c-2"><a href="#" class="defaultAdd" data-aid="'+data.addrNo+ '">默认地址 </a><a href="#" class="change" data-aid="'+data.addrNo+ '">修改 </a><a href="#" class="delete" data-aid="'+data.addrNo+'"> 删除</a></li>';
                }
                html+='</ul>';
                $("#aa-list").append(html);

            }

        })

    })

    //showCit();
    $("#add_name").blur(function () {
        doUsername();
    })
    $("#usertel").blur(function () {
        doTel();
    })
    $("#ueraddr").blur(function () {
        doaddr();
    })
    //$("#address-region").blur(function () {
    //    doselectaddr();
    //})
    $(".address-form").hide();
    $("#address-add").click(function () {
        $(".address-form").toggle();
    })
    saveAddress();
    defaultAddress();


    //changeAddress();
})
//点击"设为默认"
function defaultAddress(){
    $(".defaultAdd").click(function () {
        var id = $(this).attr("data-aid");
        var s=$(this).html();
        if(s=="设为默认"){
            $(".defaultAdd").html("设为默认");
            $(this).html("默认地址");
            var sta=1;
            var x1={"username":"hh","addrNo":id};
            console.log(x1);
            $.ajax({
                type: "post",
                data: JSON.stringify(x1),

                url: "http://192.168.199.233:8080/BSMD/updateDefaultAddress.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                }
            });
        }else{
            $(this).html("设为默认");
            sta=0;
            var x2={"addrNo":id};
            $.ajax({
                type: "post",
                data: JSON.stringify(x1),
                url: "http://192.168.199.233:8080/BSMD/deleteDefaultAddress.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                }
            });
        }


    })
}
//点击修改地址
//function changeAddress() {
$(".change").click(function () {
    $(".address-form").show();
    var id = $(this).attr("data-aid");
    $(this).html("ddd");
    //console.log(c);
    //var x={"attrNo":id };
    //$.ajax({
    //    type: "post",
    //    data: JSON.stringify(x),
    //    url: " http://192.168.199.233:8080/BSMD/updateUserAddress",
    //    dataType: "json",
    //    header: {"Content-Type": "application/json", "Accept": "application/json"},
    //    success: function (data) {
    //        $("#add_name").val(data.name);
    //        $("#province option:checked").text(data.province);
    //        $("#city option:checked").text(data.city);
    //        $("#area option:checked").text(data.county);
    //        $("#village option:checked").text(data.areaName);
    //        $("#ueraddr").val(data.address);
    //        $("#usertel").val(data.tel);
    //    }
    //
    //
    //});
    //saveAddress();

})
//}
//判断是否为默认地址
function defauladdress(){


    if($("#address-default").prop("checked")){
        return true;
    }else{
        return false;
    }


}
//获取地址列表
function getAddress(){

}
//保存
function saveAddress(){
    $("#address-save").click(function () {

        if (doUsername() && doTel() && doaddr() && doselectaddr() ) {

            var myaddname = $("#add_name").val();
            var myprovice=$("#province option:checked").text();
            var mycity=$("#city option:checked").text();
            var myarea=$("#area option:checked").text();
            var myvillage=$("#village option:checked").text();
            var myaddr = $("#ueraddr").val();
            var myusertel = $("#usertel").val();
            if(defauladdress()==true){
                var sta=1;
            }
            else{
                sta=0;
            }
            console.log(myaddname);
            console.log(myprovice);
            console.log(mycity);
            console.log(myaddr);
            console.log(myusertel);
            console.log(sta);



            var x = {"username": "hh","name": myaddname,  "city":mycity,"county":myarea,"areaName":myvillage ,"address":myaddr,"tel":myusertel,"status":sta};
            // console.log(x);
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                url: "http://192.168.199.233:8080/BSMD/insertUserAddress.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                    alert("保存成功！");
                    var html='';
                    html+='<ul><li class="c-2">'+ x.name+'</li>';
                    html+='<li class="c-6">'+myprovice+x.city+ x.county+ x.areaName+x.address+'</li>';
                    html+='<li class="c-2"><span>'+x.tel+'</span></li>';
                    if(x.status==0){
                    html+='<li class="c-2"><a href="#" class="defaultAdd" data-aid="'+data.addrNo+ '">设为默认 </a><a href="#" class="change" data-aid="'+data.addrNo+ '">修改 </a><a href="#" class="delete" data-aid="'+data.addrNo+'"> 删除</a></li>';
                    }else{
                        $(".defaultAdd").html("设为默认");
                        html+='<li class="c-2"><a href="#" class="defaultAdd" data-aid="'+data.addrNo+ '">默认地址 </a><a href="#" class="change" data-aid="'+data.addrNo+ '">修改 </a><a href="#" class="delete" data-aid="'+data.addrNo+'"> 删除</a></li>';
                    }
                    html+='</ul>';

                    $("#aa-list").append(html);
                    defaultAddress();
                    // changeAddress();


                }
            });
        }
        else{ alert("请输入您的正确地址信息!")}
    });

}


// 用户名的验证==========================
function doUsername(){
    var t = $("#add_name");
    var span = $(".namemsg");
    if( /^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,16}$/ .test(t.val())){
        // var errorMsg='请输入昵称.';
        // t.append('<span class="formtips onError">'+errorMsg+'</span>');
        span.html("输入成功");
        return true;
    }else{
        span.html(" 中文、英文、数字、下划线、2-16个字符").css({color:"red",fontSize:"12px"});
        return false;
    }
}
// 手机号码的验证==========================
function doTel(){
    var t = $("#usertel");
    var span = $(".telmsg");
    if(/^1[3578][0-9]{9}$/.test(t.val())){
        span.html("输入成功");
        return true;
    }else{
        span.html("手机号码格式错误").css({color:"red",fontSize:"12px"});
        return false;
    }
}
//选择地址的验证==========================
function doselectaddr(){
    var t1=$("#province option:checked").text();
    var t2=$("#city option:checked").text();
    var t3=$("#area option:checked").text();
    var t4=$("#village option:checked").text();
    var span=$(".selectAddmsg");
    if((t1!="-请选择-")&&(t2!="-请选择-")&&(t3!="-请选择-")&&(t4!="-请选择-")){
        span.html("输入成功");
        return true;
    }
    else{
        span.html("请选择您的地址").css({color:"red",fontSize:"12px"});
        return false;
    }
}
//详细地址的验证==========================
function doaddr(){
    var t = $("#ueraddr");
    var span = $(".addrmsg");
    if(t.val()==""){
        span.html("请输入详细地址").css({color:"red",fontSize:"12px"});
        return false;
    }
    else{
        span.html("输入成功");
        return true;
    }

}

//显示城市列表
function showCit() {
    doselectaddr();
    var getCity={"city":"Null","county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        data:JSON.stringify(getCity),
        dataType:"json",
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';

            for(var i=0;i<json.citys.length;i++){
                html+='<option '+ 'value='+i+'>'+json.citys[i]+'</option>';
            }

            //$("#city").empty();
            $("#city").append(html);
        }
    });
     getAddress();
}

//显示县区
function showEar(){
    doselectaddr();
    //获取选中的城市，根据此城市显示相应的区域
    var c = $("#city option:checked").text();
    console.log(c);
    var getCounty={"city": c,"county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getCounty),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){

            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.countys.length;i++){
                html+='<option value='+i+'>'+json.countys[i]+'</option>';
                console.log(i,json.countys[i]);
            }
            //$("#area").children().remove();
            $("#area").empty();
            $("#area").append(html);
        }
    })
    //将此城市信息发送给后台
    var county={"city": c}
    $.ajax({
        type:"post",
        url:" ",
        dataType:"json",
        data:JSON.stringify(county),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            console.log(c);
        }



    })
}

//显示小区
function showShop(){
    doselectaddr();
    //获取选中的城市和区域，根据这2个显示相应的小区
    var citys=$("#city option:checked").text();
    var  countys=$("#area option:checked").text();
    var getShow={"city":citys,"county":countys};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getShow),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.shops.length;i++){
                html+='<option value='+i+'>'+json.shops[i]+'</option>';
            }
            $("#village").empty();
            $("#village").append(html);

        }
    })
}
