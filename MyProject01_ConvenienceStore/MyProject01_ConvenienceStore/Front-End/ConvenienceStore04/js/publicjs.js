/**
 * Created by lenovo on 2016-03-01.
 */
function isLoad(){
    var sysUser=JSON.parse($.cookie("sysUser"));
    if(sysUser!=null){
        $("#user").html('<span class="glyphicon glyphicon-user"></span> '+sysUser.custNo+' <span class="caret"></span>');

        if(sysUser.role==1){
            $(".role-2").remove();
        }else if(sysUser.role==2){
            $(".role-1").remove();
        }
    }else{
        window.location="login_Back.html";
    }
}
//获取地址信息
function getUrlParam(name){
    var reg =new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null){
        return r[2];
    }
    return null;
}
//加载徽章中的待处理订单数目
function get_data() {
    var x = {querystatu: "1", shopNo: "", startTime: "", endTime: "", pageIndex: "1", pageCount: "4"};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchOrders.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json = data;
            if (json.not == 0) {
                $("#badgeOrder").html("");
            } else {
                $("#badgeOrder").html(json.not);
            }

        }
    });
}

//页码拼接
function showPage(pageSize, pageIndex) {
    //页数小于6
    pageIndex = Number(pageIndex);
    pageSize = Number(pageSize);
    var html = '<li><a class="forword" href="javascript:void(0);" >&laquo;</a></li>';
    if (pageSize <= 6) {
        for (var i = 1; i <= pageSize; i++) {
            if (i == pageIndex) {
                html += '<li><a class="active" href="javascript:void(0);" >' + i + '</a></li>'
            }
            else {
                html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
            }
        }
    }
    else {
        if (pageIndex <= 3){
            for (var i = 1; i <= 5; i++) {
                if (i == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + i + '</a></li>'
                } else {
                    html += '<li><a href="javascript:void(0);">' + i + '</a></li>';
                }
            }
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';
        }
        else if (pageIndex > pageSize - 3) {
            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>';
            for (var i = 4; i >= 0; i--) {
                var p = pageSize - i;
                if (p == pageIndex) {
                    html += '<li><a class="active" href="javascript:void(0);" >' + p + '</a></li>'
                } else {
                    html += '<li><a href="javascript:void(0);">' + p + '</a></li>';
                }
            }
        }
        else {

            html += '<li><a href="javascript:void(0);" >1</a></li><li><a href="javascript:void(0);">…</a></li>'
            html += '<li><a href="javascript:void(0);">' + (pageIndex - 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex - 1)+ '</a></li>';
            html += '<li><a class="active" href="javascript:void(0);">' + pageIndex + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 1) + '</a></li>';
            html += '<li><a href="javascript:void(0);">' + (pageIndex + 2) + '</a></li>';
            html += '<li><a href="javascript:void(0);">…</a></li>';
            html += '<li><a href="javascript:void(0);">' + pageSize + '</a></li>';

        }

    }
    html += ' <li><a class="next" href="#">&raquo;</a></li>';
    return html;
}

//全选
function selectall() {
    $("#allSelect").click(function () {
        $(".cart-checkbox").prop("checked", this.checked);
    })
}
//更新待处理订单数目
function updateData() {
    setInterval("get_data()", 30000);//30秒一次执行get_data()刷新数据
}
//价格处理函数
function pricefixto(price){
    return (Number(price)).toFixed(2);
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
           //点击页码后刷新界面的操作

        }else if($(this).hasClass("forword")){
            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            //点击页码后刷新界面的操作
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            var json=getCondition(pageIndex);
            //点击页码后刷新界面的操作
        }

    })
};