function pfacesLogin(userID,cl_version,login_request_time,url){
                    var body={};
                    var pk=["userID","user_key","client_version","login_request_time","login_time","login_url","login_port","permission","info_message"];
                    var pkValue=[userID,"",cl_version,login_request_time,"","","","requested",""];
                    body=toJson(pk,pkValue);
                    var request={};
                    var value=[JSON.stringify(body)];
                    request=toJson([userID],value);
                    var promise= putRequest(request,url);
                    return promise;
}
function pfacesGetAccessResponse(userID,url){
                    if(!Array.isArray(url)){
                       var promise =postRequest([userID],url);
                       return promise;}
                    else{
                       var promises=[];
                    for(i=0;i < url.length;i++){
                       promises.push(postRequest([userID],url[i]));
                       }
                        return promises;
                    }
}

function pfacesGetValue(body,url){
    var promise=postRequest(body,url);
    return promise;
}
function pfacesSetValue(body,url){
    var promise=putRequest(body,url);
    return promise;
}
function checkPermission(response){
          var jsonval=JSON.parse(response);
          var permission="";
          if(isJSON(jsonval[userID])){permission=JSON.parse(jsonval[userID])[keys["PFACES_AGENT_LOGIN_DICT_USER_PERMISSION"]];};
          return permission;
}
function getLoginURL(response,url){
          var address=url.replace("http://","");
          address=address.substring(0,address.indexOf(":"));
          var jsonval=JSON.parse(response);
          var dictURL=JSON.parse(jsonval[userID])[keys["PFACES_AGENT_LOGIN_DICT_USER_LOGIN_URL"]];
          const userURL=dictURL.replace('*',address);
          return userURL;
}
function userDictJson(status,target,option,data,message){
     var js={};
     js["request status"]=status;
     js["request target"]=target;
     js["request option"]=option;
     js["request time"]="";
     js["data"]=data;
     js["message"]=data;
     return js;
}
function checkResponses(responses,hwcs,userID,headers,d,urls){
  for(i=0;i<responses.length;i++){
     var permission="";
     if(!isObject(responses[i])){
       permission=checkPermission(responses[i]);}
     else{
       permission=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_connection_error"];
       hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_connection_error"];}
     if(permission===""){
       resultDisplay=pfacesLogin(userID,headers.version,d.toLocaleString(),urls[i]);
       hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_request_is_being_processed"];}
     else{
       if(permission==keys["PFACES_AGENT_LOGIN_DICT_USER_PERMISSION_VALUE_granted"])
       {hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_alredy_logged_in"];
        hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_URL"]]=getLoginURL(responses[i],urls[i]);}
       else if (permission==keys["PFACES_AGENT_LOGIN_DICT_USER_PERMISSION_VALUE_denied"])
       {hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_access_denied"];}
       else if (permission==keys["PFACES_AGENT_LOGIN_DICT_USER_PERMISSION_VALUE_requested"])
       {hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_request_is_being_processed"];}
       else if (permission===messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_request_is_being_processed"])
       {hwcs[i][messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN_STATUS"]]=messages["SHELL_MESSAGE_LOGIN_HWC_LOGIN__STATUS_connection_error"];}
     };}
     return hwcs;
}
