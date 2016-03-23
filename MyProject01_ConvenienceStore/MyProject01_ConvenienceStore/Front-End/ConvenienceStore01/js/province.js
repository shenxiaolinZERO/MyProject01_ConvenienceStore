/**
 * Created by lenovo on 2015/11/6.
 */
var xmldom = null; //声明变量用于存储全部的xml document对象信息

$(function(){
    //页面加载完毕立即获得省份信息
    //ajax去服务器端获得省份信息
    $.ajax({
        url:'xml/ChinaArea.xml',
        type:'get',
        dataType:'xml',
        success:function(msg){
            //alert(msg);//object XMLDocument
            //jquery处理html和xml的方式一致
            xmldom = msg;

            //console.log($(msg).find("province")); //从msg节点中中获得“后代”province节点
            $(msg).find("province").each(function(k,v){
                //k代表province的下标，v和this分别代表每个province的dom对象
                var nm = $(this).attr('province');
                var id = $(this).attr('provinceID');
                $("#province").append("<option value='"+id+"'>"+nm+"</option>");
            });
        }
    });
});

//通过省份显示城市的信息
function showcity(){
    //获得选中省份的value值
    var pid = $("#province").val();
    //省份id只保留前两位
    var two_pid = pid.substr(0,2);

    //清空旧的城市信息
    $("#city").empty();

    //获得xml地区信息的City标签，条件是ID开始内容是two_pid;
    $(xmldom).find("City[CityID^="+two_pid+"]").each(function(){
        var nm = $(this).attr('City');//城市名称
        var id = $(this).attr('CityID');//城市id

        //把“名称”和“id”追加给下拉列表
        $("#city").append("<option value='"+id+"'>"+nm+"</option>");
    });
};
function showarea(){
    //获取选中城市的value值
    var pcid=$("#city").val();

    var pcid_four=pcid.substr(0,4);

    $("#area").empty();

    $(xmldom).find("Piecearea[PieceareaID^="+pcid_four+"]").each(function () {
        var nm=$(this).attr('Piecearea');
        var id=$(this).attr('PieceareaID');

        $("#area").append("<option value='"+id+"'>"+nm+"</option>");
    });
};