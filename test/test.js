import client from 'yepkit-event-mdl';

function testClientEvent() {
  client.connect("127.0.0.1", "3013", "user1", "dev")
    .then(out => {
      console.log(out);

      const dhlbody = {
        "company": "Yepkit",
        "user": "SadiqDev",
        "function": "Developer"
      }

      //client.produce(dhlbody, "dhl-createorder");
      client.produce(dhlbody, "dhl-createpickup");
    }).catch(err => {
      console.log(err);
    });
}

testClientEvent();


