const uploadCommand="pFacesCli upload";
var uploadProperties = {
  name: uploadCommand,
  description: "Upload the project to the server",
  parameters: [{
    name: "project",
    type: "string",
    description: "Upload the project to the server"
  }],
    returnType: "string"
};

var uploadImpl = {
  callback: function(args, context) {

    var result="";
    return result;
  }
};
