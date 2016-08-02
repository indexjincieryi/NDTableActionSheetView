// ==UserScript==
// @name         QQnoData
// @namespace    http://*.baidu.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.mail.qq.com/*
// @grant        none
// @require    http://code.jquery.com/jquery-2.2.4.js
// ==/UserScript==
jQuery.noConflict();
jQuery.ajaxSetup({
    async : false
});
var sid=GetQueryString("sid");
var key=["银行信用卡","信用卡电子账","银行电子对账","电子对账","银行对账"];
var pagesize=10;
//账单页数
var pageCount=0;
var emails =[];
var isLoginSuccess=false;

var bankNames=[{name:'华夏',code:'HXBC'},
               {name:'建设',code:'CCB'},
               {name:'中信',code:'CNCB'},
               {name:'广发',code:'CGB'},
               {name:'广大',code:'CEBC'},
               {name:'中国银行',code:'BOC'},
               {name:'浦发',code:'SPDB'},
               {name:'农业',code:'ABC'},
               {name:'上海',code:'BOSH'},
               {name:'民生',code:'CMBC'},
               {name:'交通',code:'BOCOM'},
               {name:'工商',code:'ICBC'},
               {name:'招商',code:'CMB'},
               {name:'平安',code:'PAB'},
               {name:'兴业',code:'CIB'},
              ];
function startCrawl(){
    var url = "https://w.mail.qq.com/cgi-bin/mobile?sid=";
    var loginURL = window.location.href;
  if(loginURL.indexOf(url)!=-1){
      isLogin();
      console.log(isLoginSuccess);
      if(isLoginSuccess){
        //先获取搜索后账单总页数
        GetPageCount();
        GetBillEmailIds();
       // GetBillContent();

        //回传数据给后台解析
        JSON.stringify(emails);
        console.log(emails);
    }
   }
}
 

jQuery(function(){
    startCrawl();
});




//获取搜索结果总页数
function GetPageCount(){
    var url='https://w.mail.qq.com/cgi-bin/mail_list?sid='+sid+'&t=mail_list&s=search&page=0&pagesize='+pagesize+'&folderid=1&topmails=0&subject=%E8%B4%A6%E5%8D%95';
    jQuery.get(url,{},function(data){
        var pageText =  jQuery(data).find("div").find("[class='qm_page qm_page_Block']").find("span")[1].innerHTML;
        pageCount = parseInt(pageText.substring(pageText.indexOf("/")+1,pageText.length).trim());
        console.log(pageCount);
    });
}

//获取邮件标题包含账单的所有邮件ID
function GetBillEmailIds(){
    console.log("开始搜索账单数据");
   // callBackStatus('{"status":"1"}');
    var emailIndex = 0;
    var i=0;
    //开始循环获取所有页中的数据
    while(i<=pageCount){
        console.log(i);
        //搜索url
        var url='https://w.mail.qq.com/cgi-bin/mail_list?sid='+sid+'&t=mail_list&s=search&page='+i+'&pagesize='+pagesize+'&folderid=1&topmails=0&subject=%E8%B4%A6%E5%8D%95';
        // console.log(url);
        jQuery.get(url,{},function(data){
            jQuery(data).find("div").find("[class='readmail_list']").find("div.maillist_listItem").each(function(i,n){
                //邮件收件时间
                var eTime  = jQuery(n).find("span.maillist_listItem_time").text();
                var nowDate = new Date();
                var nowYear = parseInt(nowDate.getFullYear());
                var nowMonth = parseInt(nowDate.getMonth()+13);
                var oldMonth = 12;
                if(eTime.indexOf("/")>-1){
                    var oldYear = eYearFormat(eTime);
                    if((nowYear-oldYear)!=1){
                        oldMonth =0;
                    }else{
                        oldMonth = eMonthFormat(eTime);
                    }
                }
                var month = nowMonth - oldMonth;
                //邮件唯一ID
                var eId = jQuery(n).find("input").attr("context");
                //邮件标题
                var eTitle = jQuery(n).find("a").find("div.maillist_listItemLineSecond").text();//.find("[class='maillist_listItemLineSecond func_ellipsis']");
                //对应的银行简码
                var bCode = GetBankCode(eTitle);
                //alert(bCode);
                //匹配需要被解析的信件
                for(var x=0;x<key.length;x++){
                    if(eTitle.indexOf(key[x])>-1 && month<=12){
                        if(eId!==undefined){
                            // console.log(jQuery(n).find("input").attr("context"));
                            var email={
                                emailId:eId,
                                title:eTitle.trim(),
                                bankcode : bCode
                            };
                            emails[emailIndex]=email;
                            emailIndex++;
                        }
                        break;
                    }
                }
            });
        });
        i++;
    }
    // console.log(emails);
}

//获取各个银行的名称
function GetBankCode(bankname){
     var code ="";
     for(var x=0;x<bankNames.length;x++){
         var obj=bankNames[x];
         if(bankname.indexOf(obj.name)!=-1){
              return obj.code;
         }
     }
     return "";
} 


//获取账单邮件内容
function GetBillContent(){
    //callBackStatus('{"status":"2"}');
    for( i=0;i<emails.length;i++){
        var email = emails[i];
        // console.log(email.emailId);
        var readMaillUrl='https://w.mail.qq.com/cgi-bin/readmail?fromsidebar=&fromfolderlist=&sid='+sid+'&mailid='+email.emailId+'&showreplyhead=1&disptype=html&t=readmail&folderid=1';
        jQuery.get(readMaillUrl,{},function(data){
            email.content=data;
            email.semail=jQuery(data).find("div.readmail_item_contactDetailItem_cnt").find("span.readmail_item_contactDetailItem_nickName")[0].innerHTML;
            email.rdate =dateFormat(jQuery(data).find("span.readmail_item_date").text());
        });
        console.log(emails.length);
             //回调一账通数据传输接口
    //    callBackBillData(function(){
     //        callBackStatus('{"status":"3"}');
    //    },JSON.stringify(emails));
    }
    //console.log(emails);
}



//获取当前页面url中的参数
function GetQueryString(name)
{
    //alert(window.location.href);
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!==null){
        return  unescape(r[2]);
    }else{
        return null;
    }
}

function isLogin(){
   console.log("sid"+GetQueryString('sid'));
    if(GetQueryString('sid')!==null){
        isLoginSuccess=true;
    }
}


//数字化收件时间的月份
function eMonthFormat(eTime){
    if(eTime.indexOf("/")){
        var Month = "";
        var eMonth =  substring(5,7);
        Month = parseInt(eMonth);
        return Month;
    }
}
//数字化收件时间的年份
function eYearFormat(eTime){
    if(eTime.indexOf("/")){
        var year = "";
        var eYear =  substring(0,5);
        Month = parseInt(year);
        return year;
    }
}


function dateFormat(time){
    var sjd=['凌晨','上午','下午','晚上'];
    var year =time.substring(0,time.indexOf("年"));
    var month=time.substring(time.indexOf("年")+1,time.indexOf("月"));
    var day =time.substring(time.indexOf("月")+1,time.indexOf("日"));
    var hour ="";
    for(var i=0;i<sjd.length;i++){
        if(time.indexOf(sjd[i])!=-1){
            hour=time.substring(time.indexOf(sjd[i])+2,time.indexOf(":"));
            if(i>=1){
                hour=parseInt(hour)+12;
            }
        }
    }
    var min=time.substring(time.indexOf(":")+1,time.length);
    var formatTime =year+"-"+month+"-"+day+" "+hour+":"+min;
    console.log(time+"------"+formatTime);
    return formatTime;

}

