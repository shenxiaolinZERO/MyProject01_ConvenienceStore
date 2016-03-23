/**
 * Created by lenovo on 2015/11/6.
 */

     function addBuynum(){
         var s=$("#buycount1").val();
         if(!numcheck(s)){
             s=1;
         }
         s=Number(s);
         s=s+1;
         $("#buycount1").val(s);
         return false;
     }
     function reductBuynum(){
         var s=$("#buycount1").val();
         if(!numcheck(s)){
             $("#buycount1").val(l);
             s=1;
         }
         s=Number(s);
         if(s==1){
             return;
         }else{
             s=s-1;
         }
         $("#buycount1").val(s);
         return false;
     }
     function numcheck(ss){
         var re=/^\+?[1-9][0-9]*$/;
         var stem=ss.indexOf(".");
         if(re.test(ss)&&stem<0)
         {
             return true;
         }
         return false;}

