/**
 * Created by lenovo on 2016-02-26.
 */
$(document).ready(function () {
    isLoad();
    $("#searchManger").hide();
    //get_data();//先加载待处理订单数
    //updateData();//30秒一次刷新待处理订单数据
    //managerList(0);
    //managerList(1);
    searchmanager();
    submitmanager();
    list();
    //haveExamine();
    updateInfo();
    deleteManager();
    selectall();//全选
    batchDelete();//批量删除已审核管理员
    //加载模态框的店铺
    $.ajax({
        type:"post",
        url:"http://192.168.113.15:8080/BSMD/Administrator/searchShop.do",
        dataType:"json",
        //data:JSON.stringify(x),
        header:{"Content-Type":"application/json","Accept":"application/json"},
        success:function(data){
            var json=data;
            var html='';
            for(var i=0;i<json.shopList.length;i++){
                html+='<option data-shopno="'+json.shopList[i].shopNo+'" value="'+i+'" >'+json.shopList[i].shopName+'</option>';
            }
            $("#shopList1").empty("");
            $("#shopList2").empty("");
            $("#shopList1").append(html);
            $("#shopList2").append(html);


        }
    });
});

//根据用户名(手机号)来查询出某个用户，将其设置为普通管理员
function searchmanager(){
    $("#searchResult").click(function(){
        var name= $.trim($("#mangerName").val());
        var x={username:name};
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/searchSysUser.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                var json=data;
                $("#searchManger").show();
                $("#custno").html(json.sysUserList[0].custNo);
                $("#username").html(json.sysUserList[0].userName);

            }
        });
    })

}
//提交管理员信息
function submitmanager(){
    $("#submitManager").click(function(){
        var custNo=$("#custno").html();
        var username=$("#username").html();
        var role=changeRole2();
        var shopno2=showShop2();
        if(role===1){
            shopno2="";
        }
        var x={custNo:custNo,shopNo:shopno2,role:role};
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/auditSysUser.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                alert("提交成功！");
                list();

            }
        });
    })
}
//加载管理员列表
function list(){
    var x={username:""};
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/searchSysUser.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            var json=data;
            haveMangerList(json);

        }
    });
}

