require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
var mqtt = require('mqtt')
var url = 'wss://712d6a94edd544ddac8b5c44600f18d3.s1.eu.hivemq.cloud:8884/mqtt'
var options = {
    username: 'Esp32',
    password: 'Esp32Asaf',
    wsOptions : true
}
var subscribeTopic = "users/devices/location"
//initialize the MQTT client
var mqttClient = mqtt.connect(url,options);
mqttClient.subscribe(subscribeTopic);

mqttClient.on('connect', function () {
  console.log('Connected');
 
});

mqttClient.on('message', function (topic, message) 
{
    let infoMessage = JSON.parse(message);
    let messageString = message.toString()
    console.log('Received message:', topic, messageString);
    if (topic == "users/devices/location"){
      let userID = infoMessage["ID"];
      console.log(userID);
      io.sockets.emit(userID, infoMessage)

    }
});

mqttClient.on('error', function (error) {
  console.log(error);
  client = mqtt.connect(options)
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("data", () =>
  {

  });


  socket.on("disconnect", () => 
  {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));