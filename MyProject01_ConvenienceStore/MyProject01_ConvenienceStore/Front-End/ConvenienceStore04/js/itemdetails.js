/**
 * Created by hp on 2015/11/2.
 */
$(document).ready(function () {
    loadname();
    $.Menulist();
    $.firstTime();//首次加载商品详情
    $().otherpageapos();
    //顶部地址改变
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick();

});
$.firstTime = function () {
    var reg = getUrlParam("id");
    var pos = getposition();
    $.loadDetail(reg, pos[0]);
    ///规格
    $.loadStd();
    //评论
    $.loadCom();
}
//选择小区完成
$.fn.villclick = function () {
//t顶部
    $("#vil").on("click", "a", function () {
        //取得选择的小区
        var e = $(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name", e);
        $(".hd-prochg").hide();
        //拼装写入cookie
        var pos = $("#cit").attr("data-name") + $("#ear").attr("data-name") + $("#vil").attr("data-name");
        var post = $("#cit").attr("data-name") + "-" + $("#ear").attr("data-name") + "-" + $("#vil").attr("data-name");
        $("#cityname").attr("data-positon", pos);
        $("#cityname").attr("data-cityname", post);
        $("#cityname").val(pos);
        //将修改的地址存入cookie
        x = [$("#cit").attr("data-name"), $("#ear").attr("data-name"), $("#vil").attr("data-name")];
        $.cookie("proeare", x, {expires: 7});

        var reg = getUrlParam("id");
        var pos = $("#cityname").attr("data-cityname");

        //------------------------更新页面-------------------------------//
        $.loadDetailAgain(reg, pos);
    })
}
//点击加入购物车
function inpucart() {
    $(".single_top").on("click", "#inputcart", function () {
        var itemNo = $("#good_id").attr("data-id");
        var number = $(".spinner.value").val();
        var itemSize = $(".tagsInBox .selected").text();
        console.log(number + itemNo);
        var username=isload();
        if(username!=null&&username!=""){

        var x = {"itemlist": [{"custNo": username, "itemNo": itemNo, "num": number, "itemSize": itemSize}]};
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            dataType: "json",
             url: "http://192.168.113.14:8080/BSMD/car/addToCar.do",
            success: function (data) {
                console.log(data);
                cartnum(username);
            }
        })
        }
    })

}

//点击立即购买
function buynow() {


}


//点击收藏
function collect() {
    $(".btnform").on("click", ".cfont", function (e) {
        e.preventDefault();
        var username=isload();
        if(username!=null&&username!=""){
            var itemNo = $("#good_id").attr("data-id");
            var info = {"custno": username, "itemNo": itemNo};
            $.ajax({
                type: "post",
                 url: "http://192.168.113.14:8080/BSMD/insertCollection.do",
                data: JSON.stringify(info),
                datatype: "json",
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    if (data.code == "success") {
                        $(".cfont").append('<span class="coll_success">收藏成功~</span>');
                        $(".cfont .coll_success").delay(3000).fadeOut();
                    } else if(data.code == "error") {
                        $(".cfont").append('<span class="coll_success">已收藏</span>');
                        $(".cfont .coll_success").delay(3000).fadeOut();
                    }
                }
            });
        }

    });
}

//加载规格参数
$.loadStd = function () {
    var reg = getUrlParam("id");
    var pos = getposition();
    var info = {"itemno": reg, "address": pos[0]};
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/detail.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            var html = '<img src="' + 'Android/image/guige.jpg' + '">';
            $(".standard").append(html);
        }
    });
}


//版本选中
function tagsInBox() {
    $(".tagsInBox").on("click", "li", function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    })
}
//选择不同版本
function selectPrice(json) {
    $(".tagsInBox").on("click", "li", function () {
        var price;
        var len = json.detail.itemUnits.length;
        for (var i = 0; i < len; i++) {
            var price = $(this).attr("data-price");
            $(".dprice .m_5").html(price);
            break;
        }
    });
}

