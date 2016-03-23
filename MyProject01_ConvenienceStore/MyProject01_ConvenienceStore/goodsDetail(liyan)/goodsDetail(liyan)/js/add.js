/**
 * Created by hp on 2015/11/2.
 */
$('#serviceTab').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});
function addBuynum(){
    var s=$("#buycount").val();
    if(!numcheck(s)){
        s=1;
    }
    s=Number(s);
    s+=1;
    $("#buycount").val(s);
    return false;
}
function reductBuynum(){
    var s=$("#buycount").val();
    if(!numcheck(s)){
        $("buycount").val(1);
        s=1;
    }
    s=Number(s);
    if(s==1){
        return;
    }else {
        s-=1;
    }
    $("#buycount").val(s);
    return false;
}
function numcheck(ss){
    var re=/^\+?[1-9][0-9]*$/;
    var stem=ss.indexOf(".");
    if(re.test(ss)&&stem<0){
        return true;
    }
    return false;
}

$('#comTab').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});