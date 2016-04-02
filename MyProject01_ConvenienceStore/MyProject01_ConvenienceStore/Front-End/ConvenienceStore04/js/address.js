/**
 * Created by lenovo on 2015-12-11.
 */
//地址管理
$(function () {
    var custno = $.cookie("username");
    if (custno != null) {
        //获取原有的地址列表
        var x = {"custno": custno};
        $.ajax({
            type: "post",
            datatype: 'json',
            url: "http://192.168.113.14:8080/BSMD/getUserAddress.do",
            data: JSON.stringify(x),
            header: {"Content-type": "application/json", "Accept": "application/json"},
            success: function (data) {
                console.log(data);
                var html = '';
                if (data.status == "success") {
                    var y;
                    for (var i = 0; i < data.userAddressList.length; i++) {
                        y = data.userAddressList[i];
                        $().addressContent(y);
                    }


                }
            }
        })
    }
    $().poschange();
    $().proclick();
    $().cityclick();
    $().countyclick();
    $().villclick();
    $().toptabClick();
    $("#add_name").blur(function () {
        doUsername();
    })
    $("#usertel").blur(function () {
        doTel();
    })
    $("#ueraddr").blur(function () {
        doaddr();
    })
    $(".address-form").hide();
    $("#address-add").click(function () {
        $(".address-form").toggle();
    })
    defaultAddress();
    changeAddress();
    deleteAddress();
    saveAddress();
})

//选择小区完成
$.fn.villclick = function () {
//t顶部
    $("#vil").on("click", "a", function () {
        //取得选择的小区
        var e = $(this).text();
        $("#topvil>a").text(e);
        $("#vil").attr("data-name", e);
        $(".hd-prochg").hide();
        //拼装写入cookie
        var pos = $("#cit").attr("data-name") + $("#ear").attr("data-name") + $("#vil").attr("data-name");
        var post = $("#cit").attr("data-name") + "-" + $("#ear").attr("data-name") + "-" + $("#vil").attr("data-name");
        $("#cityname").attr("data-positon", pos);
        $("#cityname").attr("data-cityname", post);
        $("#cityname").val(pos);
    })
};

