$(document).ready(function () {
    isLoad();
    get_data();//先加载待处理订单数
    updateData();//30秒一次刷新待处理订单数据
    //日期选择
    $("#date_1").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#date_2').datepicker('option', 'minDate', d);
                console.log("营业统计通过日期控件更改时间");
                //    刷新营业总览
                //var sno = $(".shop_show select").find("option:selected").attr("data-shopno");
                //var st = $("#date_1").val();
                //var et = $("#date_2").val();
                //测试数据
                var sno = "";
                var st = "2016-01-21";
                var et = "2016-01-30";
                $.loadTotalData(st, et, sno);
                //    刷新趋势图
                $.loadTendency(st, et, sno);
                $(".type_select dd").removeClass("active");
                $(".type_select dd").eq(0).addClass("active");
            },
            //面板显示之前取消选择天数的选中状态
            beforeShow: function (input) {
                $("#business .stast_select dd.active").removeClass("active");
            }
        });
    $("#date_2").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#date_1').datepicker('option', 'maxDate', d);
                console.log("营业统计通过日期控件更改时间");
                //    刷新营业总览
                //var sno = $(".shop_show select").find("option:selected").attr("data-shopno");
                //var st = $("#date_1").val();
                //var et = $("#date_2").val();
                //测试数据
                var sno = "";
                var st = "2016-01-21";
                var et = "2016-01-30";
                $.loadTotalData(st, et, sno);
                //    刷新趋势图
                $.loadTendency(st, et, sno);
                $(".type_select dd").removeClass("active");
                $(".type_select dd").eq(0).addClass("active");
            },
            beforeShow: function (input) {
                $("#business .stast_select dd.active").removeClass("active");
            }
        });
    $("#date_3").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#date_4').datepicker('option', 'minDate', d);
                console.log("商品统计通过日期控件更改时间");
                //刷新商品销量
                //var sno = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
                //var it=$(".genre select").find("option:selected").attr("data-itemclass");
                //var st = $("#date_3").val();
                //var et = $("#date_4").val();
                //测试数据
                var sno = "";
                var it = "";
                var st = "2016-01-21";
                var et = "2016-01-30";
                $.loadSale(st, et, it, sno, 1, 2);

            }
            , beforeShow: function (input) {
            $("#commodity .stast_select dd.active").removeClass("active");
        }
        });
    $("#date_4").datepicker(
        {
            onSelect: function (dateText, inst) {
                var d;
                if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
                    d = new Date(dateText.replace(/-/g, ','));
                }
                else d = new Date(dateText.replace('-', ','));
                $('#date_3').datepicker('option', 'maxDate', d);
                console.log("商品统计通过日期控件更改时间");
                //刷新商品销量
                //var sno = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
                //var it=$(".genre select").find("option:selected").attr("data-itemclass");
                //var st = $("#date_3").val();
                //var et = $("#date_4").val();
                //测试数据
                var sno = "";
                var it = "";
                var st = "2016-01-21";
                var et = "2016-01-30";
                $.loadSale(st, et, it, sno, 1, 2);

            },
            beforeShow: function (input) {
                $("#commodity .stast_select dd.active").removeClass("active");
            }
        });
    showDate($("#business dd.active span"), $('#date_1'), $('#date_2'));
    showDate($("#commodity dd.active span"), $('#date_3'), $('#date_4'));

//    首次加载
    //var s = $("#date_1").val();//默认获取当前日期
    $.loadTotalData("2016-01-21", "2016-01-30", "");//加载营业总额
    $.loadShopName();//加载所有店铺名
    $.loadTendency("2016-01-21", "2016-01-30", "");//加载营业趋势图


});


//----------选择日期begin-------
//按给出的选项选择日期
$(function () {
    $("#business .stast_select dd span").click(function () {
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
        $(".type_select dd").removeClass("active");
        $(".type_select dd").eq(0).addClass("active");
        showDate($("#business dd.active span"), $('#date_1'), $('#date_2'));
        console.log("营业统计通过点击时间段选项更改时间");
        //    刷新营业总览
        //var sno = $(".shop_show select").find("option:selected").attr("data-shopno");
        //var st = $("#date_1").val();
        //var et = $("#date_2").val();
        //测试数据
        var sno = "";
        var st = "2016-01-21";
        var et = "2016-01-30";
        $.loadTotalData(st, et, sno);
        //    刷新趋势图
        $.loadTendency(st, et, sno);

    });
    $("#commodity .stast_select dd span").click(function () {
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
        showDate($("#commodity dd.active span"), $('#date_3'), $('#date_4'));
        console.log("商品统计通过点击时间段选项更改时间");
        //刷新商品销量
        //var sno = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
        //var it=$(".genre select").find("option:selected").attr("data-itemclass");
        //var st = $("#date_3").val();
        //var et = $("#date_4").val();
        //测试数据
        var sno = "";
        var it = "";
        var st = "2016-01-21";
        var et = "2016-01-30";
        $.loadSale(st, et, it, sno, 1, 2);

    });
})

