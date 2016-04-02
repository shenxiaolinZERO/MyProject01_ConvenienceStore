/**
 * Created by lenovo on 2015/11/18.
 */
/** 点击首页分类，*/
/**地址选择模态框与 顶部*/
//省市区的显示与隐藏
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

};
$.fn.tapClick=function(){
    $("#tabpro").on("click",function(){
        $(this).nextAll("li").addClass("_none");
    })
    $("#tabcity").on("click",function(){
        $(this).nextAll("li").addClass("_none");
    })
    $("#tabcounty").on("click",function(){
        $(this).nextAll("li").addClass("_none");
    })
};

//选择省，显示市
$.fn.proclick=function(){
    $("#province").on("click","a",function(){

        $("#curSelect").attr("data-position","");
        var e=$(this).text();
        $("#tabpro>a").text(e);
        $("#province").attr("data-name",e);
        $("#tabpro").removeClass("active");
        $("#tabcity").removeClass("_none");
        $("#tabcity").addClass("active");
        $("#province").removeClass("active in");
        $("#city").addClass("active in");
        showCity();

    })
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
};
//选择市，显示县区
$.fn.cityclick= function() {
    $("#city").on("click","a",function () {
        var  e=$(this).text();
        $("#tabcity>a").text(e);
        //分别存入各个对于的标签
        $("#city").attr("data-name",e);
        $("#tabcity").removeClass("active");
        $("#tabcounty").removeClass("_none");
        $("#tabcounty").addClass("active");
        $("#city").removeClass("active in");
        $("#eare").addClass("active in");
        //删除旧的县区子元素
        $("#eare").children("a").remove();
        //改变 ul的显示
        showcounty(e);
    });
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
};
//选择县区，显示小区
$.fn.countyclick=function(){
    $("#eare").on("click","a",function () {
        var e=$("#city").attr("data-name");
        var b=$(this).text();
        $("#tabcounty>a").text(b);
        $("#eare").attr("data-name",b);
        $("#tabcounty").removeClass("active");
        $("#tabvillage").removeClass("_none");
        $("#tabvillage").addClass("active");
        $("#village").addClass("active in");
        $("#eare").removeClass("active in");
        //删除旧的小区元素
        $("#village").children("a").remove();
        showShop(e,b);
    });
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
//选择小区完成
$.fn.villclick= function () {
    $("#village").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#tabvillage>a").text(e);
        $("#village").attr("data-name",e);
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
        $(".hd-prochg").hide();
        //拼装写入cookie
        var pos=$("#cit").attr("data-name")+$("#ear").attr("data-name")+$("#vil").attr("data-name");
        var post=$("#cit").attr("data-name")+"-"+$("#ear").attr("data-name")+"-"+$("#vil").attr("data-name");
        $("#cityname").attr("data-positon",pos);
        $("#cityname").attr("data-cityname",post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x=[$("#cit").attr("data-name"),$("#ear").attr("data-name"),$("#vil").attr("data-name")];
        $.cookie("proeare",x,{expires:7});
       //更新页面首页
       onmenu();
        //更新优惠券信息
        getVoucher("");
    })
};

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
            //$("#ear").countyclick();

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

//显示城市列表
function showCity(){
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
            $("#city").children("a").remove();
            $("#city").append(html);
        }
    })
}
//显示县区
function showcounty(citys){
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
            $("#eare").children("a").remove();
            $("#eare").append(html).show();
        }
    })
}
//显示小区
function showShop(citys,countys){
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
            $("#village").children("a").remove();
            $("#village").append(html).show();

        }
    })
}


