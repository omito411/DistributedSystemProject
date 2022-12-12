var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/emergency.proto"
var packageDefinition = protoLoader.loadSync(PROTO_PATH
)
var emergency_proto = grpc.loadPackageDefinition(packageDefinition).emergency

var server = new grpc.Server();
server.addService(emergency_proto.Emergency.service, { getInfo: (input, callback) => {
    try {
      callback(null, { name: "Stephen", detail: "Emergency" });
    } catch (error) {
      callback(error, null);
    }
  }
});
server.bindAsync(
  '0.0.0.0:40000',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start();
  }
);



