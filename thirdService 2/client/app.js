var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = __dirname + "/protos/emergency.proto";

var packageDefinition = protoLoader.loadSync(PROTO_PATH);

var emergency = grpc.loadPackageDefinition(packageDefinition).emergency;

var client = new emergency.EmergencyService("localhost:40000", grpc.credentials.createInsecure());

var call = client.getSpecificService({ });

call.on('data', function (response) {
    console.log(response.serviceType + " service chosen " + response.specificService + " as the specific service type ")
});

call.on('end', function () {
});

call.on('error', function (e) {
    console.log(e)
});
