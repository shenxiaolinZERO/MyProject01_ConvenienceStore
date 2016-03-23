/**
 * Created by lenovo on 2015/12/10.
 */
/*--------------------------加载 “我的收藏夹” -----------------------------*/
$(document).ready(function(){
    loadMylike();

    //loadMyhistory();

})



/*-----------------喜欢的商品-----------------*/
function loadMylike(){
    var x={"username":"hh"};
    console.log(x);
    $.ajax({
        type:"post",
        url:"http://192.168.199.233:8080/BSMD/getUserCollection.do",
        data:JSON.stringify(x),
        dataType:"json",
        header:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json=data;
            console.log(data);
            //
            var html1 = '';
            for(var i=0;i<json.collection.length;i++) {

                html1 +='<div class="col-md-3 product">';
                html1 +='<a href="#"><img src="'+json.collection[i].url+'"></a>';
                html1 +='<div class="product-bottom">';
                html1 +='<span class="price">'+'¥'+' '+json.collection[i].item_sale_price+'</span>';
                html1 +='<p><a>'+json.collection[i].item_name+' '+json. collection[i].item_size+'*'+json.collection[i].item_pack+'/'+json.collection[i].item_unit_no+'</a></p>';
                html1 +='<button type="button" class="btn">取消收藏</button>';
                html1 +='</div>';
                html1 +='</div>';
            }
            $("#like").append(html1);
            deleteCollection();
        }
    })
}

/*-----------------取消收藏-----------------*/

function deleteCollection(){
    $(".product-bottom button").on("click",function(){
        var x={"username":"hh","itemNo":"1"};
        console.log(x);
        $.ajax({
            type:"post",
            url:"http://192.168.199.233:8080/BSMD/deleteCollection.do",
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
                    $(".col-md-3").remove();
                }


            }
        })

    });

}

/*-----------------浏览记录-----------------*/
//function loadMyhistory(){
//    var x={"username":"hh"};
//    console.log(x);
//    $.ajax({
//        type:"post",
//        url:"http://192.168.199.233:8080/BSMD/getUserPosStamp.do",
//        data:JSON.stringify(x),
//        dataType:"json",
//        header:{
//            "Content-Type": "application/json",
//            "Accept": "application/json"
//        },
//        success: function (data) {
//            var json=data;
//            console.log(data);
//            //
//            var html2 = '';
//            for(var i=0;i<json.posStamp.length;i++) {
//
//                html2 +='<div class="col-md-2 span_6">';
//                html2 +='<div class="box_inner">';
//                html2 +='<a href="#">';
//                html2 +=' <img src=" '+     "json.showcar[i].url"   +'" class="img-responsive" alt=""/>';
//                html2 +='<div class="desc">';
//                html2 +=' <h4 class="proprice"><span class="price">￥</span>'+   "43.80"  +'</h4>';
//                html2 +=' <p><a>'+ "张裕 红酒 海岸风情干红葡萄酒 750ML"  +'</a></p>';
//                html2 +='</div>';
//                html2 +=' </a>';
//                html2 +='</div>';
//                html2 +='</div>';
//
//            }
//            $("#history").append(html2);
//        }
//    })
//}