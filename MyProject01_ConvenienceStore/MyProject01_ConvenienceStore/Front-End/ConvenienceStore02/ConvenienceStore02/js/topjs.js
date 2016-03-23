/**
 * Created by lenovo on 2015-12-03.
 */
/**顶部登录信息，地址等*/
//其他页面加载顶部地址信息
$.fn.otherpageapos= function () {
    var pos=getCookie('proeare')
    $("#cityname").attr("value",pos);
}

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
    $("#mysearch").on("input propertychange", function () {
        var x=$("#mysearch").val();
        y={"name":x,"address":"福州-台江区-幸福小区"}
        $.ajax({
            type:"post",
            data:JSON.stringify(y),
            dataType:"json",
            url:"http://192.168.199.242:8080/BSMD/item/findlist.do",
            header:{"Content-Type":"application/json",
                "Accept":"application/json"},
            success:function(data){
                var html='';
                $(".findlist>ul").children("li").remove();
                for(i=0;i<data.name.length;i++){
                    html+='<li class="cont"><a href="#">'+data.name[i]+'</a></li>';
                }
                $(".findlist>ul").append(html);
                $(".findlist").show();
            }
        })
    })
    $("#mysearch").on("blur", function () {
        $(".findlist").hide();
    })

}
//顶部地址重新选择
//顶部地址重新选择
$.fn.poschange=function(){
    $("#cityname").on("focus", function () {
        $(".hd-prochg").show();
        showcit();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();

    })
    $("#cityname").on("blur", function () {
        $(".hd-prochg").hide();
    })
}