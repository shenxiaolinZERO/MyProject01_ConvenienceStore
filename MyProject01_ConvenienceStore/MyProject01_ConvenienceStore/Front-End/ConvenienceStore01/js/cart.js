

//
function loadItem() {
    var x={"cust":"cust01", "areaName":"明阳小区"};
    $.ajax({
        type: "post",
        url: "http://192.168.199.241:8080/BSMD/car/showCar.do",
        data:JSON.stringify(x),
        dataType: "json",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        success: function (data) {
            var json = data;
            console.log(data);
            var html1 = '';
            for(var i=0;i<json.showcar.length;i++){
                html1 +='<tr class="center">';
                html1 +='<td class="cart-tb"><p align="left"><input type="checkbox">'+json.showcar[i].itemNo+'</td>';
                html1 +='<td class="cart-tb"><p align="left"><img class="cartimg" src="'+json.showcar[i].url+'"><a href="#">'+json.showcar[i].itemName+'</a></td>';
                html1 +='<td class="cart-tb">'+json.showcar[i].shopNameList[i].shopNo+'、'+json.showcar[i].shopNameList[i].shopName+'</td>';
                html1 +='<td class="cart-tb">'+json.showcar[i].itemSalePrice+'</td>';
                html1 +='<td class="cart-tb"><div class="prod-buychoose">';
                html1 +='<dl class="pProps" id="choosenum1"><dd id="choose-num1">';
                html1 +='<input type="text" class="spinner" no-repeat">';
                html1 +='</dd></dl></div></td>';
                html1 +='<td>'+json.showcar[i].totalPrice+'</td>';//该商品总价
                html1 +='<td class="cart-tb"><a href="#">移入收藏夹</a>/<a href="#">删除</a></td>';
                html1 +='</tr>';
            }
           $("#list1").append(html1);
           $('.spinner').spinner({});

            /*-------------选择店铺-------------------*/
            for(var i=0;i<json.showcar.length;i++){
                var html2 = '';
                html2 +='<input class="shop" type="radio" name="shop"  checked="checked" value="0" data-value="">';
                html2 +='<span>'+json.showcar[i].shopNameList[i].shopNo+'、'+json.showcar[i].shopNameList[i].shopName+'</span><br>';
            }
           $(".table2 .shoplist").append(html2);

        }
    })
}