/**
 * Created by lenovo on 2016-01-30.
 */
$(document).ready(function () {

    isLoad();
    //get_data();//先加载待处理订单数
    //updateData();//30秒一次刷新待处理订单数据
    //加载公告记录
    newsList(1, 2);
    publish();
    deleteNews();
    batchDelete();
    $().pageclick();


})
// var str=new Array();
//var url=new Array();
//加载公告记录
function newsList(Index, Count) {
    //str.length=0;
    //url.length=0;
    var x = {pageIndex: Index, pageCount: Count};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchAnnounce.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json = data;
            var html = '';
            var temp;
            var str = new Array();
            var url = new Array();
            var len = json.List.length;
            console.log("changdu" + len);
            for (var i = 0; i < len; i++) {
                temp = json.List[i];
                html += '<tr data-no="' + temp.announceNo + '"><td class="item_all"><input type="checkbox" class="cart-checkbox cart-checkbox-checked"></td>';
                html += '<td>' + temp.announce.announceTitle + '</td>';
                html += '<td class="announceContent">' + '<span class="acont">' + temp.announce.announceContent + '</span>' + '<span class="switch">展开</span></td>';
                html += '<td class="annurl">' + '<span class="aurl">' + temp.announce.url + '</span>' + '<span class="switch">展开</span></td>';
                html += '<td>' + temp.timeString + '</td>';
                html += '<td >' + temp.username + '</td>';
                html += '<td ><a id="deleteNews">删除</a></td></tr>';
                str[i] = temp.announce.announceContent;
                url[i] = temp.announce.url;
            }
            $("#releaseNew table tbody").html('');
            $("#releaseNew table tbody").append(html);
            hideWords(str, url);
            switchwords(str, url);
            var html1 = showPage(json.pageSize, json.pageIndex);
            $(".pag>.pagination").html(html1);
        }
    });
}
//隐藏字符
function hideWords(str, url) {
    var w;
    var text1, text2;
    for (var i = 0; i < str.length; i++) {
        w = $("#releaseNew table tbody tr").eq(i);
        text1 = w.find(".acont").text();
        text2 = w.find(".aurl").text();
        if (text1.length >= 11) {
            w.find(".acont").text(text1.substr(0, 9) + "...");
        } else {
            w.find(".acont").next().remove();
        }
        if (text2.length >= 20) {
            w.find(".aurl").text(text2.substr(0, 19) + "...");
        } else {
            w.find(".aurl").next().remove();
        }
    }
}
//展开与隐藏
function switchwords(str, url) {
    $("#releaseNew table tbody tr td.announceContent ").on("click", ".switch", function () {
        var tr = $(this).closest('tr').index();
        var text = str[tr];
        if ($(this).text() == "展开") {
            $(this).siblings().text(text);
            $(this).text("隐藏");
        } else {
            text = text.substr(0, 9) + "...";
            $(this).siblings().text(text);
            $(this).text("展开");
        }
    });
    $("#releaseNew table tbody tr td.annurl").on("click", " .switch", function () {
        var tr = $(this).closest('tr').index();
        var text = url[tr];
        if ($(this).text() == "展开") {
            $(this).siblings().text(text);
            $(this).text("隐藏");
        } else {
            text = text.substr(0, 19) + "...";
            $(this).siblings().text(text);
            $(this).text("展开");
        }
    });
}
//点击发布
function publish() {
    $("#publishnews").on("click", function () {
        var title = $("#Title").val();
        var cont = $("#content").val();
        var url = $("#url").val();
        var x = {userNo: "CU011601230000", "announceTitle": title, "announceContent": cont, "URL": url};
        console.log(x);
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/releaseAnnounce.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                alert("发布成功！")
                //加载公告记录
                newsList(1, 2);
            }
        })
    });
}
//删除某条公告记录
function deleteNews() {
    $("#releaseNew table").on("click", "tr td a#deleteNews", function () {
        var no = [];
        no[0] = $(this).parent().parent().attr("data-no");
        var x = {announceNos: no};
        deleteAjax(x);
        $(this).parent().parent().remove();
    });
}
//批量删除
function batchDelete() {
    $("#batchDelete").on("click", function () {
        var d = $("table tbody#newsContent tr");
        var i = 0;
        var no = [];
        $.each(d, function () {
            var check = $(this).children(".item_all").children("input").is(':checked');
            if (check) {
                no[i] = $(this).attr("data-no");
                i = i + 1;
            }
        })
        var x = {announceNos: no};
        deleteAjax(x);
        newsList(1, 2);
    });
}
function deleteAjax(x) {
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/deleteAnnounce.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);

        }
    });
}

/*---页码的跳转---*/
$.fn.pageclick = function () {
    $(".pagination").on("click", "a", function () {
        if ($(this).html() == "…") {
            return;
        } else if ($(this).hasClass("active")) {
            return;
        } else if ($(this).hasClass("next")) {

            var page = $(".pagination").find(".active");
            console.log(page);
            var pageIndex = Number($($(page)[0]).text());
            if ($(this).prev().hasClass("forword")) {
                return;
            }
            pageIndex = pageIndex + 1;
            newsList(pageIndex, 2)

        } else if ($(this).hasClass("forword")) {
            var page = $(".pagination").find(".active");
            console.log(page);
            var pageIndex = Number($($(page)[0]).text());
            if (pageIndex == 1) {
                return;
            }
            pageIndex = pageIndex - 1;
            newsList(pageIndex, 2)
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            newsList(pageIndex, 2);
        }

    })
}
