/**
 * Created by hp on 2015/11/13.
 */


$(document).ready(function () {
    isload();
    checkCookie()

});
function checkCookie() {
    var proeare = getposition();
    $("#cityname").attr("value", proeare[1]);
    $("#cityname").attr("data-cityname", proeare[0]);
    loadname();
    //商品搜索
    $("#searchitem").mysearch();
    //顶部地址改变
    $().otherpageapos();
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick();
    $.Menulist();
    //请求商品列表
    eg.loadOrder(1, -1);
    orderSelect();
    getUserVoucher();
    eg.collapse();
    eg.eliminate();
    eg.changePwd();
    eg.modifyPwd();
    return;
}

var eg = {};

//解决左侧菜单无法重复点击问题
eg.eliminate = function () {
    $("#order ul li").click(function () {
        $("#order ul li").removeClass('active');
        $("#order ul li").tab('hide');
        $(this).addClass('active');
        $(this).tab('show');
    });
};
eg.hoverChange = function () {
    $(".order_tcontent").on("mouseenter", ".order_table", function () {
        $(this).css("border", "1px solid #A4A4A4");
    });
    $(".order_tcontent").on("mouseleave", ".order_table", function () {
        $(this).css("border", "1px solid #eee");
    });
};

/****************菜单折叠********************/
eg.collapse = function () {
    var icon1 = "glyphicon glyphicon-chevron-up";
    var icon2 = "glyphicon glyphicon-chevron-down";
    $("#order>li").click(function () {
        var issue = $(this).children("span");
        if (issue.hasClass(icon1)) {
            issue.removeClass(icon1);
            issue.addClass(icon2);
        } else {
            issue.removeClass(icon2);
            issue.addClass(icon1);
        }
    });
};
/***********************************我的订单***************************************/
//订单内容
function orderContent(json) {
    var html = '';
    var rep = json.orderPage;
    var len = rep.list.length;
    for (var i = 0; i < len; i++) {
        var temp = rep.list[i];
        html += '<table class="order_table" data-id="'+temp.orderInfo.orderNo+'"><tbody>';
        //尝试修改
        html += '<tr class="order_table_header"><td colspan="7"><div class="order_info"><span class="no">';
        html += '订单编号：' + temp.orderInfo.orderNo;
        html += '<span class="deal_time">成交时间：';
        html += temp.orderInfo.createDateString + '</span></span></div></td></tr>';
        var num = temp.itemList.length;
        for (var j = 0; j < num; j++) {
            html += '<tr class="order_table_item last"><td class="goods">';
            html += '<a href="itemDetial.html?id='+temp.itemList[j].itemNo+'" target="_blank">' +
                '<img src="' + temp.itemList[j].item.url + '"' + 'alt="商品详情"></a>';//跳转至商品详情页面
            html += '<div class="desc"><p>';
            html += '<a href="itemDetial.html?id='+temp.itemList[j].itemNo+'" target="_blank">' + temp.itemList[j].item.itemName + '</p>';
            html += '</div></td>';
            html += '<td class="sprice"><span>' + temp.itemList[j].realPrice + '</span></td>';
            html += '<td class="quantity">' + temp.orderInfo.itemNum + '</td>';
            var s = temp.orderInfo.orderStatu;
            html += '<td class="aftersale"><ul><li>';
            if(s==3){
                html+='<a class="return order-link" data-orderSn="'+temp.itemList[j].orderSn+
                    '" data-id="'+temp.orderInfo.orderNo+'" " data-toggle="modal" data-target="#returnModal">退款/退货</a></li>' ;
            }
            html+= '<li><a class="order-link"  href="#">申请维权</a></li></ul></td>';
            if(j==0){

                html += '<td class="rtotal" rowspan="' + num;
                html += '"><span class="total_price">' + temp.orderInfo.totalAmt + '</span>';
                html += '<p><span>' + '</span></p></td>';
                html += '<td class="status" rowspan="' + num + '"><p>';
                //判断状态
                if (s == 0) {
                    html += "待 付 款<br/>(请尽快付款)";
                } else if (s == 1) {
                    html += '待 接 单<br/>(等待商家确认订单)';
                } else if (s == 2) {
                    html += "待 收 货<br/>(商家已确认订单)";
                } else if (s == 3) {
                    html += "已 完 成<br/>(订单完成)";
                } else if (s == 4) {
                    html += "已 取 消<br/>(交易被关闭)";
                }
                html +='</p></td>';
                html += '<td class="other" rowspan="' + num + '">';
                if (s <=2) {
                    html += '<p class="order-op"><a data-id="'+temp.orderInfo.orderNo+'" data-toggle="modal" data-target="#deletemodle" class="cancleOrder" href="">取消订单</a></p>';
                    html += '<p class="order-op"><a data-id="'+temp.orderInfo.orderNo+'" data-toggle="popover" data-placement="top" data-content="商家电话：123145432" ' +
                        'class="cancleOrder" href="">联系卖家</a></p>';
                }
                if (s >= 3) {
                    html += '<p class="order-op"><a data-id="'+temp.orderInfo.orderNo+'"  data-toggle="modal" data-target="#deletemodle"  class="deleteOrder" href="">删除订单</a></p>';
                    html += '<p class="order-op"><a data-id="'+temp.orderInfo.orderNo+'"  data-toggle="popover" data-placement="top" data-content="商家电话：123145432" ' +
                        ' class="cancleOrder" href="">联系卖家</a></p>';
                }
                html += '</td></tr>';
            }

        }
    }
    html+='</tbody>';
    return html;
}
//取消和删除订单
function cancelOrder(){
    //取消订单
    $(".cancleOrder").on("click",function(){

        var t=$(this);
        var orderNo=$(this).attr("data-id");
        $("#deletemodle .modal-body").html("<span style='font-size: 14px'>你确定要取消这笔订单吗？</span>");
        if(orderNo!=null){
            $("#deletemodle .btn-primary").one("click",function(){
                $("#deletemodle").modal("hide");
                var x={"orderNo":orderNo};
                $.ajax({
                    data:JSON.stringify(x),
                    dataType:"json",
                    url: "http://192.168.113.14:8080/BSMD/order/cancel.do",
                    type:"post",
                    header: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.message=="success"){
                            $(t).text("删除订单");
                            $(t).removeClass("cancleOrder");
                            $(t).addClass("deleteOrder");
                            var oj=$(t).parents("td").prev().children();
                            $(oj[0]).text("交易关闭");
                            $(".deleteOrder").off("click");
                            deleteOrder();
                        }
                    }
                })
            })

        }
    });

    //退换货效果
    $(".re-inf>ul>li>span").bind("click", function () {
        var x = $(this).parent();
        $(x).siblings().removeClass("re-btn-active");
        $(x).addClass("re-btn-active");

    })
}
function deleteOrder(){
    $(".deleteOrder").on("click",function(){
        var t=$(this);
        var orderNo=$(this).attr("data-id");
        $("#deletemodle .modal-body").html("<span style='font-size: 14px'>你确定要删除这笔订单吗？<br>删除后将永久删除</span>");
        if(orderNo!=null){
            $("#deletemodle .btn-primary").one("click",function(){
                $("#deletemodle").modal("hide");
                var x={"orderNo":orderNo};
                $.ajax({
                    data:JSON.stringify(x),
                    dataType:"json",
                    url: "http://192.168.113.14:8080/BSMD/order/delete.do",
                    type:"post",
                    header: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.message=="success"){
                            var oj= $(t).parents("tbody");
                            $(oj).remove()
                        }

                    }
                })
            })

        }
    });
}
//没有订单
function noOrder() {
    var html = '';
    $(".order_title").html(html);
    html += '<div style="margin: 0 auto;width: 100%;text-align: center"><div class="oblii"><img src="images/dotted.png"></div>';
    html += ' <div class="oblic"><h3>此状态下没有对应的订单~~</h3></div></div>';
    return html;
}
//加载订单
eg.loadOrder = function (pageIndex, status) {
    var custno=isload();
    if(custno!=null&&custno!=""){

        var info = {"No":custno, "pageIndex": pageIndex, "pageCount": 6, "orderStatu": status};
        $.ajax({
            type: "post",
            url: "http://192.168.113.14:8080/BSMD/order/select/list",
            data: JSON.stringify(info),
            dataType: "json",
            header: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            success: function (data) {

                var json = data;
                console.log(json);
                var html = '';
                $(".order_tcontent").html("");
                if (json.orderPage.dataCount == 0) {
                    html = noOrder();                 //没有订单
                    $(".order_tcontent").html(html);
                    $(".order_page>.pagination").html("");
                } else {
                    html = orderContent(json);      //有订单
                    $(".order_tcontent").html(html);
                    cancelOrder();
                    deleteOrder();
                    eg.hoverChange();
                    $.breakPage(json.orderPage.pageSize, json.orderPage.pageIndex);  //分页数字
                    $.orderPage(status);    //请求某一页
                    //退换货事件
                    returngoods();
                }

            }
        });
    }
};

