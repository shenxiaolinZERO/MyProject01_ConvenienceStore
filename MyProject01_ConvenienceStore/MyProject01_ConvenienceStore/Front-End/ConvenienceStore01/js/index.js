/**
 * Created by lenovo on 2015/11/18.
 */
//����һ���˵�
function loadmenu(){
    var json=[{"category":"������ʳ/����1","href":"cat.html"},
        {"category":"������ʳ/����2","href":"cat.html"},
        {"category":"������ʳ/����3","href":"cat.html"},
        {"category":"������ʳ/����4","href":"cat.html"},
        {"category":"������ʳ/����5","href":"cat.html"},
        {"category":"������ʳ/����6","href":"cat.html"},
        {"category":"������ʳ/����7","href":"cat.html"},
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
//��������ʾ2���˵�
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
            //��Ʒ�б�����
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
                html2+='<h4 class="proprice"><span class="price">��</span>'+json.listhot[i].itemSalePrice+'</h4>';
                html2+='<p><a href="goods.html">'+json.listhot[i].itemName+'</a></p></div> </a> </div> </div>';
            }
            $("#topnav1").append(html2);


        }
    })
    //var json=[{"catename":"���","sclist":["���","�۽�","���"]},
    //    {"catename":"����","sclist":["̼������","��֭","ơ��"]}];
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


