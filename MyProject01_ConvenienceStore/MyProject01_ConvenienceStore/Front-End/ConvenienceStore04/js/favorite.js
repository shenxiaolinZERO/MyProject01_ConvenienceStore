/**
 * Created by lenovo on 2015/12/10.
 */
/*--------------------------加载 “我的收藏夹” -----------------------------*/
$(document).ready(function(){
    isload();
    loadname();
    $().otherpageapos();
    $.Menulist();
    loadMylike(1);
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick();
    $().pageclick();


})


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
/*-----------------喜欢的商品-----------------*/
function loadMylike(pageindex){
    var custno=isload();
    var x={"custno":custno,"pageindex":pageindex,"pagecount":1};
    console.log(x);
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/getUserCollection.do",
        data:JSON.stringify(x),
        dataType:"json",
        header:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json=data.list;
            console.log(data);
            //
            var html1 = '';
            if(json.list.length==0){
                html1='<p>还没有收藏东西，赶紧去逛逛吧！！！！<a href="index.html">去逛逛</a></p>'
                $("#like").append(html1);
            }else{
                for(var i=0;i<json.list.length;i++) {

                    html1 +='<div class="col-lg-3 "><div class="product">';
                    html1 +='<a href=itemDetial.html?id="'+json.list[i].item_no+'"><img src="'+json.list[i].url+'"></a>';
                    html1 +='<div class="product-bottom">';
                    html1 +='<p><a>'+json.list[i].item_name+' '+'</a></p>';
                    html1 +='<button type="button" data-id="'+json.list[i].item_no+'" class="cancle">取消收藏</button>';
                    html1 +='</div>';
                    html1 +='</div></div>';
                }
                $("#like").html(html1);
                deleteCollection();
                if(json.pageSize!=1){
                    showPage(json.pageSize, json.pageIndex);
                }

            }

        }
    })
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
        if (pageIndex <= 3) {
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
            loadMylike(pageIndex+1);

        }else if($(this).hasClass("forword")){
            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }
            loadMylike(pageIndex-1);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            loadMylike(pageIndex);

        }

    })
}
/*-----------------取消收藏-----------------*/

function deleteCollection(){
    $(".product-bottom button").on("click",function(){
        var t=$(this).parent().parent().parent();
        var custno=isload();
        var itemno=$(this).attr("data-id");
        if(itemno!=null){
            var x={"custno":custno,"itemNo":itemno};
            console.log(x);
            $.ajax({
                type:"post",
                url: "http://192.168.113.14:8080/BSMD/deleteCollection.do",
                data:JSON.stringify(x),
                dataType:"json",
                header:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (data) {
                    var json=data;
                    console.log(data);
                    if(data.code=="success"){
                        $(t).remove();
                    }
                }
            })

        }

    });

}