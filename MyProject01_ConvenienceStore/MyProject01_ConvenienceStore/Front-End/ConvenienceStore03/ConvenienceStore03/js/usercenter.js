/**
 * Created by hp on 2015/11/13.
 */


$(document).ready(function () {

    checkCookie()
    loadname();
    cartnum();
    orderSelect();
    //eg.loadPnumber();
    //eg.changePnumber1();
    //eg.changePwd();
    eg.collapse();
    eg.eliminate();
});
function checkCookie() {

    //getCookie("proeare");

    var proeare = $.cookie("proeare");
    if (proeare != null && proeare != "") {
        proeare = proeare.split(',');
        var pos = proeare[0] + proeare[1] + proeare[2];
        var x = proeare[0] + "-" + proeare[1] + "-" + proeare[2];
        $("#cityname").attr("value", pos);
        $("#cityname").attr("data-cityname", x);
        //商品搜索
        $("#searchitem").mysearch();
        //顶部地址改变
        $().poschange();
        $().otherpageapos();
        //请求商品列表
        eg.loadOrder();
        return;

    }
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

}
eg.hoverChange = function () {
    $(".order_tcontent").on("mouseenter", ".order_table", function () {
        $(this).css("border", "1px solid #A4A4A4");
    });
    $(".order_tcontent").on("mouseleave", ".order_table", function () {
        $(this).css("border", "1px solid #eee");
    });
}

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
}
/***********************************我的订单***************************************/
////加载订单标题
//function loadTitle(){
//    var html='';
//    html+='<ul><li class="goods">商品</li>';
//        html+='<li class="sprice">单价(元)</li>';
//        html+='<li class="quantity">数量</li>';
//        html+='<li class="aftersale">售后</li>';
//        html+='<li class="rtotal">实付款(元)</li>';
//        html+='<li class="status">交易状态</li>';
//        html+='<li class="other">操作</li></ul>';
//        return html;
//}
//全部订单内容
function orderContent(json) {
    var html = '';
    for (var i = 0; i < json.orderPage.list.length; i++) {
        html += '<table class="order_table"><tbody>';
        html += '<tr class="order_table_header"><td colspan="7"><div class="order_info"><span class="no">';
        html += '订单编号：' + json.orderPage.list[i].orderInfo.orderNo;
        html += '<span class="deal_time">成交时间：';
        html += json.orderPage.list[i].orderInfo.createDate + '</span></span></div></td></tr>';
        html += '<tr class="order_table_item last"><td class="goods">';
        html += '<a href="goods.html" target="_blank"><img src="' + json.orderPage.list[i].itemList[0].item.url + '"' + 'alt="商品详情"></a>';//跳转至商品详情页面
        html += '<div class="desc"><p>';
        html += '<a href="goods.html" target="_blank">' + json.orderPage.list[i].itemList[0].item.itemName + '</p>';
        //html += '<p>' + '' + '</p></div></td>';
        html += '<td class="sprice"><span>' + json.orderPage.list[i].itemList[0].realPrice + '</span></td>';
        html += '<td class="quantity">' + json.orderPage.list[i].itemList[0].nowQty + '</td>';
        html += '<td class="aftersale"><ul><li><a href="#">取消订单</a></li><li><a href="#">删除订单</a></li><li><a href="#">退款</a></li></ul></td>';
        html += '<td class="rtotal"><span class="total_price">' + json.orderPage.list[i].orderInfo.totalAmt + '</span>';
        html += '<p><span>' + json.orderPage.list[i].orderInfo.expressFreightAmt + '</span></p></td>';
        html += '<td class="status"><p>' + json.orderPage.list[i].orderInfo.orderStatu + '</p></td>';
        html += '<td class="other"><p><a href="#">';
        if (json.orderPage.list[i].orderInfo.orderStatu == 0) {
            html += "待 付 款";
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 1) {
            html += '待 发 货';
        }
        else if (json.orderPage.list[i].orderInfo.orderStatu == 2) {
            html += "待 收 货";
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 4) {
            html += "确认收货";
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 3) {
            html += "待 评 价";
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 4) {
            html += '已 完 成';
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 5) {
            html += '待 退 款';
        } else if (json.orderPage.list[i].orderInfo.orderStatu == 6) {
            html += '已 取 消';
        }
        html += '</a></p></td></tr></tbody></table>';
    }
    return html;
}
//没有订单
function noOrder() {
    html += '<div class="oblii"><img src="images/dotted.png"></div>';
    html += ' <div class="oblic"><h3>此状态下没有对应的订单~~</h3></div>';
}
//第一次加载全部订单
eg.loadOrder = function () {
    var info = {"custNo": "cu001", "pageIndex": "1", "pageCount": "5", "orderStatu": "-1"};
    $.ajax({
        type: "post",
        url: "http://192.168.199.134:8080/BSMD/order/select/list",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            var html = '';
            //console.log(json);
            if (json.orderPage.pageSize == 0) {
                noOrder();//没有订单
            } else {
                html= orderContent(json);//有订单
            }
            $(".order_tcontent").append(html);
            eg.hoverChange();
            var temp = '';
            if(json.orderPage.pageSize >=2){
                for (var page = 1; page <= json.orderPage.pageSize; page++) {
                    if (page == 1) {
                        temp += '<a>' + '<span  class="c" id="paging' + page + '"' + '>' + page + '</span></a>';
                    } else {
                        temp += '<a >' + '<span id="paging' + page + '"' + '>' + page + '</span></a>';
                    }
                }
                if (json.orderPage.pageSize >= 2) {
                    temp += '<a>' + '<span id="paging' + 'next"' + '>' + '下一页</span></a>';
                }
                $(".pagination").append(temp);
                eg.paging();
            }
        }
    });
}
//全部订单分页
eg.paging = function () {
    $(".pagination").on('click', "span", function () {
        var index = $(this).text();
        //若点击的是页码
        if (!isNaN(index)) {
            var info = {"custNo": "cu001", "pageIndex": index, "pageCount": "5"};
            $.ajax({
                type: "post",
                url: "http://192.168.199.134:8080/BSMD/order/select/list",
                data: JSON.stringify(info),
                datatype: "json",
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    var json = data;
                    var html = '';
                    html = orderContent(json);
                    $(".order_tcontent").html('');
                    $(".order_tcontent").append(html);

                    if (index == 1 && $(".pagination span").last().text() != "下一页") {
                        if ($(".pagination span").first().text() == "上一页") {
                            $(".pagination span").first().remove();
                        }
                        // $(".pagination").append('<a>' + '<span id="paging' + 'next"' + '>' + '下一页</span></a>');
                    }
                    if (index >= 2 && $(".pagination span").first().text() != "上一页") {
                        $(".pagination").prepend('<a>' + '<span id="paging' + 'pre"' + '>' + '上一页</span></a>');
                    }
                    if (index == json.orderPage.pageSize && $(".pagination span").last().text() == "下一页") {
                        $(".pagination span").last().remove();
                    }
                    $(".pagination span").each(
                        function () {
                            if ($(this).hasClass("c")) {
                                $(this).removeClass("c");
                                if ($(".pagination span").eq(0).text() == "上一页") {
                                    $(".pagination span").eq(index).addClass("c");
                                }
                                else $(".pagination span").eq(index - 1).addClass("c");
                            }
                        }
                    );
                }
            });
        } else if (index == "下一页") {
            $(".pagination span").each(
                function () {
                    if ($(this).hasClass("c")) {
                        var pre = $(this).index() + 1;//第几个元素
                        var next = pre + 1;
                        var info = {"custNo": "cu001", "pageIndex": next, "pageCount": "5"};
                        $.ajax({
                            type: "post",
                            url: "http://192.168.199.134:8080/BSMD/order/select/list",
                            data: JSON.stringify(info),
                            datatype: "json",
                            header: {"Content-type": "application/json", "Accept": "application/json"},
                            success: function (data) {
                                var json = data;
                                var html = '';
                                html = orderContent(json);
                                $(".order_tcontent").html('');
                                $(".order_tcontent").append(html);

                                if (next == json.orderPage.pageSize) {
                                    $(".pagination span").last().remove();
                                }
                                if ($(".pagination span").first().text() != "上一页") {
                                    $(".pagination").prepend('<a>' + '<span id="paging' + 'pre"' + '>' + '上一页</span></a>');
                                }
                                $(".pagination span").each(
                                    function () {
                                        if ($(this).hasClass("c")) {
                                            $(this).removeClass("c");
                                            if ($(".pagination span").eq(0).text() == "上一页") {
                                                $(".pagination span").eq(next).addClass("c");
                                            }
                                            else $(".pagination span").eq(next - 1).addClass("c");
                                        }
                                    }
                                );
                            }
                        });
                    }
                    eg.hoverChange();
                }
            );
        } else if (index == "上一页") {
            $(".pagination span").each(
                function () {
                    if ($(this).hasClass("c")) {
                        var pre = $(this).index();//前一个元素
                        var info = {"custNo": "cu001", "pageIndex": pre, "pageCount": "5"};
                        $.ajax({
                            type: "post",
                            url: "http://192.168.199.134:8080/BSMD/order/select/list",
                            data: JSON.stringify(info),
                            datatype: "json",
                            header: {"Content-type": "application/json", "Accept": "application/json"},
                            success: function (data) {
                                var json = data;
                                var html = '';
                                html = orderContent(json);
                                $(".order_tcontent").html('');
                                $(".order_tcontent").append(html);
                                if (pre == 1) {
                                    $(".pagination span").eq(0).remove();

                                } else if ($(".pagination span").last().text() != "下一页") {
                                    $(".pagination").append('<a>' + '<span id="paging' + 'next"' + '>' + '下一页</span></a>');
                                }
                                $(".pagination span").each(
                                    function () {
                                        if ($(this).hasClass("c")) {
                                            $(this).removeClass("c");
                                            if ($(".pagination span").eq(0).text() == "上一页") {
                                                $(".pagination span").eq(pre).addClass("c");
                                            } else {
                                                $(".pagination span").eq(pre - 1).addClass("c");
                                            }
                                        }
                                    }
                                );
                            }
                        });
                    }
                    eg.hoverChange();
                }
            );
        }
    });
}

