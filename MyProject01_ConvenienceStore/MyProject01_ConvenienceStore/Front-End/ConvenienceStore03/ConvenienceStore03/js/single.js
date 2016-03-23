/**
 * Created by hp on 2015/11/2.
 */


$(document).ready(function () {
    $.firstTime();//首次加载商品详情
    loadname();
    cartnum();
    //$.loadStandard();
    //顶部地址改变
    // adChange();
    selectCom();
    $().poschange();
    $().otherpageapos();
});
$.firstTime = function () {
    var reg = getUrlParam("id");
    var pos = getUrlParam("pos");
    $.loadDetail(reg, pos);
}

//选择小区完成
$.fn.villclick = function () {
    $("#village").on("click", "a", function () {
        //取得选择的小区
        var e = $(this).text();
        $("#tabvillage>a").text(e);
        $("#village").attr("data-name", e);
        // var pos=$("#curSelect").attr("data-position");
        // pos=pos+e;
        // $("#curSelect").attr("data-position",pos);
        var pos = $("#city").attr("data-name") + $("#eare").attr("data-name") + $("#village").attr("data-name");
        $("#curSelect").val(pos);
        $(".selectpro").hide();
    })
//t顶部
    $("#vil").on("click", "a", function () {
        //取得选择的小区
        var e = $(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name", e);
        //var pos=$("#cityname").attr("data-position");
        //pos=pos+e;
        //$("#cityname").attr("data-position",pos);
        //$("#cityname").val(pos);
        $(".hd-prochg").hide();
        var pos = $("#cit").attr("data-name") + $("#ear").attr("data-name") + $("#vil").attr("data-name");
        var post = $("#cit").attr("data-name") + "-" + $("#ear").attr("data-name") + "-" + $("#vil").attr("data-name");
        $("#cityname").attr("data-positon", pos);
        $("#cityname").attr("data-cityname", post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x = [$("#cit").attr("data-name"), $("#ear").attr("data-name"), $("#vil").attr("data-name")];
        $.cookie("proeare", x, {expires: 7});
        ///添加
        $(".single_top").html('');
        var reg = getUrlParam("id");
        var pos = $("#cityname").data("cityname");
        $.loadDetail(reg, pos);
    })
}


//点击加入购物车
function inpucart() {
    $(".single_top").on("click", "#inputcart", function () {
        var itemNo = $("#good_id").attr("data-id");
        var number = $(".spinner.value").val();
        var itemSize = $(".tagsInBox .select").text();
        console.log(number + itemNo);
        var x = {"custNo": "cust01", "itemNo": "03", "number": number, "itemSize": itemSize};
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            dataType: "json",
            url: "http://192.168.199.241:8080/BSMD/car/addToCar.do",
            success: function (data) {
                console.log(data);
                cartnum();
            }
        })
    })
//点击立即购买
}
function buynow() {


}