//点击选择订单类型
function orderSelect() {
    $("#myOrder li").on("click", function () {
        var named = $(this).text();
        var status = -1;
        if (named == "待付款") {
            status = 0;
        } else if (named == "待接单") {
            status = 1;
        } else if (named == "待收货") {
            status = 2;
        } else if (named == "已完成") {
            status = 3;
        }
        //    加载订单
        eg.loadOrder(1, status);
    });
    $("#d3 li").on("click",function(){
       //售后申请单
    })
}
//分页
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
            console.log("pageSize" + pageSize);
        } else if (pageIndex > pageSize - 3) {
            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>';
            for (var i = 4; i >= 0; i--) {
                var p = pageSize - i;
                console.log("p" + p);
                if (p == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + p + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0);" >' + p + '</a></li>';
                }
            }
        } else {
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
    $(".pagination").html(html);
};
$.orderPage = function (status) {
    $(".order_page .pagination").on("click", "a", function () {

        var no = isload();
        if(no!=""&no!=null){
            var pageCount = 6;
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
                orderAjax(no, pageIndex + 1, pageCount, status);

            } else if ($(this).hasClass("forward")) {
                var page = $(".pagination").find(".active");
                var pageIndex = Number($($(page)[0]).text());
                if (pageIndex == 1) {
                    return;
                }
                orderAjax(no, pageIndex - 1, pageCount, status);
            }
            else {
                var pageIndex = Number($(this).html());
                orderAjax(no, pageIndex, pageCount, status);
            }
        }

    });
};
//ajax请求;
function orderAjax(no, pageIndex, pageCount, status) {
    var info = {"No": no, "pageIndex": pageIndex, "pageCount": pageCount, "status": status};
    $.ajax({
        type: "post",
        url: "http://192.168.113.14:8080/BSMD/order/select/list",
        data: JSON.stringify(info),
        dataType: "json",
        success: function (data) {
            var json = data;
            $(".order_tcontent").html("");
            var html = orderContent(json);
            $(".order_tcontent").append(html);
            $.breakPage(json.orderPage.pageSize, pageIndex);
        }
    })
}
/***********************************安全设置***************************************/

