/**
 * Created by lenovo on 2015-12-01.
 */
function setCookie(proeare,value,expireday){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expireday);
    document.cookie=proeare+"="+encodeURI(value)+
        ((expireday==null)?"":";expires="+exdate.toGMTString());
}
function getCookie(proeare){
    if(document.cookie.length>0){
        c_start=document.cookie.indexOf(proeare + "=");
        console.log(c_start);
        if(c_start!=-1){
            c_start=c_start+proeare.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if(c_end==-1){
                c_end=document.cookie.length;
            }
            return decodeURI(document.cookie.substring(c_start,c_end));
        }
        return "";
    }

}
function checkCookie(){
    proeare=getCookie('proeare');
    if(proeare!=null && proeare!=""){
        $("#cityname").attr("value",proeare);
        return;
    }
    else{
        $("#myModal").modal('show');
        showCity();
        $().proclick();
        $().cityclick();
        $().countyclick();
        $().villclick();
        //确定后顶部地址显示
        $("#subpos").position();

    }

}
//选择省，显示市
$.fn.proclick=function(){
    $("#province").on("click","a",function(){

        $("#curSelect").attr("data-position","");
        var e=$(this).text();
        $("#province").attr("data-name",e);
       // $("#curSelect").attr("data-position",e);
        $("#tabpro").removeClass("active");
        $("#tabcity").addClass("active");
        $("#province").removeClass("active in");
        $("#city").addClass("active in");
        //改变tab ul的显示

    })
    $("#pro").on("click","a", function () {
        //$("#cityname").attr("data-position","");
        e=$(this).text();
        $("#pro").attr("data-name",e);
        $("#cityname").attr("data-position",e);
        $("#toppro").removeClass("active");
        $("#topcit").removeClass("_none");
        $("#topcit").addClass("active");
        $("#pro").removeClass("active in");
        $("#cit").addClass("active in");
    })
}
//选择市，显示县区
$.fn.cityclick= function() {
    $("#city").on("click","a",function () {
        var  e=$(this).text();
        $("#tabcity>a").text(e);
        //var pos=$("#curSelect").attr("data-position");
        //pos=pos+e;
        //$("#curSelect").attr("data-position",pos);
        $("#city").attr("data-name",e);
        $("#tabcity").removeClass("active");
        $("#tabcounty").addClass("active");
        $("#city").removeClass("active in");
        $("#eare").addClass("active in");

        //删除旧的县区子元素
        $("#eare").children("a").remove();
        //改变 ul的显示
        showcounty(e);
    });
    $("#cit").on("click","a",function(){
        var  e=$(this).text();
        $("#topcit>a").text(e);
        //var pos=$("#cityname").attr("data-position");
        //pos=pos+e;
        //$("#cityname").attr("data-position",pos);
        $("#cit").attr("data-name",e);
        $("#topcit").removeClass("active");
        $("#topear").removeClass("_none");
        $("#topear").addClass("active");
        $("#cit").removeClass("active in");
        $("#ear").addClass("active in");

        showear(e);
    })
}
//选择县区，显示小区
$.fn.countyclick=function(){
    $("#eare").on("click","a",function () {
        var e=$("#city").attr("data-name");
        var b=$(this).text();
        $("#tabcounty>a").text(b);
       // var pos=$("#curSelect").attr("data-position");
        //pos=pos+b;
        //$("#curSelect").attr("data-position",pos);
        $("#eare").attr("data-name",b);
        $("#tabcounty").removeClass("active");
        $("#tabvillage").addClass("active");
        $("#village").addClass("active in");
        $("#eare").removeClass("active in");
        //删除旧的小区元素
        $("#village").children("a").remove();
        showShop(e,b);
    });
    $("#ear").on("click","a",function () {
        var e=$("#cit").attr("data-name");
        var b=$(this).text();
        $("#topear>a").text(b);
        $("#ear").attr("data-name",b);
        //var pos=$("#cityname").attr("data-position");
        //pos=pos+b;
        //$("#cityname").attr("data-position",pos);
        $("#topear").removeClass("active");
        $("#topvil").removeClass("_none");
        $("#topvil").addClass("active");
        $("#vil").addClass("active in");
        $("#ear").removeClass("active in");
        //删除旧的小区元素

        showvil(e,b);
    });
}
//选择小区完成
$.fn.villclick= function () {
    $("#village").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#tabvillage>a").text(e);
        $("#village").attr("data-name",e);
       // var pos=$("#curSelect").attr("data-position");
       // pos=pos+e;
       // $("#curSelect").attr("data-position",pos);
        $("#curSelect").val(pos);
        $(".selectpro").hide();
    })

    $("#vil").on("click","a",function(){
        //取得选择的小区
        var e=$(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name",e);
        //var pos=$("#cityname").attr("data-position");
        //pos=pos+e;
        //$("#cityname").attr("data-position",pos);
        //$("#cityname").val(pos);
        $(".hd-prochg").hide();
        var pos=$("#cit").attr("data-name")+$("#ear").attr("data-name")+$("#vil").attr("data-name");
        var post=$("#cit").attr("data-name")+"-"+$("#ear").attr("data-name")+"-"+$("#vil").attr("data-name");
        $("#cityname").attr("data-positon",pos);
        $("#cityname").attr("data-cityname",post);
        $("#cityname").val(pos);
        x=[$("#cit").attr("data-name"),$("#ear").attr("data-name"),$("#vil").attr("data-name")];
        setCookie("proeare",x,2);
    })
}

//显示城市列表
function showcit(){
    var getcity={"city":"Null","county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        data:JSON.stringify(getcity),
        dataType:"json",
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.citys.length;i++){
                html+='<a href="#" class="county">'+json.citys[i]+'</a>';
            }
            $("#cit").children().remove();
            $("#cit").append(html);
        }
    })
}
//显示县区
function showear(citys){
    var getcounty={"city":citys,"county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getcounty),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){

            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.countys.length;i++){
                html+='<a href="#"  class="county">'+json.countys[i]+'</a>';
            }
            $("#ear").children().remove();
            $("#ear").append(html).show();
        }
    })
}
//显示小区
function showvil(citys,countys){
    var getShow={"city":citys,"county":countys};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getShow),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.shops.length;i++){
                html+='<a href="#"  class="county">'+json.shops[i]+'</a>';
            }
            $("#vil").children("a").remove();
            $("#vil").append(html).show();

        }
    })
}

//显示城市列表
function showCity(){
    var getcity={"city":"Null","county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        data:JSON.stringify(getcity),
        dataType:"json",
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.citys.length;i++){
                html+='<a href="#" class="county">'+json.citys[i]+'</a>';
            }
            $("#city").append(html);
        }
    })
}
//显示县区
function showcounty(citys){
    var getcounty={"city":citys,"county":"Null"};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getcounty),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){

            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.countys.length;i++){
                html+='<a href="#"  class="county">'+json.countys[i]+'</a>';
            }
            $("#eare").append(html).show();
        }
    })
}
//显示小区
function showShop(citys,countys){
    var getShow={"city":citys,"county":countys};
    $.ajax({
        type:"post",
        url:"http://192.168.199.242:8080/BSMD/locate/city.do",
        dataType:"json",
        data:JSON.stringify(getShow),
        header:{"Content-Type":"application/json",
            "Accept":"application/json"},
        success:function(data){
            var json=data;
            console.log(json);
            var html='';
            for(var i=0;i<json.shops.length;i++){
                html+='<a href="#"  class="county">'+json.shops[i]+'</a>';
            }
            $("#village").append(html).show();

        }
    })
}