//日期随点击选项变化
function showDate(t, d1, d2) {
    var today = new Date();
    var r;
    d2.val(addDate(today, 0));
    if (t.html() == "今天") {
        r = addDate(today, 0);
    }
    else if (t.html() == "近7天") {
        r = addDate(today, -6);
    }
    else if (t.html() == "近30天") {
        r = addDate(today, -29);
    }
    else if (t.html() == "近90天") {
        r = addDate(today, -89);
    }
    d1.val(r);
}
//对日期进行加减操作
function addDate(date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day;
    return val;
}
//-------选择日期end-------

//--------绘制图表begin---------
//选择趋势图要显示的数据
function selectChart() {
    $(".type_select dd span").click(function () {
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
    });
}
//--------绘制图表end---------

//--------导出excel文件begin--------
$(function () {
    $("#output").on("click", function () {
            var explorer = window.navigator.userAgent;

            //IE
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                exportExcel("tableExcel");
            }
            //Chrome(or360), Firefox...
            else {
                if (explorer.indexOf("Chrome") >= 0) {//Chrome和IE
                    $("#myModal").modal("show");
                } else {
                    educeExcel();
                }
            }
        }
    )
});
$(".sure").click(function () {
    educeExcel();
});
//导出Excel文件
function educeExcel() {
    var date1 = $('#date_1').val();
    var date2 = $('#date_2').val();
    var fileName = date1 + '至' + date2;
    $(".table2excel").table2excel({
        exclude: ".exclude",
        name: "Excel Document Name",
        filename: fileName,
        exclude_img: true,
        excl2ude_links: true,
        exclude_inputs: true
    });
}
//针对IE浏览器
function exportExcel(tableid) //读取表格中每个单元到EXCEL中
{
    var curTbl = document.getElementById(tableid);
    //var oXL = new ActiveXObject("Excel.Application");
    try {
        oXL = new ActiveXObject("Excel.Application"); //创建AX对象excel
    } catch (e) {
        alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
        return false;
    }
    //创建AX对象excel
    var oWB = oXL.Workbooks.Add();
    //获取workbook对象
    var oSheet = oWB.ActiveSheet;
    //激活当前sheet
    var Lenr = curTbl.rows.length;
    //取得表格行数
    for (i = 0; i < Lenr; i++) {
        var Lenc = curTbl.rows(i).cells.length;
        //取得每行的列数
        for (j = 0; j < Lenc; j++) {
            oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
            //赋值
        }
    }
    oXL.Visible = true;   //设置excel可见属性
}
//--------导出excel文件end--------

//--------------某个时间段的营业状况-----------------
//加载营业额
$.loadTotalData = function (st, et, sno) {
    var info = {"startTime": st, "endTime": et, "shopNo": sno};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/turnoverStatistics.do",
        data: JSON.stringify(info),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(json);
            //加载营业总览
            $(".stast_total").html("");
            var html = '<table><tr class="title"><td colspan="3">营业总览</td> </tr>';
            var l = json.list.length;
            var t1 = 0;
            for (var i = 0; i < l; i++) {
                t1 += json.list[i].allAmt;
            }
            html += '<tr class="display"><td><p>' + t1 + '</p><p>营业额</p></td>';

            html += '</tr></table>';
            $(".stast_total").append(html);

            //有效订单数
            $.loadOrderNum(st, et, t1, sno);
        }
    });
}
//请求每家店的订单数
$.loadOrderNum = function (st, et, t1, sno) {
    var info = {"startTime": st, "endTime": et}

    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/orderCountShop.do",
        data: JSON.stringify(info),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            console.log(data);
            var html = '';
            var n1 = 0;
            var e = 0;
            if (sno == "") {
                var l = data.list.length;
                for (var i = 0; i < l; i++) {
                    n1 += data.list[i].orderCount;
                }
            } else {
                n1 = $.singleOrderNum(sno, data);
            }
            if (n1 != 0) {
                e = t1 / n1;
            }
            html += '<td><p>' + n1 + '</p><p>有效订单数</p></td>'
            html += '<td><p>' + e.toFixed(2) + '</p><p>客单价</p></td>';
            $(".stast_total table tr:eq(1)").append(html);

        }

    })
}