/**-----------end 地址选择*/

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
};
//进入首页先检查cookie有无地址
function checkCookie(){

    var proeare=$.cookie("proeare");
    if(proeare!=null && proeare!=""){
        proeare=proeare.split(',');
        var pos=proeare[0]+proeare[1]+proeare[2];
        var x=proeare[0]+"-"+proeare[1]+"-"+proeare[2];
        $("#cityname").attr("value",pos);
        $("#cityname").attr("data-cityname",x);
        //顶部地址改变
        $("#cityname").poschange();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();
        $().toptabClick();
        //用cookie请求页面
        onmenu();
        getVoucher("");
        return;
    }
    else{
        //无地址记录显示模态框
        $("#myModal").modal('show');
        //地址选择的隐藏显示
        $("#curSelect").click(function () {
            $(".selectpro").slideToggle();
            $("#tabvillage").removeClass("active");
            $("#tabpro").addClass("active");
            $("#village").removeClass("active in");
            $("#province").addClass("active in");
        });
        showCity();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();
        $().tapClick();
        //确定后顶部地址显示
        $("#subpos").position();
        //顶部地址改变
        $("#cityname").poschange();
        return;
    }

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
       // loginout();
    }
}
//模态框地址选择完成后，点击确定页面加载
$.fn.position= function () {
    $("#subpos").on("click", function () {
        if($("#curSelect").val()==""||$("#curSelect").val()==null){
            $(".modal-footer span").show();
            return;
        }
        else{
            $("#myModal").modal("hide");
            //首页获取地址显示在顶部
            var pos=[$("#city").attr("data-name"),$("#eare").attr("data-name"),$("#village").attr("data-name")];
            if(pos!=null && pos!=""){
                $.cookie("proeare",pos,{expires:7});
                var  x=pos[0]+"-"+pos[1]+"-"+pos[2];
                $("#cityname").attr("data-cityname",x);
            }
            if(pos==""){

            }
            var y=getposition();
            $("#cityname").attr("value",y[1]);
            //确定后重新加载页面
            $().off("click","#tabcity",'tapClick');
            $().off("click","#tabcounty",'tapClick');
            $().off("click","#tabvillage",'tapClick');
            $().off("click","#province",'proclick');
            $().off("click","#province",'cityclick');
            $().off("click","#province",'countyclick');
            $().off("click","#province",'villclick');
            onmenu();
            getVoucher("");
        }


    })
};
//菜单及页面改变
$.fn.mainmenu = function (e) {
    //全部商品点击菜单收起
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
    function r(){
        $(".mainmenu").off("mouseenter mouseleave",".odd");
        if(window.innerWidth<=1200){

            //$("#listhide").removeClass("_none");
            $(".mainmenu").addClass("mid-odd");
            $("#nav").slideUp(250);
            $(".menu-container.voucher").hide();
           // $("#listhide").hidelist();
            //
            $(".categorylist>li>a").css("dispaly","inline");
        }else{
            $("#listhide").addClass("_none");
            $(".mainmenu").removeClass("_none");
            $(".mainmenu").removeClass("mid-odd");
            $("#nav").slideDown(250);
            $(".categorylist>li>a").css("dispaly","inline-block");
            $(".menu-container.voucher").show();
            e();
        }
    }
    function e(){
        $(".mainmenu").on("mouseenter",".odd",function(){

            $(".submenu1").children().hide();
            $(this).addClass("oddhover");
            $(this).siblings().removeClass("oddhover");
            var index=$(this).index(".mainmenu > .odd");
            $(".submenu1").css('width','500px');
            $(".submenu1").fadeIn(0,0.8);
            $(".submenu1 .propertyclass[data-order="+index+"]").show();
            $(".submenu1 .propertyclass[data-order=index]").siblings().hide();
        }).on("mouseleave",function(){
            // $(".mainmenu > .odd").stop();
        })
        $("#nav").on("mouseleave",function(){
           $(".mainmenu > .odd").removeClass("oddhover");
            $(".submenu1").fadeOut(400);
            $(".submenu1").children().hide();
        })
    }
    r();
    $(window).resize(function () {
        r();
    })

};
//搜索商品
$.fn.mysearch=function(){
    //点击搜索商品
    $("#searchitem").on("click",function(){

        var x=$("#mysearch").val();
        var pos=$("#cityname").attr("data-cityname");
        if(x==""|pos==""){
            return;
        }
        location.href='itemList.html?key='+x+'&pos='+pos;
    })
    //搜索提示
    $("#mysearch").on("input propertychange", function () {

        var pos = $("#cityname").attr("data-cityname");
        var x=$("#mysearch").val();
       // y={"name":x,"address":"福州-鼓楼区-胜利小区"}
        y={"name":x,"address":pos}
        $.ajax({
            type:"post",
            data:JSON.stringify(y),
            dataType:"json",
            url: "http://192.168.113.14:8080/BSMD/item/findlist.do",
            header:{"Content-Type":"application/json",
                "Accept":"application/json"},
            success:function(data){
                if (data!=null||data!="") {
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


};
//点击商品类别

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

//菜单
function onmenu() {

    var proeare = getposition();
    var pos = {"address": proeare[0]}
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/item.do",
        data: JSON.stringify(pos),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {

            var json = data;
            console.log(data);

            //商品列表连接
            var html = '';
            var html0 = '';
            $("#topnav1").html('');
            $(".submenu1").html('');
            $(".mainmenu").html('');
            for (var i = 0; i <json.bigclass.length; i++) {
                var html1 = '';
                var hr1='itemList.html?bigclass='+json.bigclass[i].name;
                html1 = '<div class="propertyclass" data-order="' + i + '"style=" display:none;"><div>';
                html += '<div class="odd" data-order="0" data-id="1">';
                html += '<p><a href="'+hr1+'"target="_blank"><span class="glyphicon glyphicon-cutlery index-icon"></span>' + json.bigclass[i].name + '</a></p><span> ';
                for (var j = 0; j < json.bigclass[i].property.length; j++) {
                    var hr2='itemList.html?bigclass='+json.bigclass[i].name+'&propertyName='+json.bigclass[i].property[j].propertyName;
                    html += '<a href="'+hr2+'" target="_blank">' + json.bigclass[i].property[j].propertyName + '</a>';
                    html1 += '<a href="'+hr2+'" target="_blank">' + json.bigclass[i].property[j].propertyName + '</a>';
                }
                html1 += '</div></div>';
                html0 += html1;
                html += '</span></div>';
            }
            $(".submenu1").append(html0);
            $(".mainmenu").append(html);
            //广告图片
            var adol='<ol class="carousel-indicators"><li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
            var  addiv='<div class="carousel-inner"><div class="item active"><img  style="width: 100%" src="'+json.adlist[0]+'" alt="First slide"> </div>';
            for(var i=1;i<json.adlist.length;i++){
                adol+=' <li data-target="#myCarousel" data-slide-to="'+i+'"></li>';
                addiv+='<div class="item"> <img  style="width: 100%" src="'+json.adlist[i]+'" alt="Second slide"> </div>';
            }
            adol+='</ol></div></div>';
            addiv+='';
            $("#myCarousel").html(adol+addiv);

            //热门商品
            var html2 = "";
            for (var i = 0; i < json.listhot.length; i++) {
                var  id=data.listhot[i].itemNo;
                hr3="itemDetial.html?id="+id;
                html2 += '<div class="col-lg-2 span_6"><div class="box_inner"><a href="'+hr3+'">';
                html2 += '<img src="' + json.listhot[i].url + '"class="img-responsive" alt=""/><div class="desc">'
                html2 += '<h4 class="proprice"><span class="price"></span>' + json.listhot[i].itemSalePrice + '</h4>';
                html2 += '<p><a href="'+hr3+'">' + json.listhot[i].itemName + '</a></p></div> </a> </div><div class="clearfix"></div> </div>';
            }
            $("#topnav1").append(html2);
            //特价商品
            var html3="";
            for (var i = 0; i < json.listcx.length; i++) {
                var  id=data.listcx[i].itemNo;
                hr3="itemDetial.html?id="+id;
                html3 += '<div class="col-lg-2 span_6"><div class="box_inner"><a href="'+hr3+'">';
                html3 += '<img src="' + json.listcx[i].url + '"class="img-responsive" alt=""/><div class="desc">'
                html3 += '<h4 class="proprice"><span class="price"></span>' + json.listcx[i].itemSalePrice + '</h4>';
                html3 += '<p><a href="'+hr3+'">' + json.listcx[i].itemName + '</a></p></div> </a> </div><div class="clearfix"></div> </div>';
            }
            $("#topnav2").html(html3);
            //分类
            var html4='';
            for(var i=0;i<json.bigclass.length;i++){
                var hr1='itemList.html?bigclass='+json.bigclass[i].name;
                html4+='<div class="container"><div class="tabarrow0" style=""><div class="midtitle">';
                html4+='<a href="'+hr1+'">'+json.bigclass[i].name +'</a> <em class="point">·</em> <a href="'+hr1+'">'+json.bigclass[i].name +'</a></div>';
                html4+=' <div class="detaillist"> <div class="col-lg-2 clearfix"> <ul class="categorylist"><li>';
                for (var j = 0; j < json.bigclass[i].property.length; j++) {
                    var hr2='itemList.html?bigclass='+json.bigclass[i].name+'&propertyName='+json.bigclass[i].property[j].propertyName;
                    html4 += '<a href="'+hr2+'" target="_blank">' + json.bigclass[i].property[j].propertyName + '</a>';
                    html4 += '<a href="'+hr2+'" target="_blank">' + json.bigclass[i].property[j].propertyName + '</a>';
                }
                html4+=' </li> </ul> </div>';
                for (var j = 0; j < json.listclass[i].theclass.length; j++) {
                    var  id=json.listclass[i].theclass[j].itemNo;
                    hr3="itemDetial.html?id="+id;
                    html4 += '<div class="col-lg-2 span_6"><div class="box_inner"><div class="goodspic"><a href="'+hr3+'">';
                    html4 += '<img src="' + json.listclass[i].theclass[j].url + '"class="" alt=""/></a></div><div class="desc">'
                    html4 += '<h4 class="proprice"><span class="price"></span>' +json.listclass[i].theclass[j].itemSalePrice + '</h4>';
                    html4 += '<p><a href="'+hr3+'">' + json.listclass[i].theclass[j].itemName + '</a></p></div> </a> </div> </div>';
                    if(j==4){
                        html4+='</div>';
                    }
                }
                html4+=' <div class="clearfix"></div> </div> </div>';
            }
            $(".content_middle").html(html4);
            $(".mainmenu").mainmenu();
            //商品搜索
            $("#searchitem").mysearch();
            //轮播

                $("#myCarousel").carousel('cycle');
        }
    })

}
//顶部地址重新选择
$.fn.poschange=function(){
    $("#cityname").on("mouseenter onblur", function () {
        $(".hd-prochg").show();

    })
    $(".box1").on("mouseleave blur", function () {
        $(".hd-prochg").hide();
    })
    $("#cityname").on("propertychange input ",function(){
         onmenu();
    })

};

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
function createXHR(){
    if(typeof XMLHttpRequest!="undefinde"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject !="undefine"){
        if(typeof arguments.callee.activeXString !="string"){
            var versions=["MSXML2.XMLHttp.6.0","MSXMLHttp.3.0","MSXML2.XMLHttp"],
                i,len;
            for(i=0,len=versions.length;i<len;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString=versions[i];
                    break;
                }catch(ex) {

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else {
        throw new Error("No XHR object available.");
    }
}
//退出登录
function loginout(){
    $("#loginout").bind("click",function(){
        $.cookie("username","");
        var xhr=createXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                    alert(xhr.response);
                }else{
                    alert("Request was unsuccessful :"+xhr.status);
                }
            }
        }
        xhr.open("post","logout.do",true);
        xhr.send(null);

    })
}
//加载优惠券
function getVoucher(shopNo){
    var json={"shopNo":shopNo,"custNo":""};
    console.log(json);
    $.ajax({
        data:JSON.stringify(json),
        dataType:"json",
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/getStamps",
        header: {"Content-Type": "application/json", "Accept": "appliction/json"},
        success: function (data) {
            console.log(data);
            if(data.message=="success"){
                var stamps=data.stamps;
                if(stamps.length>0){
                    //首页优惠券
                    var indexhtml='<h5><span class="glyphicon glyphicon-tags"></span> 礼券</h5>';
                    //全部优惠券
                    var allhtml='<h5>全场通用</h5>';
                    color=['#F5A739','#01B6A9','#FD485A'];
                    for(var i= 0;i<stamps.length;i++){
                        if(i<=2){
                            indexhtml+=' <div class="per-voucher" style=" background-color:'+color[i]+'"><div class="fl">' +
                                '<span style="color: #fff">¥</span><span class="money">'+stamps[i].stampAmt+'</span></div> ' +
                                '<div class="fl" style="margin-left: 5px"> <p style="color: #fff">'+stamps[i].stampTypeName+
                                '</p><p style="color: #333;margin: 5px">优惠券</p> <a data-id="'+stamps[i].stampTypeNo+'" ' +
                                'class="getvoucher" >立即领取</a> </div> <div style="clear: both"></div> ' +
                                '<a class="more-voucher" style="font-size: 12px" href=""  data-target="#voucherModal" data-toggle="modal">更多>></a> </div>';
                        }
                        if(stamps[i].shopNo=="all"){
                            allhtml+='  <div class="col-lg-6 per-voucher" style="margin-bottom: 20px"><div class="fl"> <span style="color: #fff">¥</span> ' +
                                '<span class="money">'+stamps[i].stampAmt+'</span> </div> <div class="fl" style="margin-left: 30px"> ' +
                                '<p style="color: #fff">'+stamps[i].stampTypeName+'</p> <p style="color: #333;margin: 5px">优惠券</p> ' +
                                '<a class="getvoucher" data-id="'+stamps[i].stampTypeNo+'">立即领取</a> </div><div style="clear: both"></div>' +
                                '<span class="more-voucher" style="font-size: 12px">使用期限：'+stamps[i].startValidDate_String +
                                '<br/>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-'+stamps[i].endValidDate_String+'</span></div>';
                        }

                    }
                    $("#voucherModal .modal-body").html(allhtml);
                    $(".voucher .index-voucher").html(indexhtml);
                    $(".per-voucher .getvoucher").off(".per-voucher .getvoucher","click","addStamp");
                    $().addStamp();
                }
            }
        }
    })
}
//检查是否登录，未登录则提示登录，
function isload(){
    var custno=$("#username").html();
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
//领取礼券
$.fn.addStamp=function(){

    $(".per-voucher .getvoucher").on("click",function(){
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
                    }else {
                        alert(data.message);
                    }
                }
            })
        }
    })
};
//首页加载
$(document).ready(function () {

    FuckInternetExplorer();

    function FuckInternetExplorer() {

        var browser = navigator.appName;

        var b_version = navigator.appVersion;

        var version = b_version.split(";");

        if (version.length > 1) {

            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));

            if (trim_Version <= 9) {

                alert('mouxi,快升级你的IE');

                //location.href=

            }
        }
    }
    loadname();
    checkCookie();
});

