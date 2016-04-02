/**
 * Created by lenovo on 2015-11-13.
 */

//页面加载检查地址
function checkCookie() {
    var pos = getposition();
    $("#cityname").attr("value", pos[1]);
    $("#cityname").attr("data-cityname", pos[0]);
    loadname();
    //商品搜索
    $("#searchitem").mysearch();
    $().otherpageapos();
    //顶部地址改变
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick();
    //请求商品列表
    $.list();
    $().properfilterclick(pos);
    //商品销量
    $("#sortSellnum").sortSellnum();
    $("#sortPrice").sortPrice();
    $().filterclick();
    $.firstMenulist();
        return;

}
//菜单列表上下图标
$.fn.listclic = function () {
    var icon1 = "glyphicon glyphicon-chevron-up list-icon";
    var icon2 = "glyphicon glyphicon-chevron-down list-icon";
    $("#menuList ").on("click", "#order li", function () {
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
$.fn.sortSellnum = function () {
    $("#sortSellnum").on("click", function () {
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.orderstyle = "desc";
        obj.ordercondition = "item_bynum1";
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        var json=getCondition();
        $(this).css({"background": "#fff none repeat scroll 0% 0%","color":"#f22E00"});
        $("#sortPrice").css({"background": "#F7F7F7 none repeat scroll 0% 0%","color":"#3C3C3C"});
        forAjax(json, json.address);
    })
}
//价格排序
$.fn.sortPrice = function () {
    $("#sortPrice").on("click", function () {
        $(this).css({"background": "#fff none repeat scroll 0% 0%","color":"#f22E00"});
        $("#sortSellnum").css({"background": "#F7F7F7 none repeat scroll 0% 0%","color":"#3C3C3C"});
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        //obj.orderstyle = "desc";
        if(obj.orderstyle == "asc"){
            obj.orderstyle="desc";
        }else{
            obj.orderstyle="asc";
        }
        obj.ordercondition = "item_sale_price";
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        var json=getCondition();
        forAjax(json,json.address);
    })

}
/*鼠标移入图片变灰色，移出恢复*/
$.imageRed = function () {
    $("#goods_list").on("mouseover", "li", function () {
        $(this).css({"border": "1px solid #999"});
    });
    $("#goods_list").on("mouseout", "li", function () {
        $(this).css({"border": "1px solid #f7f7f7"});
    });
}

//选择小区完成
$.fn.villclick= function () {
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
        //更新页面
        $.changeaddress();
    })
}
/*----改变顶部的地址时页面重新加载*/
$.changeaddress = function () {
    //被改变的条件存入cookie
    var jsonStr = $.cookie("condition");
    var obj = JSON.parse(jsonStr);

    var bigclass = obj.classname;
    var propertyName = obj.propertyName;
    var pos = $("#cityname").attr("data-cityname");
    console.log("顶部地址修改重新加载页面" + pos);
    var reg = obj.itemname;
    obj.address = pos;
    //将条件放入cookie
    var obj = {"address": pos, "itemname": reg, "classname": bigclass, "propertyname": propertyName,"brandname":"","orderstyle":"","ordercondition":"","shopname":""};
    var jsonStr = JSON.stringify(obj);
    $.cookie("condition", jsonStr);
    //加载
    $.goodlist(obj, pos);
}


/*---------------从URL中获取参数，传值给$.goodlist()而后加载商品列表---------------*/
$.list = function () {
    //获取url的key值
    var bigclass = getUrlParam("bigclass");
    var propertyName = getUrlParam("propertyName");
    var reg = getUrlParam("key");
    var pos = getposition();
    //将条件放入cookie
    var obj = {"address": pos[0], "itemname": reg, "classname": bigclass, "propertyname": propertyName,"brandname":"","orderstyle":"","ordercondition":"","shopname":""};
    var jsonStr = JSON.stringify(obj);
    $.cookie("condition", jsonStr);
    var json=getCondition();
    $.goodlist(json, json.address);
    $(".pagination").pageclick();

}
/*---------------加载商品列表---------------*/
$.goodlist = function (oj, pos) {
    if (oj.classname != null && oj.classname != "") {
        $.ajax({
            type: "post",
            data: JSON.stringify(oj),
             url: "http://192.168.113.14:8080/BSMD/item/item.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json, oj.address);
                //筛选条件（品牌和店铺）拼接
                $().filterContent(json);
                //面包屑
                if (oj.propertyName == ""||oj.propertyName==null) {
                    var bread1 = '';
                    bread1 += ' <li ><a  href="index.html">首页</a></li>';
                    bread1 += ' <li ><a  href="#" id="bigcla">' +decodeURI(oj.classname) + '</a></li>';
                    $(".breadcrumb").html("");
                    $(".breadcrumb").append(bread1);
                } else {
                    var bread2 = '';
                    bread2 += ' <li ><a  href="index.html">首页</a></li>';
                    bread2 += ' <li ><a  href="#" id="bigcla">' +decodeURI( oj.classname) + '</a></li>';
                    bread2 += ' <li ><a  href="#" id="procla">' + decodeURI(oj.propertyname)+ '</a></li>';
                    $(".breadcrumb").html("");
                    $(".breadcrumb").append(bread2);
                }

            }
        })
    }
    if (oj.itemname != null && oj.itemname  != "") {
        //请求页面
        $.ajax({
            type: "post",
            data: JSON.stringify(oj),
             url: "http://192.168.113.14:8080/BSMD/item/item.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(json);
                $.fn.goodContent(json, pos);
                console.log("guaanj"+decodeURI(oj.itemname));
                var bread = '';
                bread += ' <li ><a  href="#">搜索结果</a></li>'
                bread += ' <li ><a  href="#">' + decodeURI(oj.itemname) + '</a></li>'

                $(".breadcrumb").html("");
                $(".breadcrumb").append(bread);
                //筛选条件（品牌和店铺）拼接
                $().filterContent(json);
            }
        })
    }
    $().deleteBread();
    $.imageRed();
}
/*-------------end加载商品列表*/