/*更换手机号step1*/
eg.changePnumber1 = function () {
    $(".info_number>.setting").click(function () {
        if ($(".info_number>.setting").text() == "设置") {
            $(".error1").css("display", "none");
            $("#telephone").val("");
            $(".pnumber").css("display", "block");
            $(this).text("收起");
        } else {
            $(".pnumber").css("display", "none");
            $(".new_pnumber").css("display", "none");
            $(".new_check").css("display", "none");
            $(".new_result").css("display", "none");
            $(this).text("设置");
        }
    });
}
/*--更换手机号step2--*/
eg.changePnumber2 = function () {
    $(".pnumber").css("display", "none");
    $(".new_pnumber").css("display", "block");
}

/*--更换手机号step3--*/
eg.changePnumber3 = function () {
    var pnumber = $("#telephone").val();
    if (!/^1[358]\d{9}$/.test(pnumber)) {
        $(".error1").css("display", "inline");
    } else {
        $(".new_pnumber").css("display", "none");
        $(".new_result").css("display", "block");
        var phonenum = {"username": "001", "tel": pnumber};
        $.ajax({
                type: "post",
                url: "/",
                data: JSON.stringify(phonenum),
                dataType: "json",
                header: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function () {
                    $(".info_number .info").text(eg.md(pnumber));
                    $(".pnumber span").text(eg.md(pnumber));
                    $(".new_pnumber .phone_number").text(eg.md(pnumber));
                }
            }
        );
    }
};

