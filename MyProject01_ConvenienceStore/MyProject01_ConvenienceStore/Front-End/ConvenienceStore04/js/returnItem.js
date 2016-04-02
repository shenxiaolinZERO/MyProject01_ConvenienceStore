/**
 * Created by lenovo on 2016-03-09.
 */
function getReOrder(){
    var json={"No":"101","pageIndex":1,"pageCount":10,"applyType":-1,"appFlag":-1}
    $.ajax({
        data:JSON.stringify(json),
        dataType:"json",
        type:"post",
        url:"http://192.168.113.14:8080/BSMD/afterSale/select/shop",
        header: {"Content-type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            if(data.message=="success"){
                if(data.Page.list!=null){
                    var html='';
                    var html1='';
                    var list=data.Page.list;
                    for(var i=0;i<list.length;i++){
                        //退货
                        if(list[i].applyType==0){
                            html+='<table> <tr> <td>订单编号：</td>' +
                                '<td>'+list[i].orderNo+'</td><td>申请编号：</td>' +
                                '<td>'+list[i].orderNo+'</td> </tr> <tr> <td>退单时间：</td> ' +
                                '<td>'+list[i].applyTime+'</td> <td>店铺名称：</td> ' +
                                '<td>'+list[i].shopName+'</td> </tr><tr> <td>商品名称：</td> ' +
                                '<td>'+list[i].itemName+'<span>'+list[i].nowPack+'</span></td> ' +
                                '<td>申请数量：</td> <td>'+list[i].applyNum+list[i].nowUnit+'</td>' +
                                ' </tr> <tr> <td class="app_reason">申请理由：</td> <td colspan="3"> ' +
                                '<div class="reason">'+list[i].applyReason+'</div> </td> </tr> <tr> ' +
                                '<td class="app_state">状态：</td> ';
                            if(list[i].appFlag==0){
                                html+=' <td>未审核</td>'
                            }else if(list[i].appFlag==1){
                                html+=' <td>已通过</td>'
                            }else if(list[i].appFlag==2){
                                html+=' <td>未通过</td>'
                            }else if(list[i].appFlag==3){
                                html+=' <td>已完成</td>'
                            }
                            html+=' <td><button data-id="'+list[i].applyNo+'">同意退货</button> </td> <td> ' +
                                '<button data-id="'+list[i].applyNo+'">拒绝申请</button> </td> </tr> </table>';
                        }
                        //换货
                        if(list[i].applyType==1){
                            html1+='<table> <tr> <td>订单编号：</td>' +
                                '<td>'+list[i].orderNo+'</td><td>申请编号：</td>' +
                                '<td>'+list[i].orderNo+'</td> </tr> <tr> <td>退单时间：</td> ' +
                                '<td>'+list[i].applyTime+'</td> <td>店铺名称：</td> ' +
                                '<td>'+list[i].shopName+'</td> </tr><tr> <td>商品名称：</td> ' +
                                '<td>'+list[i].itemName+'<span>'+list[i].nowPack+'</span></td> ' +
                                '<td>申请数量：</td> <td>'+list[i].applyNum+list[i].nowUnit+'</td>' +
                                ' </tr> <tr> <td class="app_reason">申请理由：</td> <td colspan="3"> ' +
                                '<div class="reason">'+list[i].applyReason+'</div> </td> </tr> <tr> ' +
                                '<td class="app_state">状态：</td> ';
                            if(list[i].appFlag==0){
                                html1+=' <td>未审核</td>'
                            }else if(list[i].appFlag==1){
                                html1+=' <td>已通过</td>'
                            }else if(list[i].appFlag==2){
                                html1+=' <td>未通过</td>'
                            }else if(list[i].appFlag==3){
                                html1+=' <td>已完成</td>'
                            }
                            html+=' <td><button data-id="'+list[i].applyNo+'">同意换货</button> </td> <td> ' +
                                '<button data-id="'+list[i].applyNo+'">拒绝申请</button> </td> </tr> </table>';
                        }
                    }

                }
            }
            $("#return .return").html(html);
            $("#exchang .exchange").html(html);
        }
    })
}