/*---------------加载菜单列表---------------*/
$.firstMenulist = function () {

    var propertyName = getUrlParam("propertyName");
    console.log(propertyName);
    var pos = getposition();
    var proper = decodeURI(propertyName);
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/classlist.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            var html2 = '<div style="width: 240px;"><ul class="nav-tabs nav-stacked navlist _menu" id="order">';
            for (var i = 0; i < json.bigclass.length; i++) {

                html2 += '<li  class="biggcla" data-toggle="collapse" data-target="#' + i + '"><a>' + json.bigclass[i].name + '</a><span class="glyphicon glyphicon-chevron-up list-icon"></span></li>';
                html2 += '<ul class="collapse in nav-tabs nav-stacked navlist-l _menuDetail" id=' + i + '>';

                for (var j = 0; j < json.bigclass[i].property.length; j++) {
                    if (proper == json.bigclass[i].property[j].propertyName) {
                        html2 += '<li><a  class="propertyName " href="#" style="color:red;"> ' + json.bigclass[i].property[j].propertyName + '</a> </li>';
                    } else {
                        html2 += '<li><a  class="propertyName" href="#"> ' + json.bigclass[i].property[j].propertyName + '</a></li>';
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
$.fn.properfilterclick = function () {
    $("#menuList").on("click", "ul li a.propertyName", function () {
        $(".propertyName").css({"color": "#3C3C3C"});
        $(this).css({"color": "#f54d5b"});
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        var reg = "";
        var e1 = $(this).text();
        var e2 = $(this).parent().parent().prev().children("a").html();
        obj.propertyname = e1;
        obj.classname = e2;
        obj.brandname = "";
        obj.shopname = "";
        //将关键字至空
        obj.itemname = "";
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        //面包屑
        var bread = '';
        bread += ' <li ><a  href="index.html">首页</a></li>';
        bread += ' <li ><a  href="#" id="bigcla">' + e2 + '</a></li>';
        bread += ' <li ><a  href="#" id="procla">' + e1 + '</a></li>';
        $(".breadcrumb").html("");
        $(".breadcrumb").append(bread);
        console.log(e1);
        console.log(e2);
        var json=getCondition();
        $().property(json,json.address);
        $("#filter1").show();
        $("#filter2").show();

    })
}
/*----点击二级菜单后加载商品----*/
$.fn.property = function (json, pos) {

    console.log("点击二级菜单加载商品");
    console.log(json);
    $.ajax({
        type: "post",
        data: JSON.stringify(json),
         url: "http://192.168.113.14:8080/BSMD/item/item.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            $.fn.goodContent(json, pos);
            var brand = ''
            for (var i = 0; i < json.brandlist.length; i++) {
                brand += '<li> <a  class="" href="#">' + json.brandlist[i] + '</a></li>';
            }
            //店铺列表加载
            var store = '';
            for (var i = 0; i < json.shoplist.length; i++) {
                store += '<li><a  class="" href="#">' + json.shoplist[i] + '</a></li>';
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
        var bread = ' <li id="brandBread"><a  href="#" >' + e + '<span class="glyphicon glyphicon-remove" ></span></a></li>';
        $(".breadcrumb").append(bread);
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.brandname = e;
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        $().filteritem();
        $("#filter1").hide();

    })
    //店铺
    $("#store").on("click", "a", function () {
        var s = $(this).text();
        var bread1 = ' <li id="storeBread"><a  href="#" >' + s + '<span class="glyphicon glyphicon-remove" ></span></a></li>';
        $(".breadcrumb").append(bread1);

        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.shopname = s;
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        $().filteritem();
        $("#filter2").hide();

    })
}
/*----点击面包屑的大类或小类名称重新加载页面----*/
$.fn.classClick = function () {
    //点击面包屑的大类名称重新加载页面
    $("ol.breadcrumb").on("click", "li a#bigcla", function () {
        var bcla = $(this).text();
        console.log(bcla);
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.classname = bcla;
        obj.propertyname = "";
        var pos = obj.address;
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        //小类名称的颜色全变黑
        $(".propertyName").css({"color": "#3C3C3C"});
        var json=getCondition();
        //重新加载
        $.goodlist(json, pos);

    })
    //点击面包屑的小类名称重新加载页面
    $("ol.breadcrumb").on("click", "li  a#procla", function () {
        var procla = $(this).text();
        var bcla = $(this).parent().prev().text();
        $(this).parent().next().remove();
        console.log(bcla);
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.propertyname=procla;
        obj.itemname="";
        obj.classname = bcla;
        var pos = obj.address;
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        $("#filter1").show();
        $("#filter2").show();
        var json=getCondition();
        //重新加载
        $.goodlist(json, pos);
    })


}
//点击面包屑上的某个品牌然后删除这个品牌，并显示条件中的品牌这一栏//1.21有修改
$.fn.deleteBread = function () {

    $(".breadcrumb").on("click", "#brandBread a", function () {
        //被改变的条件存入cookie
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.brandname = "";
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        $(this).parent("#brandBread").remove();
        $("#filter1").show();
        //调用选品牌或店铺条件加载商品事件
        $().filteritem();

    });
    $(".breadcrumb").on("click", "#storeBread a", function () {
        var jsonStr = $.cookie("condition");
        var obj = JSON.parse(jsonStr);
        obj.shopname = "";
        jsonStr = JSON.stringify(obj);
        $.cookie("condition", jsonStr);
        $(this).parent("#storeBread").remove();
        $("#filter2").show();
        ////调用选品牌或店铺条件加载商品事件
        $().filteritem();

    })

}

//选品牌或店铺条件加载商品
$.fn.filteritem = function () {
    var json=getCondition();
    forAjax2(json, json.address);
}

//ajax请求封装
function forAjax(y, pos) {

    //请求页面
    $.ajax({
        type: "post",
        data: JSON.stringify(y),
         url: "http://192.168.113.14:8080/BSMD/item/item.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            $.fn.goodContent(json, pos);
            $().itemclick();

        }
    })
}
//ajax请求封装(商品，品牌列表，店铺列表重新加载)
function forAjax2(y, pos) {

    //请求页面
    $.ajax({
        type: "post",
        data: JSON.stringify(y),
         url: "http://192.168.113.14:8080/BSMD/item/item.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            $.fn.goodContent(json, pos);
            $().filterContent(json);
            $().itemclick();

        }
    })
}

//拼接筛选条件：品牌和店铺列表
$.fn.filterContent=function (json) {
    //品牌列表加载
    var brand = ''
    for (var i = 0; i < json.brandlist.length; i++) {
        brand += '<li><a  class="" href="#">' + json.brandlist[i] + '</a></li>';
    }
    //店铺列表加载
    var store = '';
    for (var i = 0; i < json.shoplist.length; i++) {
        store += '<li><a  class="" href="#">' + json.shoplist[i] + '</a></li>';

    }
    $("#brand .f_list").html("");
    $("#store .f_list").html("");
    $("#brand .f_list").append(brand);
    $("#store .f_list").append(store);

}

//拼接商品列表
$.fn.goodContent = function (json, pos) {
    var html='<ul class="good_con clearfix">';
    for (var i = 0; i < json.itemlist.list.length; i++) {
        var id = json.itemlist.list[i].itemNo;
        hr = "itemDetial.html?id=" + id;
        html+='<li><div class="listBox clearfix">'
        html+='<div class="listPic"><a  href="'+hr+'" style="width: 200px;height: 200px"><img class="fn_img" width="200" height="200" style="display: block" src="'+json.itemlist.list[i].url+'"></a></div>'
        html+='<div class="discountPrice"><div class="price_cash">';
        html+='<span class="text18 cof pull-left">&yen;'+json.itemlist.list[i].itemSalePrice+'</span></div></div>'
        html+='<div class="listDecri"><a class="text13" href="'+ hr+'">'+ json.itemlist.list[i].itemName+'</a></div>';
        html+= '<div class="goods_button"><div  style="display: inline"><a target="_blank" href="'+hr+'" id="inputcart">查看详情</a></div></div><span class="goods_sell_num ">已售：' + json.itemlist.list[i].itemBynum1 + '</span></li></div>';
    }
    html+='</ul>';
    showPage(json.itemlist.pageSize, json.itemlist.pageIndex);
    $("#goods_list").html("");
    $("#goods_list").append(html);
}
//页码拼接
function showPage (pageSize, pageIndex) {
    //页数小于6
    pageIndex = Number(pageIndex);
    pageSize = Number(pageSize);
    var html = '<li><a class="forword" href="javascript:void(0);" >&laquo;</a></li>';
    if (pageSize <= 6) {
        for (var i = 1; i <= pageSize; i++) {
            if (i == pageIndex) {
                html += '<li><a class="active" href="javascript:void(0);" >'+i+'</a></li>'
            }
            else {
                html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
            }
        }
    } else {
        if (pageIndex <= 4) {
            for (var i = 1; i <= 5; i++) {
                if (i == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + i + '</a></li>'
                } else {
                    html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
                }
            }
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';
        } else if (pageIndex > pageSize - 3) {
            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>';
            for (var i = 4; i >= 0; i--) {
                var p = pageSize - i;
                if (p == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + p + '</a></li>'
                } else {
                    html += '<li><a href="javascript:void(0);">' + p + '</a></li>';
                }
            }

        } else {
            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>'
            html += '<li><a href="javascript:void(0);">' + (pageIndex - 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageIndex - 1 + '</a></li>';
            html += '<li><a class="active" href="javascript:void(0);">' + pageIndex + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 1) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';
        }

    }
    html += ' <li><a class="next" href="#">&raquo;</a></li>';
    $(".pag>.pagination").html(html);

}
/*---页码的跳转---*/
$.fn.pageclick = function () {
    $(".pagination").on("click", "a", function () {
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if($(this).hasClass("next")){

            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if($(this).prev().hasClass("forword")){
                return;
            }
            var json=getCondition(pageIndex+1);
            forAjax(json, json.address);

        }else if($(this).hasClass("forword")){
            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            var json=getCondition(pageIndex-1);
            forAjax(json, json.address);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            var json=getCondition(pageIndex);

            forAjax(json, json.address);
        }

    })
}
//获得当前的判断条件
function getCondition(pageIndex){

    var json = {};
    //被改变的条件存入cookie
    var jsonStr = $.cookie("condition");
    var obj = JSON.parse(jsonStr);
    console.log("条件cookie" + obj.address);

    json.pagecount = 8;
    if(pageIndex==null||pageIndex==""||pageIndex==false){
        pageIndex=1;
    }
    json.pageindex = Number(pageIndex);
    json.address = obj.address;
    if (obj.brandname != null && obj.brandname != "") {
        json.brandname = obj.brandname;
    }
    if (obj.itemname != null && obj.itemname != "") {
        json.itemname = obj.itemname;
    }
    if (obj.classname != null && obj.classname != "") {
        json.classname = obj.classname;
    }
    if(obj.propertyname!=null&&obj.propertyname!=""){
        json.propertyname=obj.propertyname;
    }
    if(obj.orderstyle!=null&&obj.orderstyle!=""){
        json.orderstyle=obj.orderstyle;
    }
    if(obj.ordercondition!=null&&obj.ordercondition!=""){
        json.ordercondition=obj.ordercondition;
    }
    if(obj.shopname!=null&&obj.shopname!=""){
        json.shopname=obj.shopname;
    }
    return json;
}

//点击筛选条件的“更多”
$.fn.moreclick = function () {
    var icon1 = "glyphicon glyphicon-chevron-up";
    var icon2 = "glyphicon glyphicon-chevron-down";
    $(".f_ext").on("click", function () {
        var x=$(this).prev();
        if($(x).css("height")=="36px"){
            $(x).css({"height":"72px"});
            $(this).children("span").text("收起");
        }
        else{
            $(x).css({"height":"36px"});
            $(this).children("span").text("更多");
        }
        var issue = $(this).children("i");
        if (issue.hasClass(icon1)) {
            issue.removeClass(icon1);
            issue.addClass(icon2);
        } else {
            issue.removeClass(icon2);
            issue.addClass(icon1);
        }

    })


}



$(function () {
    //顶部地址从cookie中获取
    checkCookie();
    loadname();
    $.Menulist();
    $(".f_more").moreclick();
    $.fn.classClick();//点击面包屑中的大类或小类
});

//点击商品应跳转至商品详情界面，需要信息：+地址+商品编号，地址从顶部获取，编号从商品div的data-item获取
$.fn.itemclick = function () {
    $("#goods_list").on("click", "a", function () {
        var x = $(".goods_div").attr("data-item");
        if (x != "") {
            href = 'itemDetial.html?id=' + x;
        }
    })
}



