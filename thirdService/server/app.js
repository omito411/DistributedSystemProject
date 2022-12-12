var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/emergency.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var emergency_proto = grpc.loadPackageDefinition(packageDefinition).emergency

var data = [
  {
    serviceType:"Police",
    specificService: "General Unit"
  },
  {
    serviceType:"Police",
    specificService: "Arms Special Unit"
  },
  {
    serviceType:"Hospital",
    specificService: "Ambulance"
  },
  {
    serviceType:"Fire",
    specificService: "Firebridage"
  }
]

function getSpecificService(call, callback){
  for(var i = 0; i < data.length; i++){
    call.write({
      serviceType: data[i].serviceType,
      specificService: data[i].specificService
    })
  }
  call.end()
}
var server = new grpc.Server()
server.addService(emergency_proto.EmergencyService.service, { getSpecificService: getSpecificService})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})

