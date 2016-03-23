/**
 * Created by lenovo on 2015/11/18.
 */
//加载一级菜单
function loadmenu(){
    var json=[{"category":"休闲零食/饮料1","href":"cat.html"},
        {"category":"休闲零食/饮料2","href":"cat.html"},
        {"category":"休闲零食/饮料3","href":"cat.html"},
        {"category":"休闲零食/饮料4","href":"cat.html"},
        {"category":"休闲零食/饮料5","href":"cat.html"},
        {"category":"休闲零食/饮料6","href":"cat.html"},
        {"category":"休闲零食/饮料7","href":"cat.html"},
    ]
    var html='';
    for(var i=0;i<json.length;i++)
    {
        html+='<div class="odd" data-order="0" data-id='+i+'>';
        html+='<p><a href='+json[i].href+'><span class="glyphicon glyphicon-cutlery"></span>'+json[i].category+'</a></p>';
        html+='</div>';
    }
    $(".col-md-2.mainmenu").append(html);
}
//鼠标放上显示2级菜单
function onmenu(){
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/item/index.do",
        dataType:"json",
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){

            var json = data;
            console.log(data);
                   var html='';
                    //for(i=0;i<json.bigclass.length;i++){
                    //
                    //    html+='<div class="col-md-6 submenu1"><div class="row"><div class="row">';
                    //    html+='<div class="subleft"><h3><a>'+json[i].catename+'</a></h3></div><div class="subright">';
                    //    var secate='';
                    //    for(j=0;j<json[i].sclist;j++){
                    //        secate+='<li><a>'+json[i].sclist[i]+'</a></li>';
                    //    }
                    //    html+=secate+'</ul></div>';
                    //}
                    //$(".col-md-2.mainmenu").after();
            console.log(data);
            //商品列表连接
            for(var i=0;i<json.bigclass.length;i++)
            {
                html+='<div class="odd" data-order="0" data-id='+i+'>';
                html+='<p><a href="cat.html"><span class="glyphicon glyphicon-cutlery"></span>'+json.bigclass[i].name+'</a></p>';
                html+='</div>';
            }
            $(".col-md-2.mainmenu").append(html);
            var html2="";
            for(var i=0;i<json.listhot.length;i++)
            {
                html2+='<div class="col-md-2 span_6"><div class="box_inner"><a href="goods.html">';
                html2+='<img src="'+json.listhot[i].url+'"class="img-responsive" alt=""/><div class="desc">'
                html2+='<h4 class="proprice"><span class="price">￥</span>'+json.listhot[i].itemSalePrice+'</h4>';
                html2+='<p><a href="goods.html">'+json.listhot[i].itemName+'</a></p></div> </a> </div> </div>';
            }
            $("#topnav1").append(html2);


        }
    })
    //var json=[{"catename":"坚果","sclist":["坚果","蜜饯","肉干"]},
    //    {"catename":"饮料","sclist":["碳酸饮料","果汁","啤酒"]}];
    //var html='';
    //for(i=0;i<json.length;i++){
    //
    //    html+='<div class="subblock">';
    //    html+='<div class="subleft"><h3><a>'+json[i].catename+'</a></h3></div><div class="subright"><ul>';
    //    var secate='';
    //    for(j=0;j<json[i].sclist.length;j++){
    //        secate+='<li><a>'+json[i].sclist[j]+'</a></li>';
    //    }
    //    html+=secate+'</ul></div></div> ';
    //}
    //html+='</div> </div> </div>'
    //$(".submenu1 .row .col-md-4").append(html);
}