//加载商品评论
$.loadCom = function () {
    var reg = getUrlParam("id");
    var info = {"itemno": "10001", "pageindex": "1", "pagecount": "1"};
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/comment.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            var html;
            if (json.comments.pageSize == 0) {   // 没有评论的情况
                html = '<p class="nosend">暂时没有评论</p>';
                $(".comment_info").append(html);
            } else {                             //有评论
                html = $.commentContent(json);
                $(".comment_info").append(html);
                $.breakPage(json.comments.pageSize, json.comments.pageIndex);
                $.selectPage();
            }

        }
    });
}
//商品评论分页
$.breakPage = function (pageSize, pageIndex) {
    pageIndex = Number(pageIndex);
    pageSize = Number(pageSize);
    var html = '<li><a class="forward" href="javascript:void(0);">&laquo;</a></li>';
    if (pageSize <= 6) {
        for (var i = 1; i <= pageSize; i++) {
            if (i == pageIndex) {
                html += '<li><a class="active" href="javascript:void(0);">' + i + '</a></li>';
            }
            else {
                html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
            }
        }
    }
    else {
        if (pageIndex <= 3) {
            for (var i = 1; i <= 5; i++) {
                if (i == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + i + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
                }
            }
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';
        }else if (pageIndex > pageSize - 3) {
            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>';
            for (var i = 4; i >= 0; i--) {
                var p = pageSize - i;
                if (p == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + p + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0);" >' + p + '</a></li>';
                }
            }
        } else if(pageIndex){

        }else {
            html += '<li><a href="javascript:void(0);">1</a></li><li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex - 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex - 1) + '</a></li>';
            html += '<li><a class="active" href="javascript:void(0);">' + pageIndex + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 1) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';
        }
    }
    html += '<li><a class="next" href="javascript:void(0);">&raquo;</a></li>';
    $(".pagination").html("");
    $(".pagination").append(html);
}
//页码的跳转
$.selectPage = function (json) {
    $(".pagination").on("click", "a", function () {
        var reg = "10001";
        var pageCount = "1";
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if ($(this).hasClass("next")) {
            var page = $(".pagination").find(".active");
            var pageIndex = Number($($(page)[0]).text());
            if ($(this).prev().hasClass("forward")) {
                return;
            }
            forAjax(reg, pageIndex + 1, pageCount);

        } else if ($(this).hasClass("forward")) {
            var page = $(".pagination").find(".active");
            var pageIndex = Number($($(page)[0]).text());
            if (pageIndex == 1) {
                return;
            }
            forAjax(reg, pageIndex - 1, pageCount);
        }
        else {
            var pageIndex = Number($(this).html());
            forAjax(reg, pageIndex, pageCount);
        }
    });

}
//ajax请求封装
function forAjax(reg, pageIndex, pageCount) {

    var info = {"itemno": reg, "pageindex": pageIndex, "pagecount": pageCount};
    $.ajax({
        type: "post",
        data: JSON.stringify(info),
         url: "http://192.168.113.14:8080/BSMD/item/comment.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            $(".comment_info").html('');
            var html = $.commentContent(json);
            $(".comment_info").append(html);
            $.breakPage(json.comments.pageSize, json.comments.pageIndex);
        }
    })
}
//请求评论内容
$.commentContent = function (json) {
    var html = '';
    html += '<div class="userComment"><p><span class="glyphicon glyphicon-list com"></span></span>';
    html += '<span class="all_tag"> 全部评论</span><span class="comNum"> (' + json.comments.dataCount + ')</span></p>';
    var len = json.comments.list.length;
    for (var i = 0; i < len; i++) {
        html += '<div class="comment"><div class="user"><p class="user_com">用户：<span class="username">' + json.comments.list[i].custNo + '</span>';
        html += '<span class="com_date">评论日期：<span class="cdate">' + json.comments.list[i].date + '</span></span></p></div>';
        html += '<div class="com_content">' + json.comments.list[i].comment + '</div></div>';
    }
    return html;
}

