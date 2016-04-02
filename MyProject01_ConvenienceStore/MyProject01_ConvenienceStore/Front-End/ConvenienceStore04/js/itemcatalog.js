/**
 * Created by lenovo on 2016-02-27.
 */

/*---------------加载菜单列表---------------*/
$.fn.Menulist = function () {
    $.ajax({
        type: "post",
        url: "http://192.168.113.14:8080/BSMD/item/classlist.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            var json = data;
            console.log(json);
            if(json!=null) {
                //商品列表连接
                var html = '';
                for (var i = 0; i < json.bigclass.length; i++) {
                    html+='<option>'+json.bigclass[i].name+'</option>';
                }
                $("#itemClass").append(html);
            }
        }
    })
};
//商品目录获取
function getCatalog(pageIndex,itemname,bigclass,shopNo){
    var x={"shopno":'101',"itemname":itemname,"classname":bigclass,"pageindex":pageIndex,"pagecount":20};
    $.ajax({
        type: "post",
        data: JSON.stringify(x),
        url: "http://192.168.113.14:8080/BSMD/item/item.do",
        dataType: "json",
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var list=data.itemlist.list;
            if(list.length>=0){
              var html=  setItemCatalog(list);
                $("#catalog").html(html);
                //页码
                showPage(data.itemlist.pageSize,data.itemlist.pageIndex);

            }

        }
    })
}
//商品目录拼接
function  setItemCatalog(list){
    var html='';
    for(var i=0;i<list.length;i++){
        //'<tr><td class="item_all"><input type="checkbox">' +
        html+= '<tr></td> <td class="goods"><img src="'+list[i].url+'"><span>'+list[i].itemName+'</span></td> ' +
            '<td class="sprice"><span>￥'+pricefixto(list[i].itemSalePrice)+'</span></td> <td><span>'+list[i].className+
            '</span></td><td><a  class="picedit" href="editItem.html?id='+list[i].itemNo+'&bc=' +list[i].barcode+' ">商品图片编辑</a></td>'
        html+='</tr>';
    }

    return html;
}
function  getCondition(){
    var itemname=$("#mysearch").val();
    if(itemname==" "){
        itemname="";
    }
    var bigclass=$("#itemClass").val();
    var shopno="";
    if(bigclass=="全部类别"){
        bigclass="";
    }
    return [itemname,bigclass,shopno];
}
/*---页码的跳转---*/
$.fn.pageclick = function () {
    $(".pagination").on("click", "a", function () {
        var x=getCondition();
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
            getCatalog(pageIndex,x[0],x[1],x[2]);
        }else if($(this).hasClass("forword")){
            var page=$(".pagination").find(".active");
            console.log(page);
            var pageIndex=Number($($(page)[0]).text());
            if(pageIndex==1){
                return;
            }

            //点击页码后刷新界面的操作
            getCatalog(pageIndex,x[0],x[1],x[2]);
        }
        else {
            console.log("&laquo;");
            //页码
            var pageIndex = Number($(this).html());
            var json=getCondition(pageIndex);
            //点击页码后刷新界面的操作
            getCatalog(pageIndex,x[0],x[1],x[2]);
        }

    })
}
//获取商品图片
function getItemPic(){
    var itemno=getUrlParam("id");
    var info = {"itemno": itemno};
    $.ajax({
        type: "post",
        url: "http://192.168.113.14:8080/BSMD/item/detail.do",
        data: JSON.stringify(info),
        datatype: "json",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
           console.log("商品图片");
            console.log(data);
            if(data.detail!=null){
                var tit=data.detail.className+"   "+data.detail.itemName+"   ￥"+data.detail.itemSalePrice;
                $(".mycontainer .itemtitle").html(tit);
            }
            if(data.imageTop!=null){
                var top='';
                for(var i=0;i<data.imageTop.length;i++){
                    top+='<div class="col-lg-3 pic-box"> <input type="checkbox" class="checkbox-pic"  > ' +
                        '<img class="img-box" src="'+data.imageTop[i]+'"/></div>';
                }
                $(".top .picrow").html(top);
            }
            if(data.imageDetail!=null){
                var detial='';
                for(var i=0;i<data.imageDetail.length;i++){
                    detial+='<div class="col-lg-3 pic-box"> <input type="checkbox" class="checkbox-pic"  > ' +
                        '<img class="img-box" src="'+data.imageDetail[i]+'"/></div>'
                }
                $(".detail .picrow").html(detial);
            }
            if(data.imageGuige!=null){
                var imageGuige='';
                for(var i=0;i<data.imageGuige.length;i++){
                    imageGuige+='<div class="col-lg-3 pic-box"> <input type="checkbox" class="checkbox-pic"  > ' +
                        '<img class="img-box" src="'+data.imageGuige[i]+'"/></div>'
                }
                $(".standard .picrow").html(imageGuige);
            }
            if(data.imageIndex!=null){
                var thumbnail='<div class="col-lg-3 pic-box"> <input type="checkbox" class="checkbox-pic"  > ' +
                        '<img class="img-box" src="'+data.imageIndex+'"/></div>';
                $(".pic-thumbnail .picrow").html(thumbnail);
            }
            checkAll();
        }
    })
}
//全选按钮
function checkAll(){
    $(".checkbox-all").on("click",function(){
       var x= $(this).parent();
        var picrow=$(x).siblings(".picrow");
        var checkbox=$(picrow).find(".checkbox-pic");
        $(checkbox).prop("checked", this.checked);

    });
    $(".checkbox-pic").on("click", function () {
        var $subs = $(".checkbox-pic");
        var $chqx=$(this).parent().parent();
        var $t=$chqx.siblings(".f-left");
        var $chheckall=$t.find(".checkbox-all");
        $chheckall.prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
    })
}
//删除图片
function  deletePic(){
    $(".mycontainer .f-left .btn-primary").on("click", function () {
        var x= $(this).parent();
        var picrow=$(x).siblings(".picrow");
        var $picbox=$(picrow).find(".pic-box");
        var imgURL=[];
        for(var i=0;i<$picbox.length;i++){
            if($picbox[i].find(".checkbox-pic").is(":checked")){
                imgURL.push($picbox[i].find(".img-box").attr("src"));
            }
        }
        var json={"itemNo":getUrlParam("id"),"imgURL":imgURL};
        $.ajax({
            type:"post",
            dataType:"json",
            data:JSON.stringify(json),
            url:"http://192.168.113.14:8080/BSMD/item/delete.do",
            header: {"Content-type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
            }
        })
    })
}
//图片上传
function uploadfile(){
    var itemno=getUrlParam("id");
    var barcode=getUrlParam("bc");

    $('#file-0a').fileinput({

        language: 'zh',
        uploadUrl: 'http://192.168.113.14:8080/BSMD/image/submit.do?itemNo='+itemno+'&barcode='+barcode+'&imageClass=1',
        allowedPreviewTypes: ['image', 'html', 'text', 'video', 'audio', 'flash']

    });

    $('#file-0a').on('fileuploaderror', function (event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader;
        console.log(data);
        console.log('File upload error');
    });

    $('#file-0a').on('fileerror', function (event, data) {
        console.log(data.id);
        console.log(data.index);
        console.log(data.file);
        console.log(data.reader);
        console.log(data.files);
    });

    $('#file-0a').on('fileuploaded', function (event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader;
        console.log('File uploaded triggered');
    });
}