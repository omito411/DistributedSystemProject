var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/serviceList.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var serviceList_proto = grpc.loadPackageDefinition(packageDefinition).serviceList
var client = new serviceList_proto.ServiceList("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.totalServiceList(function(error, response) {
    if(error) {
        console.log("An error occured")
    } else{
        console.log("Service response unit " + response.services + " the total number of personnel is: " + response.total)
    }
})

while(true) {
    var service_name = readlineSync.question("What's your service? (q to Quit):")
    if(service_name.toLowerCase() === "q") {
        break
    }
    var serviceType = readlineSync.question("What is the service department?")
    var total = readlineSync.question("How much personnel do you require?")

    call.write({
        total: parseInt(total),
        serviceType: serviceType,
        service: service_name
    })
}

call.end()