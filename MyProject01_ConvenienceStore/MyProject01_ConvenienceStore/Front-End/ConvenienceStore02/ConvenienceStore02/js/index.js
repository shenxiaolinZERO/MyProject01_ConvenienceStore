/**
 * Created by lenovo on 2015/11/18.
 */

//首页加载
$(document).ready(function () {


    //loadmenu();
    //页面加载地址检查和选择
    checkCookie();
    onmenu();
    $().poschange();
    //商品搜索
    $("#searchitem").mysearch();
    //地址选择的访问隐藏
    $("#curSelect").click(function () {

        $(".selectpro").slideToggle();
        $("#tabvillage").removeClass("active");
        $("#tabpro").addClass("active");
        $("#village").removeClass("active in");
        $("#province").addClass("active in");
    });

    //首页中部滑动
    $(".midslide").each(function () {
        $(this).luara({width: "330", height: "360", interval: 5000, selected: "selected", deriction: "left"})
    });
    //隐藏显示

    $(".megamenu").megamenu();
    //顶部滑动
    $("#slider").responsiveSlides({
        auto: true,
        nav: false,
        speed: 500,
        namespace: "callbacks",
        pager: true,
    });

})
//登录后从cookie中读取用户名
function loadname(){
   username= getCookie('username');
    if(username!=null&&username!=""){
        $("#usename").html(username);
        //用户名
        var href="usercenter.html?username="+username;
        $("#usename").value("href",href);
        $(".hd-login").hide();
        $(".hasloin").show();

    }
}
//顶部信息加载
$.fn.position= function () {
    $("#subpos").on("click", function () {
        //首页获取地址显示在顶部
        var pos=[$("#city").attr("data-name"),$("#eare").attr("data-name"),$("#village").attr("data-name")];
        if(pos!=null && pos!=""){
            setCookie('proeare',pos,2);
        }
        if(pos==""){

        }
       var x= getCookie("proeare");
        var y=x[0]+x[1]+x[2];
        $("#cityname").attr("value",y);
    })
}
//垂直导航菜单动画
$.fn.mainmenu = function (e) {
    $(".mainmenu").on("mouseenter",".odd",function(){
        // onmenu();
        $(".submenu1").children().hide();
        $(this).addClass("oddhover");
        $(this).siblings().removeClass("oddhover");
        var index=$(this).index(".mainmenu > .odd");
        $(".submenu1").css('width','500px');
        $(".submenu1").fadeIn(0,0.8);
        $(".submenu1 .col-md-2[data-order="+index+"]").show();
        $(".submenu1 .col-md-2[data-order=index]").siblings().hide();
    }).on("mouseleave",function(){
        // $(".mainmenu > .odd").stop();

    })
    $("#nav").on("mouseleave",function(){
        $(".mainmenu > .odd").removeClass("oddhover");
        $(".submenu1").fadeOut();
        $(".submenu1").children().hide();
    })

}
//搜索商品
$.fn.mysearch=function(){
    //点击搜索商品
    $("#searchitem").on("click",function(){

        var x=$("#mysearch").val();
        console.log(x);
        if(x==""){
            return;
        }
        x=encodeURI(x);
        location.href='goodsList.html?key='+x;
    })
    //搜索提示
    $("#mysearch").on("input propertychange", function () {
        var x=$("#mysearch").val();
        var pos=$("#cityname").attr("data-cityname")
       // y={"name":x,"address":"福州-鼓楼区-胜利小区"}
        y={"name":x,"address":pos}
        $.ajax({
            type:"post",
            data:JSON.stringify(y),
            dataType:"json",
            url:"http://192.168.199.242:8080/BSMD/item/findlist.do",
            header:{"Content-Type":"application/json",
                "Accept":"application/json"},
            success:function(data){
                var html='';
                $(".findlist>ul").children("li").remove();
                for(i=0;i<data.name.length;i++){
                    html+='<li class="cont"><a href="#">'+data.name[i]+'</a></li>';
                }
                $(".findlist>ul").append(html);
                $(".findlist").show();
            }
        })
    })
    $("#mysearch").on("blur", function () {
        $(".findlist").hide();
    })

}
//点击商品类别



//菜单
function onmenu() {
    var x=getCookie("proeare");
    //var pos = {"city": "福州", "county": "鼓楼区", "areaName": "胜利小区"}
    var pos = {"city": x[0], "county": x[1], "areaName": x[2]}
    $.ajax({
        type: "post",
        url: "http://192.168.199.242:8080/BSMD/item/index.do",
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
            for (var i = 0; i < 2; i++) {
                var html1 = '';
                html1 = '<div class="col-md-2" data-order="' + i + '"style="height: 521px; display:none;"><div>';
                html += '<div class="odd" data-order="0" data-id="1">';
                html += '<p><a href="cat.html"><span class="glyphiconn glyphicon-cutlery"></span>' + json.bigclass[i].name + '</a></p><span> ';
                for (var j = 0; j < json.bigclass[i].property.length; j++) {
                    html += '<a href="#" target="">' + json.bigclass[i].property[j].propertyName + '</a>';
                    html1 += '<a href="#" target="">' + json.bigclass[i].property[j].propertyName + '</a>';
                }
                html1 += '</div></div>';
                html0 += html1;
                html += '</span></div>';
            }
            $(".submenu1").append(html0);
            $(".col-md-2.mainmenu").append(html);
            var html2 = "";
            for (var i = 0; i < json.listhot.length; i++) {
                html2 += '<div class="col-md-2 span_6"><div class="box_inner"><a href="goods.html">';
                html2 += '<img src="' + json.listhot[i].url + '"class="img-responsive" alt=""/><div class="desc">'
                html2 += '<h4 class="proprice"><span class="price"></span>' + json.listhot[i].itemSalePrice + '</h4>';
                html2 += '<p><a href="goods.html">' + json.listhot[i].itemName + '</a></p></div> </a> </div> </div>';
            }
            $("#topnav1").append(html2);
            $(".mainmenu").mainmenu();

        }
    })
}
//顶部地址重新选择
$.fn.poschange=function(){
    $("#cityname").on("focus", function () {
        $(".hd-prochg").show();
        showcit();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();

    })
    $("#cityname").on("blur", function () {
        $(".hd-prochg").hide();
    })

}


