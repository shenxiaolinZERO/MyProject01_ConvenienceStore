/**
 * Created by Administrator on 2015/11/7.
 */
$(document).ready(function(){
    $.lodalist();
    $("#home").click(function(){
        location.href="index.html";
    })
    $("#sort").click(function(){
        location.href="sort.html";
    })
});

$.lodalist=function(){
    var json=[{"pic":"image/heiren.jpg","name":"黑人（DARLIE）双重薄荷牙膏225克","price":"￥14.90","count":"92918人"},
        {"pic":"image/shushida.jpg","name":"舒适达sensodyne牙膏护理套装","price":"￥78.00","count":"63218人"},
        {"pic":"image/yunnan.jpg","name":"云南白药牙膏180克（留兰香型）","price":"￥23.30","count":"116073人"},
        {"pic":"image/gaolujie.jpg","name":"高露洁360度全面口腔健康牙膏","price":"￥16.90","count":"62560人"},
        {"pic":"image/jiajieshi.jpg","name":"佳洁士（Crest）3D炫白双效牙膏180克","price":"￥14.90","count":"156048人"}];

    var html='';
    for(var i=0;i<json.length;i++)
    {
        html+='<li class="list-group-item bg">';
        html+='<div class="list-thumb">';
        html+='<img src='+json[i].pic+' class="img-responsive" alt=""></div>';
        html+='<div class="list-text"><div class="text-top">';
        html+='<strong class="text1">'+json[i].name+'</strong><strong class="text2">'+json[i].price+'</strong><strong class="text3">'+json[i].count+'</strong>';
        html+='</div></div></li>';
    }
    $('.list-group').append(html);
}

$.lodalist2=function(){
    var json;
    $.ajax({
        type:"post",
        url:"http://192.168.1.73:8080/springmvc/json.action",
        data:{"name":"范伟威是傻掉"},
        dataType:"json",
        header:{"Content-Type":"application/json",
                "Accept":"application/json"},
        success:function(data){
            if(data.length>0){
                json=data;
                var html='';
                for(var i=0;i<json.length;i++)
                {
                    html+='<li class="list-group-item bg">';
                    html+='<div class="list-thumb">';
                    html+='<img src='+json[i].pic+' class="img-responsive" alt=""></div>';
                    html+='<div class="list-text"><div class="text-top">';
                    html+='<strong class="text1">'+json[i].name+'</strong><strong class="text2">'+json[i].price+'</strong><strong class="text3">'+json[i].count+'</strong>';
                    html+='</div></div></li>';
                }
                $('.list-group').append(html);
            }
        }
    });
}