//点击收藏
function collect() {
    $(".single_top").on("click", ".collect", function (e) {
        e.preventDefault();
        //$(".collect").append('<span class="badge">1</span>');
        var itemNo = $("#good_id").attr("data-id");
        var info = {"username": "hh", "itemNo":"004"};
        $.ajax({
            type: "post",
            url: "http://192.168.199.233:8080/BSMD/insertCollection.do",
            data: JSON.stringify(info),
            datatype: "json",
            header: {"Content-type": "application/json", "Accept": "application/json"},
            success: function (data) {
                if(data.code=="success"){
                    $(".collect").append('<span class="coll_success">收藏成功~</span>');
                    $(".collect .coll_success").delay(5000).fadeOut();
                }else{
                    //modShow();
                }
            }
        });
    });
}
//显示模态框
//function modShow(){
//    $("#myModal").modal('show');
//}
function addBuynum() {
    var s = $("#buycount").val();
    if (!numcheck(s)) {
        s = 1;
    }
    s = Number(s);
    s += 1;
    $("#buycount").val(s);
    return false;
}
function reductBuynum() {
    var s = $("#buycount").val();
    if (!numcheck(s)) {
        $("buycount").val(1);
        s = 1;
    }
    s = Number(s);
    if (s == 1) {
        return;
    } else {
        s -= 1;
    }
    $("#buycount").val(s);
    return false;
}
function numcheck(ss) {
    var re = /^\+?[1-9][0-9]*$/;
    var stem = ss.indexOf(".");
    if (re.test(ss) && stem < 0) {
        return true;
    }
    return false;
}
function tagsInBox() {
    $(".tagsInBox").on("click", "li", function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    })
}
//选择不同版本
function selectPrice() {
    $(".tagsInBox").on("click", "li", function () {
        var price;
        if ($(this).text() == "豪华版") {
            price = $(".tagsInBox li:eq(0)").data('price');

        } else {
            price = $(".tagsInBox li:eq(1)").data('price');
        }
        $(".dprice .m_5").html(price);
    });
}
//点击评论
function selectCom() {
    $("#serviceTab li:eq(3)").on("click", function () {
        $.loadCom();
    });
}
//加载商品评论
$.loadCom = function () {
    var reg = getUrlParam("id");
    var pos = getUrlParam("pos");

    //要请求什么？？？

    var info = {"itemNo": id, "address": pos};
    $.ajax({
        type: "post",
        url: "http://192.168.199.242:8080/BSMD/item/comment.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            var html = '';
            html += '<p><span class="com">全部评论</span><span class="comNum">(' + json.counts + ')</span></p>';
            for (var i = 0; i < json.comments.length; i++) {
                html += '<div class="comment"><div class="comment_info"><div class="user">';
                html += '<p class="user_com">用户<span class="username">' + json.comments[i].custName + '</span><span class="com_date">评论日期：<span class="cdate">' + json.comments[i].date + '</span></span></p></div>';
                html += '<div class="com_content">' + json.comments[i].comment + '</div></div></div>';
            }
            $(".userComment").append(html);
        }
    });
}
//加载商品详情
$.loadDetail = function (reg, pos) {
    //$.cookie("proeare");
    //var x={"itemno":reg,"address":"福州-台江区-幸福小区"};
    var info = {"itemno": reg, "address": pos};
    $.ajax({
        type: "post",
        url: "http://192.168.199.242:8080/BSMD/item/detail.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data
            console.log(json);
            var html = '';
            html += '<div class="single_right"><div class="col-lg-4"><div class="images_3_of_2"><ul id="etalage">';
            html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.imageTop[0] + '"class="img-responsive"/>';//???
            html += '<img class="etalage_source_image" src="' + json.imageTop[0] + '" class="img-responsive" title="商品详情"/></a></li>';//???
            html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.imageTop[1] + '"class="img-responsive"/>';//???
            html += '<img class="etalage_source_image" src="' + json.imageTop[1] + '" class="img-responsive" title="商品详情"/></a></li>';//???
            html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.imageTop[2] + '"class="img-responsive"/>';//???
            html += '<img class="etalage_source_image" src="' + json.imageTop[2] + '" class="img-responsive" title="商品详情"/></a></li></ul>';//???
            html += '<div class="clearfix"></div></div></div></div>';
            html += '<div class="col-lg-8"><div class="desc1 span_3_of_2" id="good_id" data-id="' + json.detail.itemNo + '">';
            html += '<h3>' + json.detail.itemName + '</h3>';
            html += '<div class="detail"><p class="dprice"><span class="sfont">价格：</span>';
            html += '<span class="m_5">' + json.detail.itemSalePrice + '</span></p>';
            html += '<p class="support"><span class="sfont">支持</span><span class="sblue">货到付款</span><span><a href="#" class="jf">送积分</a></span></p></div>';
            html += '<div class="sale_amt"><p><span class="sfont">累计销量：</span><span class="amt">' + json.detail.itemBynum1 + '</span></p></div>';
            html += '<div class="buy"><div class="buychoose"><dl class="pProps"id="choosenum">';
            html += '<dt>数量：</dt><dd id="choose-num">';
            html += '<input type="text" class="spinner"/></dl></div>';
            html += '<div class="price_elect"><ul class="tagsInBox"><li data-price="' + json.detail.itemUnits[0].itemSalePrice + '"' + 'class="selected">'
            html += '豪华版</li> <li data-price="' + json.detail.itemUnits[1].itemSalePrice + '">' + '标准版</li> </ul></div><div class="clearfix"></div>';
            html += '<div class="btnform"><form>';
            html += '<button class="gwc" id="inputcart" type="button" title="">加入购物车</button>';
            html += '<span class="jsc">+</span><a href="#" class="collect">收藏</a></form></div>';
            html += '<div class="zf"><p><span>支付方式：</span></p>';
            html += '<p class="bz"><a href="#">保障</a><a href="#"><span class="glyphicon glyphicon-ok-circle"></span>正品保障</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span>';
            html += '售后服务</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span> 增票服务</a></p></div></div></div></div>';
            $(".single_top").append(html);
            tagsInBox();
            selectPrice();
            collect();
            var htmli = '';
            for (var i = 0; i < json.imageDetail.length; i++) {
                htmli += '<img src="' + json.imageDetail[i] + '"><br>';
            }
            $(".imageDetail").append(htmli);
            $('.flexslider').flexslider({
                animation: "slide",
                start: function (slider) {
                    $('body').removeClass('loading');
                }
            });
            $(".spinner").spinner({});
            $("#etalage").etalage({
                thumb_image_width: 300,
                thumb_image_height: 400,
                source_image_width: 900,
                source_image_height: 1200,
                show_hint: true,
                click_callback: function (image_anchor, instance_id) {
                    alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
                }
            });
            inpucart();
        }
    });
}
