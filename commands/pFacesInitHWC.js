const pFacesInitHWCsCommand="pFacesCli init";
var pFacesInitHWCsProperties = {
  name: pFacesInitHWCsCommand,
  description: "pFacesCli init",
  parameters: [{
            name: "file",
            type: {name: "file", file: true, directory: true, exist: true, multiple: true, content: true, recurse: true},
            description: "The HWC file"
        }],
  returnType: "blob"
};
var pFacesInitHWCsImpl = {
  callback: function(args, context) {
    console.log(args.file);
    return "Hello";
}
};
