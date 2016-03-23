/**
 * Created by lenovo on 2015-12-03.
 */
/**顶部中间搜索的*/
//搜索商品
$.fn.mysearch=function(){
    $("#searchitem").on("click",function(){

        var x=$("#mysearch").val();
        console.log(x);
        if(x==""){
            return;
        }
        x=encodeURI(x);
        location.href='goodsList.html?key='+x;
    })

}