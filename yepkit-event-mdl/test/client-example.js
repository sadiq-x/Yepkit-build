import client from "../index.js";

function testClientEvent() {
  client.connect("127.0.0.1", "3013", "example1", "examples")
    .then(out => {
      console.log(out);
      
      const message = {
        campo1: "teste",
        campo2: "again teste"
      };
      client.produce(message, "testTopic");
      client.produce(message, "testTopic2");
    }).catch(err => {
      console.log(err);
    });  
}


function consumer(data) {
  console.log("evento consumido:", data);
}

testClientEvent();
client.consume("testTopic", consumer);
client.consume("testTopic2", consumer);