//拼接已审核管理员列表======0：普通管理员 1:超级管理员
function haveMangerList(json){
    var html='';
    for(var i=0;i<json.sysUserList.length;i++) {
        html+= '<tr><td class="item_all"><input data-userNo="'+json.sysUserList[i].custNo+'" type="checkbox" class="cart-checkbox cart-checkbox-checked"value=""></td>';
        html+='<td  style="width: 15%" class="no"><span data-no="'+json.sysUserList[i].custNo+'">'+json.sysUserList[i].custNo+'</span></td>';
        html+='<td style="width: 15%" class="name"><span>'+json.sysUserList[i].userName+'</span></td>';
        if(json.sysUserList[i].role==1){
            html+='<td class="managerRole" ><span data-role="'+json.sysUserList[i].role+'">普通管理员</span></td>';
        }
        if(json.sysUserList[i].role==2){
            html+='<td class="managerRole" ><span data-role="'+json.sysUserList[i].role+'">超级管理员</span></td>';
        }
        html+='<td class="shopno" ><span data-shopno="'+json.sysUserList[i].shopNo+'">'+json.sysUserList[i].shopName+'</span></td>';
        html+='<td class="ed"><a id="update" data-toggle="modal"  data-target="#UpdateInfo">修改</a><a style="display: block" id="delete">删除</a></td></tr>';

    }
    $("#haveExamine").html("");
    $("#haveExamine").append(html);

}
//修改管理员信息(权限、店铺)=======0：普通管理员 1:超级管理员
function updateInfo(){
    $("tbody#haveExamine").on("click","tr td a#update",function(){
        var No=$(this).parent().parent().children(".no").children().attr("data-no");
        var name=$(this).parent().parent().children(".name").children("span").html();
        var shopno=$(this).parent().parent().children(".shopno").children().attr("data-shopno");
        var shopname=$(this).parent().parent().children(".shopno").children().html();
        var manager=$(this).parent().parent().children(".managerRole").children("span").html();
        if(manager=="超级管理员"){
            $("#store").hide();
        }
        if(manager=="普通管理员"){
            $("#store").show();
        }

        $('#managerKind option:contains(' + manager + ')').each(function(){
            if ($(this).text() == manager) {
                $(this).attr('selected', true);
            }
        });
        $('#shopList1 option:contains(' + shopname + ')') .each(function(){
            if ($(this).text() == shopname) {
                $(this).attr('selected', true);
            }
        });
        $("#managerNo").html(No);
        $("#managerName").html(name);
        submitInfo(No);


    })
}
//模态框中的提交更改
function submitInfo(no){
    $("#submitInfo").on("click",function(){
        var role=changeRole();
        var shopno2=showShop1();
        var name=$("#managerName").html();
        if(role===2){
            shopno2="";
        }
        var x={custNo:no,userName:name,role:role,shopNo:shopno2};
        console.log(x);
        $.ajax({
            type: "post",
            url: "http://192.168.113.15:8080/BSMD/Administrator/updateSysUser.do",
            dataType: "json",
            data: JSON.stringify(x),
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                var json=data;
                var d=$("div#have table tbody#haveExamine tr");
                $.each(d,function (){
                    var n=$(this).children("td.no").children().attr("data-no");
                    if(n==no){
                        $(this).children("td.managerRole").remove();
                        var html='';
                        if(json.user.role==1){
                            html+='<td class="managerRole" data-role="'+json.user.role+'"><span>普通管理员</span></td>';
                        }
                        if(json.user.role==2){
                            html+='<td class="managerRole" data-role="'+json.user.role+'"><span>超级管理员</span></td>';
                        }
                        $(this).children("td.shopno").before(html);
                        $(this).children("td.shopno").remove();
                        var html1='<td class="shopno" data-shopno="'+json.user.shopNo+'"><span >'+json.user.shopName+'</span></td>';
                        $(this).children("td.ed").before(html1);
                    }
                })

            }
        });

    });
}

//改变模态框中的权限时
function changeRole(){
    var role=$("#managerKind option:checked").attr("data-role");
    if(role==="1"){
        $("#store").show();
    }
    if(role==="2"){
        $("#store").hide();
    }
    return role;
}
function changeRole2(){
    var role=$("#managerKind2 option:checked").attr("data-role");
    if(role==="1"){
        $("#store2").show();
    }
    if(role==="2"){
        $("#store2").hide();
    }
    return role;
}
//改变模态框中的店铺时
function showShop1(){
  var shopno=$("#shopList1 option:checked").attr("data-shopno");
    return shopno;
}
function showShop2(){
    var shopno=$("#shopList2 option:checked").attr("data-shopno");
    return shopno;
}
//删除某条管理员记录
function deleteManager(){
    $("tbody#haveExamine").on("click","tr td a#delete",function(){
        var no=[];
         no[0]=$(this).parent().parent().children(".no").children().attr("data-no");

        var x={custNos:no};
        deleteAjax(x);
       $(this).parent().parent().remove();
    })
}
//批量删除某条管理员记录
//批量删除
function batchDelete(){//没有触发！！！
    $("#batchDelete").on("click",function(){
        var d=$("div#have table tbody#haveExamine tr");
        var i=0;
        var no=[];
        $.each(d,function (){
            var check=$(this).children(".item_all").children("input").is(':checked');


            if(check){
                no[i]=$(this).children(".item_all").children("input").attr("data-userNo");
                i=i+1;
            }
        });
        var x={custNos:no};
        deleteAjax(x);
        managerList(1);//重新加载已审核管理员

    })

}
function deleteAjax(x){
    $.ajax({
        type: "post",
        url: "http://192.168.113.15:8080/BSMD/Administrator/deleteSysUser.do",
        dataType: "json",
        data: JSON.stringify(x),
        header: {"Content-Type": "application/json", "Accept": "application/json"},
        success: function (data) {
            console.log(data);
            alert("删除成功!");

        }
    });
}