//特定订单内容
function namedOrder(json, named) {
    console.log(json);
    var html = '';
    for (var i = 0; i < json.orderPage.list.length; i++) {
        html += '<table class="order_table"><tbody>';
        html += '<tr class="order_table_header"><td colspan="7"><div class="order_info"><span class="no">';
        html += '订单编号：' + json.orderPage.list[i].orderInfo.orderNo;
        html += '<span class="deal_time">成交时间：';
        html += json.orderPage.list[i].orderInfo.createDate + '</span></span></div></td></tr>';
        html += '<tr class="order_table_item last"><td class="goods">';
        html += '<a href="goods.html" target="_blank"><img src="' + json.orderPage.list[i].itemList[0].item.url + '"' + 'alt="商品详情"></a>';//跳转至商品详情页面
        html += '<div class="desc"><p>';
        html += '<a href="goods.html" target="_blank">' + json.orderPage.list[i].itemList[0].item.itemName + '</p>';
        //html += '<p>' + '' + '</p></div></td>';
        html += '<td class="sprice"><span>' + json.orderPage.list[i].itemList[0].realPrice + '</span></td>';
        html += '<td class="quantity">' + json.orderPage.list[i].itemList[0].nowQty + '</td>';
        html += '<td class="aftersale"><ul><li><a href="#">取消订单</a></li><li><a href="#">删除订单</a></li><li><a href="#">退款</a></li></ul></td>';
        html += '<td class="rtotal"><span class="total_price">' + json.orderPage.list[i].orderInfo.totalAmt + '</span>';
        html += '<p><span>' + json.orderPage.list[i].orderInfo.expressFreightAmt + '</span></p></td>';
        html += '<td class="status"><p>' + json.orderPage.list[i].orderInfo.orderStatu + '</p></td>';
        html += '<td class="other"><p><a href="#">';
        var st='';
        var arr=named.split("");
        for(var i=0;i<arr.length-1;i++){
            st+=arr[i]+" ";
        }
        st+=arr[named.length-1];
        html += st;
        html += '</a></p></td></tr></tbody></table>';
    }
    return html;
}
//点击选择订单类型
function orderSelect() {
    $("#myOrder li").on("click", function () {
        var named = $(this).text();
        var status = -1;
        if (named == "待付款") {
            status = 0;
        } else if (named == "待收货") {
            status = 2;
        } else if (named == "待评价") {
            status = 3;
        }
        $(".order_tcontent").html('');
        $(".pagination").html('');
        var info = {"custNo": "cu001", "pageIndex": "1", "pageCount": "5", "orderStatu": status};
        $.ajax({
            type: "post",
            url: "http://192.168.199.134:8080/BSMD/order/select/list",
            data: JSON.stringify(info),
            datatype: "json",
            header: {"Content-type": "application/json", "Accept": "application/json"},
            success: function (data) {
                var json = data;
                console.log(data);
                if (json.orderPage.pageSize == 0) {
                    noOrder();//没有订单
                } else {
                    var html = namedOrder(json, named);
                    $(".order_tcontent").append(html);
                    eg.hoverChange();
                    var temp = '';
                    if(json.orderPage.pageSize>=2){
                        for (var page = 1; page <= json.orderPage.pageSize; page++) {
                            if (page == 1) {
                                temp += '<a>' + '<span  class="c" id="paging' + page + '"' + '>' + page + '</span></a>';
                            } else {
                                temp += '<a >' + '<span id="paging' + page + '"' + '>' + page + '</span></a>';
                            }
                        }
                        if (json.orderPage.pageSize >= 2) {
                            temp += '<a>' + '<span id="paging' + 'next"' + '>' + '下一页</span></a>';
                        }
                        $(".pagination").append(temp);
                        eg.paging();
                    }

                }
            }
        });

    });
}


