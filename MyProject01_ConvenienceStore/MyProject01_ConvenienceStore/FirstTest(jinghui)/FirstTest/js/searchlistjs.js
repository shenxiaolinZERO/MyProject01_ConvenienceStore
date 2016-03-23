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
    var json=[{"pic":"image/heiren.jpg","name":"���ˣ�DARLIE��˫�ر�������225��","price":"��14.90","count":"92918��"},
        {"pic":"image/shushida.jpg","name":"���ʴ�sensodyne���໤����װ","price":"��78.00","count":"63218��"},
        {"pic":"image/yunnan.jpg","name":"���ϰ�ҩ����180�ˣ��������ͣ�","price":"��23.30","count":"116073��"},
        {"pic":"image/gaolujie.jpg","name":"��¶��360��ȫ���ǻ��������","price":"��16.90","count":"62560��"},
        {"pic":"image/jiajieshi.jpg","name":"�ѽ�ʿ��Crest��3D�Ű�˫Ч����180��","price":"��14.90","count":"156048��"}];

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
        data:{"name":"��ΰ����ɵ��"},
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

