const pFacesVersionCommand="pFacesCli pfaces-version";
var pFacesVersionProperties = {
  name: pFacesVersionCommand,
  description: "pFacesCli pfaces-version",
  parameters: [{
            name: "hwc",
            type: "string",
            description: "Hardware configuration target"
        }],
  returnType: "string"

};
var pFacesVersionImpl = {
  callback: function(args, context) {
    var d=new Date();
    var hwcStr=args.hwc;
    var hwc=parseInt(hwcStr.charAt(hwcStr.length-1));
    var response=pfacesGetAccessResponse(userID,urls[hwc-1]);
    console.log(urls[hwc-1]);
    return   response.then(function(response){
                    var permission="";
                    console.log(response);
                    if(!isObject(response)){
                       permission=checkPermission(response)}
                    else{
                       permission="Not connected to the HWC"
                    }
                    return permission;
             });
             ;}
};