/***********************************安全设置***************************************/
/*
 eg.md = function (content) {
 var reg = /(\d{3})\d{4}(\d{4})/;
 return content.replace(reg, "$1****$2");
 }

 eg.loadPnumber = function () {
 var user = {"username": "001"};
 $.ajax({
 type: "post",
 url: "",
 data: JSON.stringify(user),
 datatype: "json",
 header: {"Content-type": "application/json", "Accept": "application/json"},
 success: function (data) {
 var nps = eg.md(data.tel);
 $(".info_number .info").text(nps);
 $(".pnumber span").text(nps);
 $(".new_pnumber .phone_number").text(nps);
 }
 }
 );

 }
 */

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
                url: "",
                data: JSON.stringify(phonenum),
                datatype: "json",
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function () {
                    $(".info_number .info").text(eg.md(pnumber));
                    $(".pnumber span").text(eg.md(pnumber));
                    $(".new_pnumber .phone_number").text(eg.md(pnumber));
                }
            }
        );
    }
}

/*--更换手机号step4--*/
eg.changePnumber4 = function () {
    $(".new_result").css("display", "none");
    $(".info_number>.setting").text("设置");
}

/*--邮箱--*/
//$(function () {
//    $(".info_email>.setting").click(function () {
//        if ($(".email_confirm").css("display") == "none") {
//            $(".email_confirm").css("display", "block");
//            $(".info_email>.setting").text("收起");
//        }
//        else {
//            $(".email_confirm").css("display", "none");
//            $(".info_email>.setting").text("设置");
//        }
//    });
//})

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
}

