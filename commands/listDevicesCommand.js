const listDevicesCommand="pFacesCli list-devices";
var listDevicesProperties = {
  name: listDevicesCommand,
  description: "List all hardware configurations",
  returnType: "string"

};
var listDevicesImpl = {
  callback: function(args, context) {
    var d=new Date();
    console.log(urls);
    var hwcs =HWCs(hwcsHeadres,urls,[],[],[]);
    var responses=pfacesGetAccessResponse(userID,urls);
    return   orion.Deferred.all(responses).then(function(responses){
             console.log(responses[0]);
             hwcs=checkResponses(responses,hwcs,userID,headers,d,urls);
             var table=stringTable.create(hwcs);
             return table});
  }

};
