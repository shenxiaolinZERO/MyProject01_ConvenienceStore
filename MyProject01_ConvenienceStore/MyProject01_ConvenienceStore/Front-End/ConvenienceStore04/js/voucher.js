/**
 * Created by lenovo on 2015/12/7.
 */
/*--------------------------加载优惠券和积分-----------------------------*/
//$(document).ready(function(){
//       loadVoucher();
//      loadIntegral();
//})
/*-----------------我的优惠券-----------------*/
function loadVoucher(){
    var x={"custNo":"13933333333"};
    console.log(x);
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/getUserPosStamp.do",
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
            //stampAmt面额
            //stampIssueSheet编号
            // stampMemo使用说明
            //stampStartDate起始时间
            //stampEndDate截止时间
            //stampStatus状态
            var html1 = '';
            for(var i=0;i<json.posStamp.length;i++) {

                html1 +='<ul class="couponinf">';
                html1 +='<li class="th-01 c-2">'+json.posStamp[i].stampAmt+'</li>';
                html1 +='<li class="th-02 c-2">'+json.posStamp[i].stampIssueSheet+'</li>';
                html1 +='<li class="th-03 c-4">'+json.posStamp[i].stampMemo+'</li>';
                html1 +='<li class="th-04 c-3">'+json.posStamp[i].startDate+'——'+json.posStamp[i].endDate+'</li>';
                html1 +='<li class="th-04 c-1">'+json.posStamp[i].stampStatus+'</li>';
                html1 +='</ul>';
            }
            $("#myVoucher").append(html1);
        }
    })
}
/*-----------------我的积分-----------------*/
function loadIntegral(){
    var x={"custNo":"13933333333"};
    console.log(x);
    $.ajax({
        type:"post",
        url: "http://192.168.113.14:8080/BSMD/getUserIntegral.do",
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

            //var html2 = '';
            //for(var i=0;i<json.integral.length;i++) {
            //
            //    html2 +='<div class="c-4 fl">';
            //    html2 +='<div class="vip_img">';
            //    html2 +='<img  src="images/photo2.jpg" height="100px" width="100px">';
            //    html2 +=' <h3 class="fr">username</h3>';
            //    html2 +='</div>';
            //    html2 +='</div>';
            //    html2 +='<div class="c-4 fl">';
            //    html2 +='<p class="jifen">目前可用积分<span>'+integral+'</span></p>';
            //    html2 +='</div>';
            //    html2 +='<div class="c-4 fl">';
            //    html2 +='<a href="index.html" class="jifen" target="_blank">马上使用</a>';
            //    html2 +='</div>';
            //    html2 +='<div class="clearfix"></div>';
            //
            //}
            //$("#customerInfo").append(html2);

            var html3 = '';
            //for(var i=0;i<json.integral.length;i++) {

                html3 +='<ul class="jf-list">';
                html3 +='<li class="th-01 c-2">'+data.integral+'</li>';
                html3 +='<li class="th-02 c-6">'+ +'</li>';
                html3 +='<li class="th-04 c-2">'+ +'</li>';
                html3 +='<li class="th-04 c-2">'+ +'</li>';
                html3 +='</ul>';
            //}
            $("#jifenDetail").append(html3);
        }
    })
}