//加载商品详情
$.loadDetail = function (reg, pos) {
    var info = {"itemno": reg, "address": pos};
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/detail.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            var html = '';
            //面包屑start
            html += '<div><ol class="breadcrumb">';
            html += '<li><a href="index.html">首页</a></li>';
            var bigclass = json.detail.className;
            html += '<li><a href="itemlist.html?bigclass=' + bigclass + '">' + bigclass + '</a></li>';
            var subd = json.detail.propertyName;
            html += '<li><a href="itemlist.html?bigclass=' + bigclass + '&propertyName=' + subd +  '">' + subd + '</a></li>';
            html += '<li class="active">' + json.detail.itemName + '</li></ol></div>';
            //面包屑end
            html += '<div class="single_right"><div class="detail_left"><div class="con-FangDa" id="fangdajing"><div class="con-fangDaIMg">' +
                '<img src="' + json.imageTop[0] + '"><div class="magnifyingBegin"></div><div class="magnifyingShow">' +
                '<img src="' + json.imageTop[0] + '">' + '</div></div><ul class="con-FangDa-ImgList">';

            //修改，data-获取数量的也有修改
            var lg = json.imageTop.length;
            for (var i = 0; i < lg; i++) {
                if(i==0){
                    html+='<li class="active"><img src="' + json.imageTop[i] + '"data-bigimg="' + json.imageTop[i] + '">';
                }else {
                    html+='<li><img src="' + json.imageTop[i] + '"data-bigimg="' + json.imageTop[i] + '">';
                }
            }
            //
            html += '</ul></div></div>';
            html += '<div class="detail_middle"><div class="desc1 span_3_of_2" id="good_id" data-id="' + json.detail.itemNo + '">';
            html += '<h3>' + json.detail.itemName + '</h3>';
            html += '<div class="detail"><p class="dprice"><span class="sfont">价格：</span>';
            html += '<span class="m_5">' + json.detail.itemSalePrice + '</span></p>';
            html += '<p class="support"><span class="sfont">支持</span><span class="scolor">货到付款</span><span class="jf">送积分 ' + json.detail.eshopIntegral + '</span></p></div>';
            html += '<div class="sale_amt"><p><span class="sfont">累计销量：</span><span class="amt">' + json.detail.itemBynum1 + '</span></p></div>';
            html += '<div class="buy"><div class="buychoose"><dl class="pProps"id="choosenum">';
            html += '<dt>数量：</dt><dd id="choose-num">';
            html += '<input type="text" class="spinner"/></dl></div>';
            html += '<div class="price_elect"><ul class="tagsInBox">';
            var len = json.detail.itemUnits.length;
            for (var i = 0; i < len; i++) {
                var s=json.detail.itemUnits[i].itemSize;
                html += ' <li data-price="' + json.detail.itemUnits[i].itemSalePrice;
                if (i == 0) {
                    html += '"class="selected">' + s + '</li> ';
                } else {
                    html += '">' + s + '</li> ';
                }

            }

            html += '</ul></div><div class="clearfix"></div>';
            html += '<p class="nosend">抱歉，当前区域不在配送范围内</p><div class="btnform"><form>';
            html += '<button class="gwc" id="inputcart" type="button" title="">加入购物车</button>';
            html += '<span class="glyphicon glyphicon-plus jsc"><span class="cfont">收藏</span></span></form></div>';
            html += '<div class="zf"><p><span>支付方式：</span></p>';
            html += '<p class="bz"><span>保障</span><a href="#"><span class="glyphicon glyphicon-ok-circle"></span>正品保障</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span>';
            html += '售后服务</a><a href="#"></span><span class="glyphicon glyphicon-ok-circle"></span> 增票服务</a></p></div></div></div></div>';
            //暂定添加右侧的广告栏，若不需要删除注释之间的html
            html += '<div class="detail_right">';//<div class="groom"><p>商品推荐</p></div>
            html += '<div class="image_adv"><img src="images/1.jpg"><p>稻香村 凤梨酥 400g/盒</p><p class="gprice">￥30.50</p></div>';
            html += '<div class="image_adv"><img src="images/2.jpg"><p>紫薯粉皮 500g/袋</p><p class="gprice">￥12.90</p>';
            html += '</div>';
            //若不需要删除注释之间的html
            $(".single_top").append(html);
            tagsInBox();
            selectPrice(json);
            collect();
            var htmli = '';
            var len = json.imageDetail.length;
            for (var i = 0; i < len; i++) {
                htmli += '<img src="' + json.imageDetail[i] + '"><br>';
            }
            $(".imageDetail").append(htmli);
            $(".spinner").spinner({});
            inpucart();
            $("#fangdajing").magnifying();

        }
    });
}
//顶部地址改变后，判断有无货
$.loadDetailAgain = function (reg, pos) {
    var info = {"itemno": reg, "address": pos, "change": "1"};
    $.ajax({
        type: "post",
         url: "http://192.168.113.14:8080/BSMD/item/detail.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            if (json.statue == "N") {    //    无货
                $(".btnform").css("visibility", "hidden");
                $(".nosend").css("visibility", "visible");
            } else {       //有货
                $(".nosend").css("visibility", "hidden");
                $(".btnform").css("visibility", "visible");
            }
        }
    })

}


$.fn.magnifying = function(){
    var that = $(this),
        $imgCon = that.find('.con-fangDaIMg'),//正常图片容器
        $Img = $imgCon.find('img'),//正常图片，还有放大图片集合
        $Drag = that.find('.magnifyingBegin'),//拖动滑动容器
        $show = that.find('.magnifyingShow'),//放大镜显示区域
        $showIMg = $show.find('img'),//放大镜图片
        $ImgList = that.find('.con-FangDa-ImgList > li >img'),
        multiple = $show.width()/$Drag.width();

    $imgCon.mousemove(function(e){
        $Drag.css('display','block');
        $show.css('display','block');
        //获取坐标的两种方法
        // var iX = e.clientX - this.offsetLeft - $Drag.width()/2,
        // 	iY = e.clientY - this.offsetTop - $Drag.height()/2,
        var iX = e.pageX - $(this).offset().left - $Drag.width()/2,
            iY = e.pageY - $(this).offset().top - $Drag.height()/2,
            MaxX = $imgCon.width()-$Drag.width(),
            MaxY = $imgCon.height()-$Drag.height();

        /*这一部分可代替下面部分，判断最大最小值
         var DX = iX < MaxX ? iX > 0 ? iX : 0 : MaxX,
         DY = iY < MaxY ? iY > 0 ? iY : 0 : MaxY;
         $Drag.css({left:DX+'px',top:DY+'px'});
         $showIMg.css({marginLeft:-3*DX+'px',marginTop:-3*DY+'px'});*/

        iX = iX > 0 ? iX : 0;
        iX = iX < MaxX ? iX : MaxX;
        iY = iY > 0 ? iY : 0;
        iY = iY < MaxY ? iY : MaxY;
        $Drag.css({left:iX+'px',top:iY+'px'});
        $showIMg.css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
        //return false;
    });
    $imgCon.mouseout(function(){
        $Drag.css('display','none');
        $show.css('display','none');
    });

    $ImgList.click(function(){
        var NowSrc = $(this).data('bigimg');
        $Img.attr('src',NowSrc);
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
}

