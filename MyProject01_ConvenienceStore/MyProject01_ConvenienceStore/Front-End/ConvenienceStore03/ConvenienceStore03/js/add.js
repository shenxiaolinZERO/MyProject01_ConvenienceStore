/**
 * Created by lenovo on 2015-11-13.
 */

function checkCookie() {

    //getCookie("proeare");

    var proeare = $.cookie("proeare");
    if (proeare != null && proeare != "") {
        proeare = proeare.split(',');
        var pos = proeare[0] + proeare[1] + proeare[2];
        var x=  proeare[0] +"-"+ proeare[1] +"-"+ proeare[2];
        $("#cityname").attr("value", pos);
        $("#cityname").attr("data-cityname", x);
        //商品搜索
        $("#searchitem").mysearch();

        cartnum();
        $().otherpageapos();
        //请求商品列表
        $.list();
        //顶部地址改变
        $().poschange();
        return;
    }
}
$.fn.listclic = function () {
    var icon1 = "glyphicon glyphicon-chevron-up";
    var icon2 = "glyphicon glyphicon-chevron-down";
    $("#menuList ").on("click","#order li", function () {
        var issue = $(this).children("span");
        if (issue.hasClass(icon1)) {
            issue.removeClass(icon1);
            issue.addClass(icon2);
        } else {
            issue.removeClass(icon2);
            issue.addClass(icon1);
        }
    });
}
//销量排序
$.fn.sortSellnum = function (cla,pro,reg,pos) {
    $("#sortSellnum").on("click", function () {
        //var reg = getUrlParam("key");
        //var pos = getUrlParam("pos");

        //var cla=getUrlParam("bigclass");
        //var pro=getUrlParam("propertyname");
        //搜索框出来的商品进行销量排序
        if (reg != null && reg != "") {
            var sort = {"orderstyle": "asc", "ordercondition": "item_bynum1", "name": reg, "address": pos};
            $.ajax({
                type: "post",
                url: "http://192.168.199.242:8080/BSMD/item/search.do ",
                data: JSON.stringify(sort),
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                    $.fn.goodContent(json,pos);
                    $().itemclick();
                }


            });
        }
        //点类进来的商品进行销量排序
        if (cla != null &&cla != "") {
            if(pro==null){
                pro="";
            }
            var y = {"address": pos, "classname": cla, "propertyname": pro,"orderstyle": "asc", "ordercondition": "item_bynum1"};
            $.ajax({
                type: "post",
                data: JSON.stringify(y),
                url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    var json = data;
                    console.log(json);
                    $.fn.goodContent(json,pos);
                    $().itemclick();
                }
            })
        }

    })
}
//价格排序
$.fn.sortPrice= function (cla,pro,reg,pos) {
    $("#sortPrice").on("click", function () {
        //var reg = getUrlParam("key");
        //var pos = getUrlParam("pos");

        // var cla = getUrlParam("bigclass");
        //var pro = getUrlParam("propertyname");
        //搜索框出来的商品进行价格排序
        if (reg != null && reg != "") {
            var sort = {"orderstyle": "asc", "ordercondition": "item_sale_price", "name": reg, "address": pos};
            $.ajax({
                type: "post",
                url: "http://192.168.199.242:8080/BSMD/item/search.do ",
                data: JSON.stringify(sort),
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    var json=data;
                    console.log(data);
                    $.fn.goodContent(json,pos);
                    $().itemclick();
                }


            });
        }
        //点类进来的商品进行价格排序
        if (cla != null && cla != "") {
            if (pro == null) {
                pro = "";
            }
            var y = {"address": pos, "classname": cla, "propertyname": pro, "orderstyle": "asc", "ordercondition": "item_sale_price"};
            $.ajax({
                type: "post",
                data: JSON.stringify(y),
                url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    var json = data;
                    console.log(json);
                    $.fn.goodContent(json,pos);
                    $().itemclick();
                }
            })
        }
    })

}
/*鼠标移入图片变红色，移出恢复*/
$.imageRed = function () {


    $("#goods_list").on("mouseover", ".goods_div", function () {
        $(this).css({"border": "1px solid red"});
    });
    $("#goods_list").on("mouseout", ".goods_div", function () {
        $(this).css({"border": "1px solid #eee"});
    });
}
//顶部地址重新选择
$.fn.poschange=function(){
    $("#cityname").on("focus", function () {
        $(".hd-prochg").show();
        $("#pro").proclick();
        showcit();

    })
    $(".hd-prochg").on("mouseleaver", function () {
        $(".hd-prochg").hide();
    })
    $("body").on("input propertychange","#cityname",function(){
        $.changeaddress();
    })


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

        ////更新页面
        $.changeaddress();
        //商品搜索
        //$("#searchitem").mysearch();
    })

}