//加载所有店铺名称
$.loadShopName = function () {
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchShop.do",
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(json);
            var l = json.shopList.length;
            var html = '<select><option data-shopno="">全部</option>';
            for (var i = 0; i < l; i++) {
                var t = json.shopList[i];
                html += '<option data-shopno="' + t.shopNo + '">' + t.shopName + '</option>';
            }
            html += '</select>';
            $(".shop_show").append(html);
        }
    });
}

//加载营业趋势图
//    x轴代表时间，y轴代表营业额
$.loadTendency = function (st, et, sno) {
    var info = {"startTime": st, "endTime": et, "shopNo": sno}
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/turnOverEachDay.do",
        data: JSON.stringify(info),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(json);
//--------绘制图表begin---------
            $("#staChart").html("");
            //计算时间间隔
            var sdate = new Date(st.replace("-", "/").replace("-", "/"));
            var edate = new Date(et.replace("-", "/").replace("-", "/"));
            var i = (edate - sdate) / 24 / 3600 / 1000 + 1;
            console.log(i);
            var interval;
            if (i == 1) {
                $("#staChart").css("display", "none");
            } else if (i >= 2 && i <= 10) {
                interval = 1;
            } else if (i >= 11 && i <= 30) {
                interval = 3;
            } else if (i >= 31 && i >= 60) {
                interval = 5;
            } else if (i >= 61 && i <= 120) {
                interval = 10;
            } else if (i >= 121 && i <= 365) {
                interval = 30;
            } else {
                interval = 180;
            }
            if (i >= 2) {
                var theme = $(".type_select dd.active").text();
                var titleText = theme + "趋势图";
                var l = json.list.length;
                if (l > 0) {
                    $(".panel").css("display", "block");
                    $(".stast_detail").css("display", "block");
                    var x = new Array();  //x轴（两个日期之间的所有日期）
                    for (var d = 0; d < l; d++) {
                        x[d] = json.list[d].date;
                    }
                    var y = new Array();            //y轴
                    for (var j = 0; j < i; j++) {
                        y[j] = json.list[j].allAmt;
                    }
                    var options = {
                        chart: {
                            renderTo: 'staChart',
                            type: 'spline',
                        },
                        title: {
                            text: titleText
                        },
                        xAxis: {
                            tickInterval: interval,
                            categories: x,
                            labels: {
                                x: 45
                            }
                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        series: [{
                            name: theme,
                            data: y
                        }],
                        legend: {
                            align: 'right',
                            verticalAlign: 'top',
                            x: -10,
                            y: 50,
                            floating: true
                        }
                    };
                    var chart = new Highcharts.Chart(options);
                    selectChart();
                    //    加载详细数据
                    $.loadDetail(json);
                } else {//没有数据的情况下
                    $(".panel").css("display", "none");
                    $(".stast_detail").css("display", "none");
                }
            }
        }
    })
}

//详细数据
$.loadDetail = function (json) {
    var html = '';
    $(".stast_detail").css("display", "block");
    var l = json.list.length;
    var total = 0;
    if (l > 0) {
        for (var i = 0; i < l; i++) {
            var t = json.list[i];
            html += '<tr><td>' + t.date + '</td><td>' + t.allAmt + '</td></tr>';
            total += t.allAmt;
        }
        html = '<tr><td>汇总</td><td>' + total + '</td></tr>' + html;
        $(".stast_detail table tr").eq(1).nextAll().remove();
        $(".stast_detail table").append(html);
    } else {
        $(".stast_detail").css("display", "none");
    }

}
//选择店铺后刷新页面
$("#business .shop_show").on("change", "select", function () {
    //var s = $("#date_1").val();
    //var e = $("#date_2").val();
    console.log("选择店铺后刷新页面");
    var s = "2016-01-21";
    var e = "2016-01-30";
    var no = $(this).find("option:selected").attr("data-shopno");
    $.loadTotalData(s, e, no);
    $.loadTendency(s, e, no);
});

//某个店铺的订单数
$.singleOrderNum = function (no, data) {
    var l = data.list.length;
    var t;
    for (var i = 0; i < l; i++) {
        t = data.list[i];
        if (t.shopNo == no) {
            return t.orderCount;
            break;
        }
    }
    if (i >= l) {
        return 0;
    }

}
//-------------------商品统计begin-----------------