eg.modifyPwd = function () {

    $("#ps1").on('focus', function () {
        var att1 = $(".sp1 .error2");
        att1.removeClass("glyphicon glyphicon-ok oldps");
        att1.text("");
    });
    $("#ps2").on('focus', function () {
        var att2 = $(".sp2 .error2");
        att2.removeClass("glyphicon glyphicon-ok oldps");
        att2.text("");
    });
    $("#ps3").on('focus', function () {
        var att3 = $(".sp3 .error2");
        att3.removeClass("glyphicon glyphicon-ok oldps");
        att3.text("");
    });


    //请求用户名与密码
    var oldpassword;
    var newpassword;
    $("#ps1").on('blur', function () {
        oldpassword = $("#ps1").val();
        var att = $(".sp1 .error2");
        //$.ajax({
        //    url: "",
        //    datatype: "json",
        //    header: {"Content-type": "application/json", "Accept": "application/json"},
        //    success: function (data) {
        //
        //        if (data.password == param) {
        //            att.text("");
        //            att.addClass("glyphicon glyphicon-ok oldps");
        //            att.css("margin-left", "10px");
        //        } else {
        //            att.text("");
        //            att.text("输入错误，请重新输入！");
        //        }
        //        att.css("display", "inline");
        //    }
        //});
    });
    $("#ps2").on('blur', function () {

        var num = $("#ps2").val();
        var att = $(".sp2 .error2");
        var reg = /^\w*[a-zA-Z]+\w*$/;
        if (reg.test(num)) {
            att.text("");
            att.text("密码位数6-16位，至少有一位是字母");
        } else {
            att.text("");
            att.addClass("glyphicon glyphicon-ok oldps");
            att.css("margin-left", "10px");
        }
        att.css("display", "inline");
    });

    $("#ps3").blur(function () {
        var tmp = $("#ps2").val();
        var num = $("#ps3").val();
        var att = $(".sp3 .error2");
        if (num != tmp) {
            att.text("");
            att.css("display", "inline");
            att.text("两次密码不一致！");
        } else {
            newpassword = num;
            att.text("");
            att.addClass("glyphicon glyphicon-ok oldps");
            att.css("display", "inline");
            att.css("margin-left", "10px");
        }
    });

    $("#modify").on('click', function () {
        var flag = true;
        var old = $("#ps1").val();
        var pwd1 = $("#ps2").val();
        var pwd2 = $("#ps3").val();
        var num1 = pwd1.length;
        var num2 = pwd2.length;
        if (num1 != num2 || num1 < 6 || num2 < 6 || num1 > 12 || num2 > 12 || pwd1 != pwd2) {
            flag = false;
        } else {
            flag = true;
        }
        if (flag) {
            var oldnew = {"oldpwd": oldpassword, "newpwd": newpassword};
            $.ajax({
                url: "",
                datatype: "json",
                data: JSON.stringify(oldnew),
                header: {"Content-type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    var att = $(".sp1 .error2");
                    if (data.password == oldpassword) {
                        att.text("");
                        att.addClass("glyphicon glyphicon-ok oldps");
                        att.css("margin-left", "10px");
                    } else {
                        att.text("");
                        att.text("输入错误，请重新输入！");
                    }
                    att.css("display", "inline");
                }
            });
            $("#ps1").val("");
            $("#ps2").val("");
            $("#ps3").val("");
            $(".sp1 .error2").removeClass("glyphicon glyphicon-ok oldps");
            $(".sp2 .error2").removeClass("glyphicon glyphicon-ok oldps");
            $(".sp3 .error2").removeClass("glyphicon glyphicon-ok oldps");
            $("#tip").empty();
            $("#tip").css("color", "#18A60C");
            $("#tip").css("display", "inline");
            $("#tip").text("修改成功~");
        } else {
            $("#tip").css("color", "#ff3333");
            $("#tip").css("display", "inline");
            $("#tip").text("无法提交，请按照要求填写！");
        }
        $("#tip4").delay(2000).hide(0);
    });
}



