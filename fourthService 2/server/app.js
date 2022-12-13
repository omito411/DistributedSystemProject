var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/serviceList.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH);

var serviceList_proto = grpc.loadPackageDefinition(packageDefinition).serviceList

function totalServiceList(call, callback){
  var services = 0
  var total = 0

  call.on('data', function(request) {
    total += request.total
    services += 1
  })

  call.on("end", function() {
    callback(null, {
      total: total,
      services: services
    })
  })

  call.on('error', function(e){
    console.log("An error occured")
  })

}

var server = new grpc.Server()
server.addService(serviceList_proto.ServiceList.service, { totalServiceList: totalServiceList })
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})