$(function () {
    //var st=$("date_3").val();
    //var et=$("date_4").val();
    //测试数据
    var st = "2016-01-21";
    var et = "2016-01-30";

    $.loadSale(st, et, "", "", 1, 2);//加载全部商店所有类别商品的销量
    $.loadItemClass();//加载商品类别

})

//统计商品的销量
$.loadSale = function (st, et, it, no, index, count) {

    var info = {"startTime": st, "endTime": et, "itemClass": it, "shopNo": no, "pageIndex": index, "pageCount": count}
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/salesClassName.do",
        data: JSON.stringify(info),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(json);
            var l = json.list.length;
            if (l == 0) {
                $(".commodity_details table").css("display", "none");
                $(".commodity_details h3").css("display", "block");
            } else {


                $(".commodity_details table").css("display", "block");
                $(".commodity_details h3").css("display", "none");
                $(".commodity_details table tbody").html("");
                var html = '';
                var t;
                for (var i = 0; i < l; i++) {
                    t = json.list[i];
                    html += '<tr><td>' + t.itemName + '</td><td>' + t.price + '</td><td>' + t.itemSize + '</td>';
                    html += '<td>' + t.allQty + '</td><td>' + t.price * t.allQty + '</td></tr>';//销售额为价格x数量
                }
                html += '<tr><td colspan="5"><span class="pre_page"><a>上一页</a></span><span id="pageIndex"></span>/<span id="totalPage"></span>页<span class="next_page"><a>下一页</a></span></td></tr>';
                $(".commodity_details table tbody").append(html);
                $("#pageIndex").text(index);
                $("#totalPage").text(json.pageSize);
                if (json.pageSize == 1) {
                    $(".next_page").css("visibility", "hidden");
                }
                if (index == 1) {
                    $(".pre_page").css("visibility", "hidden");
                } else {
                    if (index == json.pageSize) {
                        $(".next_page").css("visibility", "hidden");
                        $(".pre_page").css("visibility", "visible");
                    } else {
                        $(".next_page").css("visibility", "visible");
                        $(".pre_page").css("visibility", "visible");
                    }
                }
            }
        }
    })
}
//点击下一页
$(".commodity_details table").on("click", ".next_page", function () {
    //var st=$("#date_3").val();
    //var et=$("#date_4").val();
    var it = $(".genre select").find("option:selected").attr("data-itemclass");
    var no = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
    var next = parseInt($("#pageIndex").text()) + 1;
    console.log(next);
    //测试数据
    var st = "2016-01-21";
    var et = "2016-01-30";
    $.loadSale(st, et, it, no, next, 2);
});
//或上一页
$(".commodity_details table").on("click", ".pre_page", function () {
    //var st=$("#date_3").val();
    //var et=$("#date_4").val();
    var it = $(".genre select").find("option:selected").attr("data-itemclass");
    var no = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
    var pre = parseInt($("#pageIndex").text()) - 1;
    console.log(pre);
    //测试数据
    var st = "2016-01-21";
    var et = "2016-01-30";
    $.loadSale(st, et, it, no, pre, 2);

});
//加载商品类别
$.loadItemClass = function () {
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchItemClass.do",
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(json);
            var html = '';
            var l = json.classList.length;
            var t;
            html += '<select><option data-itemclass="">全部</option>';
            for (var i = 0; i < l; i++) {
                t = json.classList[i];
                html += '<option data-itemclass="' + t.itemClass + '">' + t.className + '</option>';
            }
            html += '</select>';
            $(".genre").append(html);
        }
    });
}

//选择店铺后刷新页面
$("#commodity .shop_show").on("change", "select", function () {
    var no = $(this).find("option:selected").attr("data-shopno");
    console.log(no);
    //var st=$("date_3").val();
    //var et=$("date_4").val();
    var it = $(".genre select").find("option:selected").attr("data-itemclass");
    var st = "2016-01-21";
    var et = "2016-01-30";
    $.loadSale(st, et, it, no, 1, 2);
});
//选择类别后刷新页面
$(".genre").on("change", "select", function () {
    var it = $(this).find("option:selected").attr("data-itemclass");
    console.log(it);
    var no = $("#commodity .shop_show select").find("option:selected").attr("data-shopno");
    //var st=$("date_3").val();
    //var et=$("date_4").val();
    var st = "2016-01-21";
    var et = "2016-01-30";
    $.loadSale(st, et, it, no, 1, 2);
});

//-------------------商品统计end-----------------




