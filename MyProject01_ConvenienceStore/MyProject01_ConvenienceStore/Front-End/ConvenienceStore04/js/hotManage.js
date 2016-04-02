/**
 * Created by lenovo on 2016-03-10.
 */
$(document).ready(function () {
    isLoad();
    hotList();
    updatePriority();

});
//加载热门商品列表
function hotList(){
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchHotItem.do",
        dataType: "json",
        //data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            var html='';
            for(var i=0;i<json.list.length;i++){
                html+='<tr>';
                html+='<td class="goods"><span target="_blank" data-itemNo="'+json.list[i].itemNo+'">'+json.list[i].itemName+'</span>';
                html+='<td class="pri"><span>'+json.list[i].orderNo+'</span></td>';
                html+='<td><a id="update" style="display: block" data-toggle="modal"  data-target="#myUpdate">修改</a></tr>';
            }
            $("#hotItem").html("");
            $("#hotItem").append(html);
        }
    });
}
//修改优先级
function updatePriority(){
   $("tbody#hotItem").on("click","tr td a#update",function(){
       var name=$(this).parent().parent().children(".goods").children().html();
     var no=$(this).parent().parent().children(".goods").children().attr("data-itemNo");//商品编号
     var pri=$(this).parent().parent().children(".pri").children().html();
       $("#HotName").html(name);
       $("#priority").val(pri);
       $("#submitPri").click(function(){
           pri= $("#priority").val();
           var x={itemNo:no,orderNo:pri};
           $.ajax({
               type: "post",
               url: "http://192.168.113.15:8080/BSMD/Administrator/changeOrder.do",
               dataType: "json",
               data: JSON.stringify(x),
               header: {"Content-Type": "application/json", "Accept": "application/json"},
               success: function (data) {
                   console.log(data);
                   var d=$("table tbody#hotItem tr");
                   $.each(d,function (){
                       var itemNo=$(this).children(".goods").children().attr("data-itemNo");
                       if(itemNo==no){
                           $(this).children("td.pri").remove();
                           var html='<td class="pri"><span>'+pri+'</span></td>';
                           $(this).children("td.goods").after(html);

                       }
                   })

               }
           });
       });
   });
}

