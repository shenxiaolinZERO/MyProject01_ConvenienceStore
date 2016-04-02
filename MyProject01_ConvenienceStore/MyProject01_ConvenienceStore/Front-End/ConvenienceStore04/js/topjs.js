/**
 * Created by lenovo on 2015-12-03.
 */
/**顶部登录信息，地址等*/




//点击购物车
function shopcart(){
    $(".shoppingcart").on("click","a",function(){

    })
}

//顶部地址重新选择
$.fn.poschange=function(){
    $("#cityname").on("mouseenter onblur", function () {
        $(".hd-prochg").show();

    })
    $(".address-select").on("mouseleave blur", function () {
        $(".hd-prochg").hide();
    })
    $(".box1").on("mouseleave blur", function () {
        $(".hd-prochg").hide();
    })

}
/** 搜索提醒时点击将内容替换为点击的*/
$.fn.findlist= function () {
    $(".findlist").on("click","a",function(){
        var x=$(this).text();
        console.log(x);
        $("#mysearch").val(x);
        $("#searchitem").trigger("click");
    })
    $(".findlist").on("mouseleave", function () {
        $(".findlist").hide();
    })
}
//购物车数量
function cartnum(name) {
    var x = {"cust": name};
    $.ajax({
        type: "post",
        data: JSON.stringify(x),
        dataType: "json",
        url: "http://192.168.113.14:8080/BSMD/car/countItemNum.do",
        header: {"Content-Type": "application/json", "Accept": "appliction/json"},
        success: function (data) {
            console.log(data);
            if(data.number<=0||data==null){
                return;
            }else {
                $("#cartnum").text(data.number);
            }

        }
    })
}
$.fn.findlist= function () {
    $(".findlist").on("click","a",function(){
        var x=$(this).text();
        console.log(x);
        $("#mysearch").val(x);
        $("#searchitem").trigger("click");
    })
    $(".findlist").on("mouseleave", function () {
        $(".findlist").hide();
    })
}
//其他页面加载顶部地址信息
$.fn.otherpageapos= function () {
    var pos=getposition();
    $("#cityname").attr("data-positon",pos[1]);
    $("#cityname").attr("data-cityname",pos[0]);
    $("#cityname").val(pos[1]);
}
//搜索商品
$.fn.mysearch=function() {
    //点击搜索商品
    $("#searchitem").on("click", function () {

        var x = $("#mysearch").val();
        var pos = $("#cityname").attr("data-cityname");
        // console.log(x);
        if (x == "" | pos == "") {
            return;
        }
        location.href = 'itemList.html?key=' +x;
    })
    //搜索提示
    $("#mysearch").on("input propertychange", function () {
        var pos = $("#cityname").attr("data-cityname");
        var x = $("#mysearch").val();
        // y={"name":x,"address":"福州-鼓楼区-胜利小区"}
        y = {"name": x, "address": pos}
        $.ajax({
            type: "post",
            data: JSON.stringify(y),
            dataType: "json",
            url: "http://192.168.113.14:8080/BSMD/item/findlist.do",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {
                if (data!=null||data!=""){
                    var html = '';
                    console.log(data)
                    $(".findlist>ul").children("li").remove();
                    for (i = 0; i < data.name.length; i++) {
                        html += '<li class="cont"><a href="#">' + data.name[i] + '</a></li>';
                    }
                    $(".findlist>ul").append(html);
                    $(".findlist").show();
                    $(".findlist").findlist();
                }
            }
        })
    })
}
//获取URL中的参数
function getUrlParam(name){
    var reg =new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null){
        return r[2];
    }
    return null;
}
//录后从cookie中读取用户名
function loadname(){
    var username=$.cookie("username");
    if(username!=null&&username!=""){
        $("#username").html(username);
        //用户名
        var href="usercenter.html?username="+username;
        $("#username").attr("href",href);
        $(".hd-login").hide();
        $(".haslogin").show();
        cartnum(username);
    }
}
//获取当前地址信息
function getposition(){
    var proeare = $.cookie("proeare");
    if (proeare != null && proeare != "") {
        proeare = proeare.split(',');
        var x = proeare[0] + "-" + proeare[1] + "-" + proeare[2];
        var y=proeare[0] + proeare[1] + proeare[2];
        var z=[x,y];
        return z;
    }else{
        location.href="index.html";
    }
}
//检查是否登录，未登录则提示登录，
function isload(){
    var custno=$.cookie("username");
    if(custno==null||custno==""){
        $("#fakeLoader").fakeLoader({
            timeToHide:3000,//加载效果持续时间
            zIndex:"999",
            spinner:"spinner4",
            bgColor:"#7BDDE8",
            imagePath:"images/loading.png",
            imagewidth:876,
            imageheight:428
        });
        setTimeout(function(){
            location.href="login.html";
        },3000);
    }else{
        return custno;
    }
}
//菜单列表的显示隐藏
function allgood(){
    $("#allgoods").bind("click",function(){
        var z=$("#nav").css("dispaly");
        var x=$("#nav");
        if($("#nav").is(":hidden")){
            $(".mainmenu").show();
            $("#nav").slideDown(250);
        }else{

            $("#nav").slideUp(250);
            $(".mainmenu").hide();
        }
    })
}
//除主页以外其他界面加载菜单列表