/*----改变顶部的地址时页面重新加载*/
$.changeaddress=function(){
    var bigclass = getUrlParam("bigclass");
    var propertyName = getUrlParam("propertyName");
    var pos=$("#cityname").attr("data-cityname");
    console.log(pos);
    var reg=getUrlParam("key");
    //清空
    //$(".breadcrumb").html("");
    //$("#brand .f_list").html("");
    //$("#store .f_list").html("");
    //$("#goods_list").html("");
    //$("#menuList").html("");

    //加载
    $.goodlist(bigclass ,propertyName,reg,pos);


}




/*---------------从URL中获取参数，传值给$.goodlist()而后加载商品列表---------------*/
$.list=function(){
    //获取url的key值
    var bigclass = getUrlParam("bigclass");
    var propertyName = getUrlParam("propertyName");
    var reg = getUrlParam("key");
    var pos = getUrlParam("pos");
    console.log(bigclass+propertyName+pos);
    console.log(reg);
    $.goodlist(bigclass ,propertyName,reg,pos);

}
/*---------------加载商品列表---------------*/
$.goodlist = function (bigclass ,propertyName,reg,pos) {


    // if(reg==null) return;
    //x={"name":reg,"address":"福州-鼓楼区-胜利小区"};
    //console.log("goodlist"+x);
    if (bigclass != null && bigclass != "") {
        if(propertyName==null){
            propertyName="";
        }
        var y = {"address": pos, "classname": bigclass, "propertyname": propertyName};
        $.ajax({
            type: "post",
            data: JSON.stringify(y),
            url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);
                //品牌列表加载
                var brand = ''
                for (var i = 0; i < json.brandlist.length; i++) {
                    brand += '<li><a  class="" href="#">' + json.brandlist[i] + '</a></li>';
                }
                //店铺列表加载
                var store='';
                for (var i = 0; i < json.shoplist.length; i++) {
                    store += '<li><a  class="" href="#">' + json.shoplist[i]+ '</a></li>';

                }
                $("#brand .f_list").html("");
                $("#store .f_list").html("");
                $("#brand .f_list").append(brand);
                $("#store .f_list").append(store);
                //面包屑
                if(propertyName==""){
                    var bread1='';
                    bread1+=' <li ><a  href="index.html">首页</a></li>';
                    bread1+=' <li ><a  href="#" id="bigcla">'+decodeURI(bigclass)+'</a></li>';
                    $(".breadcrumb").html("");
                    $(".breadcrumb").append(bread1);
                }else{
                    var bread2='';
                    bread2+=' <li ><a  href="index.html">首页</a></li>';
                    bread2+=' <li ><a  href="#" id="bigcla">'+decodeURI(bigclass)+'</a></li>';
                    bread2+=' <li ><a  href="#" id="procla">'+decodeURI(propertyName)+'</a></li>';
                    $(".breadcrumb").html("");
                    $(".breadcrumb").append(bread2);
                }

                //---------

               // //某个品牌被点击
               // $("#brand").filterclick();
                //删除面包屑中的某个品牌或某个店铺
                var bcla= $("#bigcla").text();
                var pcla=$("#procla").text();
                $().deleteBread(bcla,pcla);
                //点击面包屑的大类名称
               $().classClick();

                $.imageRed();

                //$().itemclick();
                //商品销量

                $.firstMenulist();
                $().properfilterclick(pos);
                $("#sortSellnum").sortSellnum(bigclass,propertyName,reg,pos);
                $("#sortPrice").sortPrice(bigclass,propertyName,reg,pos);

            }
        })
    }
    if (reg != null &&reg != "") {
        x = {"name": reg, "address": pos};

        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            url: "http://192.168.199.242:8080/BSMD/item/search.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);
                //ar con=$("#searchitem").val();
                console.log(x.name);

                var bread='';
                bread+=' <li ><a  href="#">搜索结果</a></li>'
                bread+=' <li ><a  href="#">'+decodeURI(reg)+'</a></li>'

                $(".breadcrumb").html("");
                $(".breadcrumb").append(bread);

                var brand = ''
                for (var i = 0; i < json.brandlist.length; i++) {
                    brand += '<li> <a  class="" href="#">' + json.brandlist[i] + '</a></li>';
                }
                //店铺列表加载
                var store='';
                for (var i = 0; i < json.shoplist.length; i++) {
                    store += '<li><a  class="" href="#">' + json.shoplist[i]+ '</a></li>';
                }
                $("#brand .f_list").html("");
                $("#store .f_list").html("");
                $("#brand .f_list").append(brand);
                $("#store .f_list").append(store);
                $("#brand").filterclick();
                //删除面包屑中的某个品牌或某个店铺
                $().deleteBread();

                $.firstMenulist();
                $.imageRed();

                $().properfilterclick(pos);
                //$().itemclick();
                //商品销量
                $("#sortSellnum").sortSellnum(bigclass,propertyName,reg,pos);
                $("#sortPrice").sortPrice(bigclass,propertyName,reg,pos);
            }
        })
    }
}
/*-------------end加载商品列表*/