/*--更换手机号step4--*/
eg.changePnumber4 = function () {
    $(".new_result").css("display", "none");
    $(".info_number>.setting").text("设置");
};


/*------------------------修改密码----------------*/
eg.changePwd = function () {
    $(".info_password>.setting").click(function () {
        if ($(".set_password").css("display") == "none") {
            $(".set_password").css("display", "block");
            $(".info_password>.setting").text("收起");
        }
        else {
            $(".set_password").css("display", "none");
            $(".info_password>.setting").text("设置");
        }
    });
};

eg.modifyPwd = function () {
    $("#check").on('click', function () {
        var oldpassword = $("#psw").val();
        if(oldpassword==null||oldpassword==""){
            $(".psw1msg").text("请输入原有密码");
            $(".psw1msg").removeClass("_none");
            return;
        }
        var tel= $.cookie("userphone");
        var x = {"username": tel, "password":oldpassword};
        if(tel!=null&&tel!=null){
            $.ajax({
                url: "http://192.168.113.14:8080/BSMD/loginMobile.do",
                datatype: "json",
                data:JSON.stringify(x),
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                    if (data.status=="success") {
                        $(".psw1msg").addClass("glyphicon glyphicon-ok oldps");
                        $(".psw1msg").removeClass("_none");
                        $(".change-grid").removeClass("_none");
                        $("#check").hide();
                        $("#modify").removeClass("_none");
                    } else if(data.status=="用户名或密码错误") {
                        $(".psw1msg").text("输入错误，请重新输入！");
                        $(".psw1msg").removeClass("_none");
                    }
                }
            });
        }
    });
    $("#checkbtn").bind("click",function(){
        var tel= $.cookie("userphone");
        if (dopsw() ) {
            var psw = strEnc($("#psw2").val(), "1", "2", "3");
            var x={"password":psw,"tel":tel};
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                dataType: "json",
                url: "http://192.168.113.14:8080/BSMD/validateAndSend.do",
                success: function (data) {
                    console.log(data);
                    if(data.message=="success"){
                        var k = strEnc(data.id, "1", "2", "3");
                        sessionStorage.setItem("id_it_id",k);
                    }
                }
            })
        }
        else{
            return false;
        }
    });
    $("#modify").on("click", function () {
        if (dopsw() &&docheck()) {
            var tel= $.cookie("userphone");
            var psw = strEnc($("#psw2").val(), "1", "2", "3");
            var id=strDec(sessionStorage.getItem("id_it_id"),"1", "2", "3");
            var code=$("#checknum").val();
            var x={"userInfo":{"password":psw,"tel":tel},"id":id,"validateCode":code};
            $.ajax({
                type: "post",
                data: JSON.stringify(x),
                dataType: "json",
                url: "http://192.168.113.14:8080/BSMD/register.do",
                success: function (data) {
                    console.log(data);
                    if (data.message =="success") {
                       //修改是否成功
                    }
                }
            })
        }
    })

};

function docheck(){
    var num=$("#checknum");
    var span=$(".checkmsg");
    if(num.val()==""){
        span.html("验证码不为空");
        return false;
    }else{
        span.html('<span class="glyphicon glyphicon-ok-circle" style="color: #26BC85"> </span>');
        span.removeClass("_none");
        return true;
    }

}
//密码验证==============================
function dopsw(){
    var t=$("#newpsw");
    var span=$(".pswmsg");
    if(/^\w*[a-zA-Z]+\w*$/.test(t.val())){
        span.html('<span class=" 	glyphicon glyphicon-ok-circle" style="color: #26BC85"></span>');
        span.removeClass("_none");
        return true;
    }
    else{
        span.html('密码6-16位');
        span.removeClass("_none");
        return false;
    }
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
    })
}

