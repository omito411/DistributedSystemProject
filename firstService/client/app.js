var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/emergency.proto"
var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var emergency_proto = grpc.loadPackageDefinition(packageDefinition).emergency


var client = new emergency_proto.Emergency(
    "localhost:40000",
    grpc.credentials.createInsecure()
);
  
client.getInfo({}, (error, EmergencyResponse) => {
    if (error) {
        console.log(error);
    } else {
        console.log(EmergencyResponse);
    }
});