//1.点击"设为默认"变为“默认地址”，并且其余地址变为“设为默认”；2点击"默认地址"不作反应
function defaultAddress() {
    $("#aa-list").on("click", "a.defaultAdd", function () {
        var id = $(this).attr("data-aid");
        var s = $(this).attr("data-status");
        if (s == 0) {
            $("#aa-list ul li .defaultAdd").html("设为默认");
            $("#aa-list ul li .defaultAdd").attr("data-status", 0);
            $(this).html("默认地址");
            $(this).attr("data-status", 1);
            var x1 = {"custno": "cust02", "addrNo": id, "memo": ""};
            $.ajax({
                type: "post",
                data: JSON.stringify(x1),
                url: "http://192.168.113.14:8080/BSMD/updateDefaultAddress.do",
                dataType: "json",
                header: {"Content-Type": "application/json", "Accept": "application/json"},
                success: function (data) {
                    console.log(data);
                }
            });
        }
        else {
            return;
        }
    })
}
//点击修改地址
function changeAddress() {
    $("#aa-list").on("click", "ul li .change", function () {
        $(".address-form").show();
        var id = $(this).attr("data-aid");
        var name = $(this).parent().prevAll(".add_name").attr("data-name");
        var city = $(this).parent().prevAll(".add_address").attr("data-city");
        var county = $(this).parent().prevAll(".add_address").attr("data-county");
        var areaname = $(this).parent().prevAll(".add_address").attr("data-areaname");
        var address = $(this).parent().prevAll(".add_address").attr("data-address");
        var tel = $(this).parent().prevAll(".add_tel").attr("data-tel");
        $("#add_name").val(name);
        $("#cityname").val("福建省" + city + county + areaname);
        $("#pro").attr("data-name", "福建省");
        $("#cit").attr("data-name", city);
        $("#ear").attr("data-name", county);
        $("#vil").attr("data-name", areaname);
        $("#cityname").attr("data-id", id);
        $("#ueraddr").val(address);
        $("#usertel").val(tel);
        console.log(name);
        $(this).parent().parent().parent().remove();
    })
}
//删除地址
function deleteAddress() {
    $("#aa-list").on("click", "ul li .delete", function () {
        var id = $(this).attr("data-aid");
        var x = {"addrNo": id};
        console.log(x);
        $.ajax({
            type: "post",
            data: JSON.stringify(x),
            url: "http://192.168.113.14:8080/BSMD/deleteUserAddress.do",
            dataType: "json",
            header: {"Content-Type": "application/json", "Accept": "application/json"},
            success: function (data) {
                if (data.status == "success") {

                    alert("删除成功！");
                }

            }

        });
        $(this).parent().parent().parent().remove();

    })
}
//判断是否为默认地址
function judgeaddress() {

    if ($("#address-default").prop("checked")) {
        return true;
    } else {
        return false;
    }


}
//保存按钮触发事件
function saveAddress() {
    $("#address-save").click(function () {

        if (doUsername() && doTel() && doaddr()) {
            var custno = $.cookie("username");
            if (custno != null) {
                var myaddname = $("#add_name").val();
                var myprovice = $("#pro").attr("data-name");
                var mycity = $("#cit").attr("data-name");
                var myarea = $("#ear").attr("data-name");
                var myvillage = $("#vil").attr("data-name");
                var myaddr = $("#ueraddr").val();
                var myusertel = $("#usertel").val();
                if (judgeaddress() == true) {
                    var sta = 1;
                }
                else {
                    sta = 0;
                }
                var addrno = $("cityname").attr("data-id");
                if (addrno == '' || addrno == null) {


                    var x = {
                        "custno": custno,
                        "name": myaddname,
                        "city": mycity,
                        "county": myarea,
                        "areaName": myvillage,
                        "address": myaddr,
                        "tel": myusertel,
                        "status": sta,
                        "memo": ""
                    };
                    $.ajax({
                        type: "post",
                        data: JSON.stringify(x),
                        url: "http://192.168.113.14:8080/BSMD/insertUserAddress.do",
                        dataType: "json",
                        header: {"Content-Type": "application/json", "Accept": "application/json"},
                        success: function (data) {
                            console.log(data);
                            alert("保存成功！");
                            $().addressContent(x);
                        }
                    });
                }
                else {
                    var y = {
                        "custno": custno,
                        "name": myaddname,
                        "city": mycity,
                        "county": myarea,
                        "areaName": myvillage,
                        "address": myaddr,
                        "tel": myusertel,
                        "status": sta,
                        "addrNo": addrno,
                        "memo": ""
                    };
                    console.log(y);
                    $.ajax({
                        type: "post",
                        data: JSON.stringify(y),
                        url: "http://192.168.113.14:8080/BSMD/updateUserAddress.do",
                        dataType: "json",
                        header: {"Content-Type": "application/json", "Accept": "application/json"},
                        success: function (data) {

                            console.log(data);
                            alert("保存成功！");
                            $().addressContent(y);
                        }
                    });
                }
            }

        }
        else {
            alert("请输入您的正确地址信息!")
        }
    });

}
//拼接地址列表
$.fn.addressContent = function (json) {
    var html = '';
    console.log(json);
    html += '<div class="addr_list"><ul ><li class="c-2 add_name" data-name="' + json.name + '">' + json.name + '</li>';
    html += '<li class="c-6 add_address" data-city="' + json.city + '"  data-county="' + json.county + '" data-areaName="'
        + json.areaName + '" data-address="' + json.address + '">福建省 ' + json.city + json.county + json.areaName + json.address + '</li>';
    html += '<li class="c-2 add_tel" data-tel="' + json.tel + '">' + json.tel + '</li>';
    if (json.status == 0) {
        html += '<li class="c-2"><a href="javascript:;" class="defaultAdd" data-status="0" data-aid="' + json.addrNo + '" >' +
            '设为默认 </a><a href="javascript:;" class="change" data-aid="' + json.addrNo + '">修改 </a><a href="javascript:;"' +
            ' class="delete" data-aid="' + json.addrNo + '"> 删除</a></li>';
    } else {

        $(".defaultAdd").html("设为默认");
        $(".defaultAdd").attr("data-status", 0);
        html += '<li class="c-2"><a href="javascript:;" class="defaultAdd" data-status="1" data-aid="' + json.addrNo + '">' +
            '默认地址 </a><a href="javascript:;" class="change" data-aid="' + json.addrNo + '">修改 </a><a href="javascript:;" ' +
            'class="delete" data-aid="' + json.addrNo + '"> 删除</a></li>';
    }
    html += '</ul></div>';
    $("#aa-list").append(html);
}

// 用户名的验证==========================
function doUsername() {
    var t = $("#add_name");
    var span = $(".namemsg");
    if (/^[\u4E00-\u9FA5\uf900-\ufa2d\w]{2,16}$/.test(t.val())) {
        // var errorMsg='请输入昵称.';
        // t.append('<span class="formtips onError">'+errorMsg+'</span>');
        span.html("输入成功").css({color: "#3c3c3c", fontSize: "12px"});
        return true;
    } else {
        span.html(" 中文、英文、数字、下划线、2-16个字符").css({color: "red", fontSize: "12px"});
        return false;
    }
}
// 手机号码的验证==========================
function doTel() {
    var t = $("#usertel");
    var span = $(".telmsg");
    if (/^1[3578][0-9]{9}$/.test(t.val())) {
        span.html("输入成功").css({color: "#3c3c3c", fontSize: "12px"});
        return true;
    } else {
        span.html("手机号码格式错误").css({color: "red", fontSize: "12px"});
        return false;
    }
}
//详细地址的验证==========================
function doaddr() {
    var t = $("#ueraddr");
    var span = $(".addrmsg");
    if (t.val() != "") {
        span.html("输入成功").css({color: "#3c3c3c", fontSize: "12px"});
        return true;

    }
    else {
        span.html("请输入详细地址").css({color: "red", fontSize: "12px"});
        return false;
    }

};