/*---------------加载菜单列表---------------*/
$.firstMenulist = function () {

    //获取url的key值
    //var reg = getUrlParam("key");
    var propertyName = getUrlParam("propertyName");
    console.log(propertyName);
    var pos = getUrlParam("pos");
    var proper=decodeURI(propertyName);
    //console.log(proper);
    // if(reg==null) return;
    //x = {"name": reg[0], "address": pos};
    //console.log(x);

    $.ajax({
        type: "post",
        url: "http://192.168.199.242:8080/BSMD/item/classlist.do",
        dataType: "json",
        //data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {

            var json = data;
            console.log(json);
            var html2 = '<div style="width: 240px;"><ul class="nav-tabs nav-stacked navlist _menu" id="order">';
            for (var i = 0; i < json.bigclass.length; i++) {
                html2+='<ul>'
                html2 += '<li data-toggle="collapse" data-target="#' + i + '"><a>' + json.bigclass[i].name + '</a><span class="glyphicon glyphicon-chevron-up"></span></li>';
                html2 += '<ul class="collapse in nav-tabs nav-stacked navlist-l _menuDetail" id=' + i + '>';

                for (var j = 0; j < json.bigclass[i].property.length; j++) {
                    if(proper==json.bigclass[i].property[j].propertyName){
                        html2 += '<li><a  class="propertyName " href="#" style="color:red;"> ' + json.bigclass[i].property[j].propertyName + '</a> </li>';
                    }else{
                        html2 += '<li><a  class="propertyName" href="#"> ' + json.bigclass[i].property[j].propertyName + '</a> </li>';
                    }
                }
                html2 += '</ul>';
            }
            html2 += '</ul></div>';
            $("#menuList").html("");
            $("#menuList").append(html2);
            $("#order").listclic();


        }
    })



}
/*----------end加载菜单列表*/
/*------二级菜单被点击-----*/
$.fn.properfilterclick = function (pos) {
    $("#menuList").on("click", "ul li a.propertyName", function () {
        $(".propertyName").css({"color": "#3C3C3C"});
        $(this).css({"color": "#f54d5b"});
        var reg=getUrlParam("key");
        var e1=$(this).text();
        var e2=$(this).parent().parent().prev().children("a").html();

        //面包屑
        $(".breadcrumb").html("");
        var bread='';
        bread+=' <li ><a  href="#">'+e2+'</a></li>';
        bread+=' <li ><a  href="#">'+e1+'</a></li>';
        $(".firstBread").html("首页");
        $(".breadcrumb").append(bread);


        console.log(e1);
        console.log(e2);
        $().property(e2,e1,reg,pos);
        $("#sortSellnum").sortSellnum(e2,e1,reg,pos);
        $("#sortPrice").sortPrice(e2,e1,reg,pos);
        $("#filter1").show();
        $("#filter2").show();

    })
}
//点击二级菜单加载商品
$.fn.property=function(e2,e1,reg,pos){
    //var pos = getUrlParam("pos");
    //console.log("二级菜单加载");
    //$.goodlist(e2,e1,"",pos);
    var x={"address": pos,"classname":e2,"propertyname":e1}
    console.log("点击二级菜单加载商品");
    console.log(x);
    $.ajax({
        type: "post",
        data: JSON.stringify(x),
        url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            $.fn.goodContent(json,pos);
            var brand = ''
            for (var i = 0; i < json.brandlist.length; i++) {
                brand += '<li> <a  class="" href="#">' + json.brandlist[i] + '</a></li>';
            }
            //店铺列表加载
            var store='';
            for (var i = 0; i < json.shoplist.length; i++) {
                store += '<li><a  class="" href="#">' + json.shoplist[i]+ '</a></li>';
            }
            $("#brand .f_list").html("");
            $("#store .f_list").html("");
            $("#brand .f_list").append(brand);
            $("#store .f_list").append(store);

            $().itemclick();

        }
    })
}
/*------筛选条件被点击----*/
$.fn.filterclick = function () {
    //品牌
    $("#brand").on("click", "a", function () {
        var e = $(this).text();
        var  bread=' <li id="brandBread"><a  href="#" >'+e+'<span class="glyphicon glyphicon-remove" ></span></a></li>';
        $(".breadcrumb").append(bread);
        $("#filter1").hide();
        $().filteritem(e);
    })
    //店铺
    $("#store").on("click", "a", function () {
        var s=$(this).text();
        var  bread1=' <li id="storeBread"><a  href="#" >'+s+'<span class="glyphicon glyphicon-remove" ></span></a></li>';
        $(".breadcrumb").append(bread1);
        $("#filter2").hide();
        $().filterStoreitem(s);
    })
    //$("#brandBread").deleteBread();
}
//点击面包屑的大类名称重新加载页面
$.fn.classClick=function(){
    $(".breadcrumb").on("click", "#bigcla", function () {
        var bcla=$(this).text();
        var reg = getUrlParam("key");
        var pos = getUrlParam("pos");
        var pcla="";
        //重新加载
        $.goodlist(bcla,pcla,reg,pos);

    })


}
//点击面包屑上的某个品牌然后删除这个品牌，并显示条件中的品牌这一栏
$.fn.deleteBread = function(bcla,pcla){
    var reg=getUrlParam("key");
    var pos=getUrlParam("pos");
    $(".breadcrumb").on("click", "#brandBread a", function () {

        $(this).parent().remove();
        $("#filter1").show();
        $.goodlist(bcla,pcla,reg,pos);

    })
    $(".breadcrumb").on("click", "#storeBread a", function () {
        $(this).parent().remove();
        $("#filter2").show();
         $.goodlist(bcla,pcla,reg,pos);
    })

}