//退货和退款
function returngoods(){
    $(".return").on("click", function () {
        //订单编号
        var y=$(this).parents("td");
        var orderNo=$(this).attr("data-id");
        //明细编号
        var orderSn=$(this).attr("data-orderSn");
        //商品名称
        var name=$(y[0]).siblings(".goods");
         name=$(name).text();
        var number=$(y[0]).siblings(".quantity").text();
        var html='';
        html+='<p style="margin-left: 40px;" class="follow-tip" data-id="'+orderNo+'" data-orderSn="'+orderSn+'" >'+name+'<input type="number" value="'+number+'" max="'+number+'" min="1">件（数量可修改）</p>'
        $("#iteminf").html(html);

    });
    $("#returnModal .btn-primary").bind("click",function(){
        var x= $("#returnModal .modal-content p");
        //订单编号
        var orderNo=$(x).attr("data-id");
        //明细编码
        var orderSn=$(x).attr("data-orderSn");
        //退货数量
        var number=$(x).children("input").val();
        //退货类型
        var retype=$("#returnModal .re-inf .re-btn-active");
        retype=$(retype[0]).attr("data-id");
        var applyReason=$("#returnInf").val();
        var json={"orderNo":orderNo,"orderSn":orderSn,"applyNum":number,"applyType":retype,"applyReason":applyReason};
        $.ajax({
            data:JSON.stringify(json),
            dataType:"json",
            type: "post",
            url: "http://192.168.113.14:8080/BSMD/afterSale/apply",
            success: function (data) {
                console.log(data);
                if (data.message =="success") {
                    $("#returnModal").modal("hide");
                    //刷新页面标志退换货的商品
                }
            }
        })
    })
}
//退货换货单查询



//获取用户的礼券
function getUserVoucher(){
    $("#d2 a").one("click",function(){
        var custNo=isload();
        var json={"custNo":custNo,"shopNo":""};
        $.ajax({
            data: JSON.stringify(json),
            dataType: "json",
            type: "post",
            url: "http://192.168.113.14:8080/BSMD/user/getStamps",
            success: function (data) {
                console.log(data);
                if (data.message == "success") {
                    var stamps = data.stamps;
                    if (stamps.length > 0) {
                        //首页优惠券
                        var shophtml = '<h5 >店铺券</h5>';
                        //全部优惠券
                        var allhtml = '<h5>全场通用</h5>';
                        color = ['#F5A739', '#01B6A9', '#FD485A'];
                        for (var i = 0; i < stamps.length; i++) {
                            if (stamps[i].shopNo == "all"&&stamps[i].status==4) {
                                allhtml += '  <div class="col-lg-6 per-voucher" style="margin-bottom: 20px"><div class="fl"> <span style="color: #fff">¥</span> ' +
                                    '<span class="money">' + stamps[i].stampAmt + '</span> </div> <div class="fl" style="margin-left: 30px"> ' +
                                    '<p style="color: #fff">' + stamps[i].stampTypeName + '</p> <p style="color: #333;margin: 5px">优惠券</p> ' +
                                    '<a class="getvoucher" href="index.html" data-id="' + stamps[i].stampTypeNo + '">立即使用</a> </div><div style="clear: both"></div>' +
                                    '<span class="more-voucher" style="font-size: 12px">使用期限：' + stamps[i].startValidDate_String +
                                    '<br/>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-' + stamps[i].endValidDate_String + '</span>' +
                                    '</div>';
                            }else if(stamps[i].status==4){
                                shophtml+= '<div class="col-lg-6 per-voucher" style="margin-bottom: 20px"><div class="fl"> <span style="color: #fff">¥</span> ' +
                                    '<span class="money">' + stamps[i].stampAmt + '</span> </div> <div class="fl" style="margin-left: 30px"> ' +
                                    '<p style="color: #fff">' + stamps[i].stampTypeName + '</p> <p style="color: #333;margin: 5px">优惠券</p> ' +
                                    '<a class="getvoucher"  href="index.html" data-id="' + stamps[i].stampTypeNo + '">立即使用</a> </div><div style="clear: both"></div>' +
                                    '<span class="more-voucher" style="font-size: 12px">使用期限：' + stamps[i].startValidDate_String +
                                    '<br/>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-' + stamps[i].endValidDate_String + '</span><br/>' +
                                    '<span style="font-size: 12px;color: #fff;">' + stamps[i].shopName + '专用</span></div>';
                            }
                        }
                        allhtml+='<div class="clearfix"></div>'

                        $("#myVoucher .row").html(allhtml+shophtml)
                    }
                }
            }
        })
    })

}