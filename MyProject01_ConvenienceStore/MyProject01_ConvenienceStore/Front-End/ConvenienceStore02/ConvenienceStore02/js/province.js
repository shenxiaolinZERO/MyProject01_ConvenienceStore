/**
 * Created by lenovo on 2015/11/6.
 */
var xmldom = null; //�����������ڴ洢ȫ����xml document������Ϣ

$(function(){
    //ҳ���������������ʡ����Ϣ
    //ajaxȥ�������˻��ʡ����Ϣ
    $.ajax({
        url:'xml/ChinaArea.xml',
        type:'get',
        dataType:'xml',
        success:function(msg){
            //alert(msg);//object XMLDocument
            //jquery����html��xml�ķ�ʽһ��
            xmldom = msg;

            //console.log($(msg).find("province")); //��msg�ڵ����л�á������province�ڵ�
            $(msg).find("province").each(function(k,v){
                //k����province���±꣬v��this�ֱ����ÿ��province��dom����
                var nm = $(this).attr('province');
                var id = $(this).attr('provinceID');
                $("#province").append("<option value='"+id+"'>"+nm+"</option>");
            });
        }
    });
});

//ͨ��ʡ����ʾ���е���Ϣ
function showcity(){
    //���ѡ��ʡ�ݵ�valueֵ
    var pid = $("#province").val();
    //ʡ��idֻ����ǰ��λ
    var two_pid = pid.substr(0,2);

    //��վɵĳ�����Ϣ
    $("#city").empty();

    //���xml������Ϣ��City��ǩ��������ID��ʼ������two_pid;
    $(xmldom).find("City[CityID^="+two_pid+"]").each(function(){
        var nm = $(this).attr('City');//��������
        var id = $(this).attr('CityID');//����id

        //�ѡ����ơ��͡�id��׷�Ӹ������б�
        $("#city").append("<option value='"+id+"'>"+nm+"</option>");
    });
};
function showarea(){
    //��ȡѡ�г��е�valueֵ
    var pcid=$("#city").val();

    var pcid_four=pcid.substr(0,4);

    $("#area").empty();

    $(xmldom).find("Piecearea[PieceareaID^="+pcid_four+"]").each(function () {
        var nm=$(this).attr('Piecearea');
        var id=$(this).attr('PieceareaID');

        $("#area").append("<option value='"+id+"'>"+nm+"</option>");
    });
};