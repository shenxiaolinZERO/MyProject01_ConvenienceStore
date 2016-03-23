/**
 * Created by hp on 2015/11/2.
 */


$(document).ready(function () {
    $.loadDetail();
    //$.loadStandard();
    //顶部地址改变
    $().poschange();
    $().otherpageapos();
});


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

/*$.loadDetail = function () {

 $.ajax({
 type: "post",
 url: "", data: {"": ""},
 dataType: "json",
 success: function (data) {
 json = data;
 var html = '';
 html += '<div class="single_right"><div class="col-lg-4"><div class="images_3_of_2"><ul id="etalage">';
 html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.detail.images[0].url + '"class="img-responsive"/>';//???
 html += '<img class="etalage_source_image" src="' + json.detail.images[0].url + '" class="img-responsive" title="商品详情"/></a></li>';//???
 html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.detail.images[1].url + '"class="img-responsive"/>';//???
 html += '<img class="etalage_source_image" src="' + json.detail.images[1].url + '" class="img-responsive" title="商品详情"/></a></li></ul>';//???
 html += '<div class="clearfix"></div></div></div></div>';
 html += '<div class="col-lg-8"><div class="desc1 span_3_of_2">';
 html += '<h1>' + json.detail.itemName + '</h1>';
 html += '<div class="detail"><p><span class="sfont">价格：</span>';
 html += '<span class="m_5">&yen;' + json.detail.itemSalePrice + '</span>';
 html += '<span class="sfont">评价：</span>' + '';

 $(".single_top").append(html);
 }
 })
 }*/

$.loadDetail = function () {

    var x={"itemno":"10001","address":"福州-台江区-幸福小区"};
    $.ajax({
        type: "post",
        url: "http://192.168.199.242:8080/BSMD/item/detail.do",
        data:JSON.stringify(x),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data
            console.log(json);
            var html = '';
            html += '<div class="single_right"><div class="col-lg-4"><div class="images_3_of_2"><ul id="etalage">';
            html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.detail.images[0].url + '"class="img-responsive"/>';//???
            html += '<img class="etalage_source_image" src="' + json.detail.images[0].url + '" class="img-responsive" title="商品详情"/></a></li>';//???
            html += '<li><a href="#"><img class="etalage_thumb_image"src="' + json.detail.images[1].url + '"class="img-responsive"/>';//???
            html += '<img class="etalage_source_image" src="' + json.detail.images[1].url + '" class="img-responsive" title="商品详情"/></a></li></ul>';//???
            html += '<div class="clearfix"></div></div></div></div>';
            html += '<div class="col-lg-8"><div class="desc1 span_3_of_2">';
            html += '<h1>' + json.detail.itemName + '</h1>';
            html += '<div class="detail"><p><span class="sfont">价格：</span>';
            html += '<span class="m_5">' + json.detail.itemSalePrice + '</span>';
            html += '<span class="sfont">评价：</span>' + '';
            html += '<span class="sfont">累计销量：</span>' + json.detail.itemBynum1 + '</p>';
            html += '<p><span class="sfont">支持</span><span class="sred">货到付款</span><span><a href="#" class="jf">送积分</a></span></p></div>';
            html += '<div class="buy"><div class="buychoose"><dl class="pProps"id="choosenum">';
            html += '<dt>数量：</dt><dd id="choose-num">';
            html += '<input type="text" class="spinnerExample"/>';
            html += '<span class="sfont">库存' + '  ' + '件</span></dd></dl></div>';
            html += '<div class="btnform"><form><input type="submit"value="立即购买"title="">';
            html += '<button class="gwc" type="button" title="">加入购物车</button></form>';
            html += '<div class="sc"><span class="jsc">+</span><a href="#">收藏</a></div></div>';
            html += '<div class="zf"><p><span>支付方式：</span></p>';
            html += '<p class="bz"><a href="#">保障</a><a href="#"><span class="glyphicon glyphicon-ok-circle"></span>正品保障</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span>';
            html += '售后服务</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span> 增票服务</a></p></div></div></div></div>';
            $(".single_top").append(html);
            $('.flexslider').flexslider({
                animation: "slide",
                start: function (slider) {
                    $('body').removeClass('loading');
                }
            });
            $(".spinnerExample").spinner({});
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
        }
    });
}


$.loadStandard = function () {
    var json = {
        "detail": {
            "itemNo": "10001",
            "itemName": "j机械键盘",
            "barcode": "10001",
            "itemBynum1": "1650.000000",
            "itemSalePrice": "56.500000",
            "brandName": "雷柏",
            "itemArea": "福建福州",
            "itemFactory": "xxxxxx",
            "eshopIntegral": 12,
            "images": [
                {
                    "imageNo": "1",
                    "itemNo": "10001",
                    "barcode": "10001",
                    "imageClass": 1,
                    "url": "http://192.168.199.241:8080/BSMD/Android/image/index_img_i4.png"
                },
                {
                    "imageNo": "2",
                    "itemNo": "10001",
                    "barcode": "10001",
                    "imageClass": 2,
                    "url": "http://192.168.199.241:8080/BSMD/Android/image/index_img_i4.png"
                }
            ],
            "url": null,
            "itemUnits": [
                {
                    "itemSize": "豪华版",
                    "itemPack": 1,
                    "itemUnitNo": "个",
                    "itemSalePrice": "56.500000"
                },
                {
                    "itemSize": "标准版",
                    "itemPack": 2,
                    "itemUnitNo": "个",
                    "itemSalePrice": "46.500000"
                }
            ],
            "itemStocks": [
                {
                    "stockQty": 562,
                    "shopName": "万达第一店"
                }
            ]
        }
    };
    var html = '';
    html += '<div class="tab-pane fade in active" id="introduct">';
    html += '<table class="tb1"><thead>规格参数</thead><tbody>';
    var length = 0;
    for (var temp in json.detail) {
        length++;
    }
    length = length - 5;
    for (var i = 0; i < length; i++) {
        //一行三列
    }

}