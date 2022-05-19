/*
 * Módulo NPM que implementa um client/driver para o event-srv.
 */
import WebSocket from "ws";
let ws = null;
let connected = false;
let subscriptions = new Map();
let client = {};

function connect(host, port, cliendId, groupId) {
  client.clientId = cliendId;
  client.groupId = groupId;
  return new Promise((resolve, reject) => {
    if (!ws) {
      ws = new WebSocket(`ws://${host}:${port}`);
      ws.on("message", (data) => {
        const event = JSON.parse(data);
        if (event.type === "event") {
          console.log("DEBUG", event);
          // call callbacks
          let subs = subscriptions.get(event.topic);
          if (subs) {
            for (let entryCallback of subs) {
              entryCallback(event.data);  // chama as callbacks de um tópico.
            }
          }
        } else if (event.type === "register-request") {
          ws.send(JSON.stringify({
            type: "register-response",
            uid: event.uid,
            groupId: client.groupId,
            clientId: client.clientId
          }));
        } else if (event.type === "register-confirmed") {
          connected = true;
          // subscribe consumers
          subscriptions.forEach(subscribeTopic);
          resolve("connected");
        }
      });
    } else {
      reject("Event client already connected");
    }
  });
  
}

function subscribeTopic(value, key, map) {
  console.log(key);
  const msg = {
    type: "subscription",
    topic: key,
    clientId: client.clientId,
    groupId: client.groupId
  };
  console.log(msg);
  try {
    ws.send(JSON.stringify(msg));
  } catch (err) {
    console.log(Date.now(), err);
  }
}

/**
 * Subscribes the client in the server to consume events from a topic.
 */
function consume(topic, callback) {
  // Add callback to the local subscription map.
  if (subscriptions.has(topic)) {
    let entry = subscriptions.get(topic);
    entry.push(callback);
    subscriptions.set(topic, entry);
  } else {
    subscriptions.set(topic,[callback]);
  }
}

/**
 * Produces an event in a topic in the server.
 */
function produce(message, topic, callback) {
  ws.send(JSON.stringify({
    timestamp: Date.now(),
    type: "event",
    clientId: client.clientId,
    topic: topic,
    data: message
  }));
  console.log("client side - event produced");
}

const eventClient = {
  connect: connect,
  consume: consume,
  produce: produce
};

export default eventClient;