//选品牌条件加载商品
$.fn.filteritem = function (e) {

    //获取url的key值
    var reg = getUrlParam("key");
    var cla = getUrlParam("bigclass");
    var pro = getUrlParam("propertyname");
    var pos = getUrlParam("pos");
    //var pos1 = pos.split(',');
    // var p = pos1[0] + "-" + pos1[1] + "-" + pos1[2];
    //console.log(pos1);
    if (reg != null&&reg!="") {
        // if(reg==null) return;
        var x = {"name": reg,"address": pos, "brandname": e};
        console.log(x);
        //var  p1=encodeURI(p)
        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            url: "http://192.168.199.242:8080/BSMD/item/search.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);

                $().itemclick();

            }
        })


    }

    if(cla != null&&cla!="") {
        if (pro != null) cla = pro;
        var y = {"name": cla, "address": pos, "brandname": e};
        console.log(x);
        //var  y=encodeURI(p)
        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(y),
            url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);

                $().itemclick();

            }
        })

    }
}
//选店铺条件加载商品
$.fn.filterStoreitem = function (s) {
    //获取url的key值
    var reg = getUrlParam("key");
    var cla = getUrlParam("bigclass");
    var pro = getUrlParam("propertyname");
    var pos = getUrlParam("pos");
    //pos = pos.split(',');
    //var p = pos[0] + "-" + pos[1] + "-" + pos[2];
    console.log(pos);
    if (reg != null&&reg!="") {
        // if(reg==null) return;
        var x = {"name": reg,"address": pos, "shopname": s};
        console.log(x);
        //var  y=encodeURI(p)
        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            url: "http://192.168.199.242:8080/BSMD/item/search.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);
                $().itemclick();

            }
        })
    }
    if (cla != null&&cal!="") {
        if (pro != null) cla = pro;
        var y = {"name": cla, "address": pos, "shopname": s};
        console.log(x);
        //var  y=encodeURI(p)
        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(y),
            url: "http://192.168.199.242:8080/BSMD/item/classfind.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json,pos);
                $().itemclick();

            }
        })
    }

}
//拼接商品列表
$.fn.goodContent=function(json,pos){
    var html1 = '';
    for (var i = 0; i < json.itemlist.length; i++) {
        var id = json.itemlist[i].itemNo;
        hr = "goods.html?id=" + id + "&pos=" + pos;
        html1 += '<div class="goods_div"  data-item="' + json.itemlist[i].itemNo + '" >';
        // html1 += '<div class="goods_float_right" style="width: 25%"><dl></dl></div>';
        html1 += '<div class="goods_pic"><a href="' + hr + '" target="_blank"> <img  class="goods_color" src="' + json.itemlist[i].url + '"></a></div>';
        html1 += '<div class="goods_details"><a href="' + hr + '" "target="_blank">' + json.itemlist[i].itemName + '</a></div>';
        html1 += '<div class="goods_price"><div class="pull-left"><span >' + json.itemlist[i].itemSalePrice;
        html1 += '</span></div><div class="pull-right"><span class="goods_price_num">' + json.itemlist[i].itemBynum1 + '</span></div></div>';
        html1 += '<div class="goods_button"><a target="_blank" href="#">加入购物车</a><a  target="_blank" href="#">收藏</a></div>';
        html1 += '</div>';
    }
    $("#goods_list").html("");
    $("#goods_list").append(html1);
}







$(function () {

    //顶部地址从cookie中获取
    checkCookie();
    loadname();

    //某个品牌被点击
    $("#brand").filterclick();

    //$.loadfirst();

    // $.firstMenulist();
});


//点击商品应跳转至商品详情界面，需要信息：+地址+商品编号，地址从顶部获取，编号从商品div的data-item获取
$.fn.itemclick=function(){
    $("#goods_list").on("click","a",function(){
        var x= $(".goods_div").attr("data-item");
        var pos=$("#cityname").attr("data-cityname");
        console.log(pos);
        if(x!=""|pos!=""){
            // x=encodeURI(x);
            // y=encodeURI(pos);
            href='goods.html?id='+x+'&pos='+pos;

        }
    })
}
/*---页码的跳转---*/
$.fn.pageclick=function(){

}