/*---------------加载菜单列表---------------*/
$.Menulist = function () {
    var p= $("#cityname").attr("data-cityname");
    $.ajax({
        type: "post",
        url: "http://192.168.113.14:8080/BSMD/item/classlist.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            if(json!=null){
                //商品列表连接
                var html = '';
                for (var i = 0; i <json.bigclass.length; i++) {
                    var hr1='itemList.html?bigclass='+json.bigclass[i].name;
                    html += '<div class="odd otherodd" data-order="0" data-id="1">';
                    html += '<p><a href="'+hr1+'"target="_blank"><span class="glyphicon glyphicon-cutlery index-icon"></span>' + json.bigclass[i].name + '</a></p><span> ';
                    for (var j = 0; j < json.bigclass[i].property.length; j++) {
                        var hr2='itemList.html?bigclass='+json.bigclass[i].name+'&propertyName='+json.bigclass[i].property[j].propertyName;
                        html += '<a href="'+hr2+'" target="_blank">' + json.bigclass[i].property[j].propertyName + '</a>';
                    }
                    html += '</span></div>';
                }
                $(".mainmenu").html(html);
                allgood();
            }

        }
    })
}
/**
 * Created by lenovo on 2015-12-01.
 */


$.fn.toptabClick=function(){
    $("#toppro").on("click", function () {
        $(this).nextAll("li").addClass("_none");
    })
    $("#topcit").on("click", function () {
        $(this).nextAll("li").addClass("_none");
    })
    $("#topear").on("click", function () {
        $(this).nextAll("li").addClass("_none");
    })

}

//选择省，显示市
$.fn.proclick=function(){
    //t顶部
    $("#pro").on("click","a", function () {
        e=$(this).text();
        $("#toppro>a").text(e);
        $("#pro").attr("data-name",e);
        $("#toppro").removeClass("active");
        $("#topcit").removeClass("_none");
        $("#topcit").addClass("active");
        $("#pro").removeClass("active in");
        $("#cit").addClass("active in");
        showcit();
    })
}
//选择市，显示县区
$.fn.cityclick= function() {
    //t顶部
    $("#cit").on("click","a",function(){
        var  e=$(this).text();
        $("#topcit>a").text(e);
        $("#cit").attr("data-name",e);
        $("#topcit").removeClass("active");
        $("#topear").removeClass("_none");
        $("#topear").addClass("active");
        $("#cit").removeClass("active in");
        $("#ear").addClass("active in");
        //改变ul的显示
        showear(e);
    })
}
//选择县区，显示小区
$.fn.countyclick=function(){
    //t顶部
    $("#ear").on("click","a",function () {
        var e=$("#cit").attr("data-name");
        var b=$(this).text();
        $("#topear>a").text(b);
        $("#ear").attr("data-name",b);
        $("#topear").removeClass("active");
        $("#topvil").removeClass("_none");
        $("#topvil").addClass("active");
        $("#vil").addClass("active in");
        $("#ear").removeClass("active in");
        //删除旧的小区元素
        showvil(e,b);
    });
}

//显示城市列表//t顶部
function showcit(){
    var getcity={"city":"Null","county":"Null"};
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/locate/city.do",
        data:JSON.stringify(getcity),
        dataType:"json",
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.citys.length;i++){
                html+='<a href="#" class="county">'+json.citys[i]+'</a>';
            }
            $("#cit").children().remove();
            $("#cit").append(html);


        }
    })
}
//显示县区//t顶部
function showear(citys){
    var getcounty={"city":citys,"county":"Null"};
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getcounty),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){

            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.countys.length;i++){
                html+='<a href="#"  class="county">'+json.countys[i]+'</a>';
            }
            $("#ear").children().remove();
            $("#ear").append(html).show();

        }
    })
}
//显示小区//t顶部
function showvil(citys,countys){
    var getShow={"city":citys,"county":countys};
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getShow),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.shops.length;i++){
                html+='<a href="#"  class="county">'+json.shops[i]+'</a>';
            }
            $("#vil").children("a").remove();
            $("#vil").append(html).show();
        }
    })
}

function pricefixto(price){
    return (Number(price)).toFixed(2);
}