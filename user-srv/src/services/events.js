import { consumer, producer, kafkaConfig, kafkaAdmin } from 'yepkit-kafka';
import updadeKeyHandler from '../modules/update-key.js';

const clientId = 'user-srv';
const groupId = 'user-srv';
const brokers = [process.env.KAFKA_BROKER] || ["127.0.0.1:9092"];

export const event = {
  userCreated: async function (msgObj) {
    await producer.send('user-srv-user-created', msgObj)
      .catch(e => {
        console.log(e);
      });
  }
}; 



export async function initEvents() {
  console.log('Configuring Kafka', brokers);
  kafkaConfig(clientId, groupId, brokers);
  
  console.log('Creating topic');
  await kafkaAdmin.topic.create('user-srv-user-created');
  
  console.log('Connecting producer');
  await producer.connect();
  
  console.log('Connecting consumer');
  await consumer.connect();
  await consumer.subscribe('user-srv-user-created', function(topic, partition, message) {
    console.log('Envento recebido: ', message);
  });  
  await consumer.subscribe('key-manager-new-key', updadeKeyHandler);
  await consumer.run();
}


export async function stopEvents() {
  await producer.disconnect();
  await consumer.disconnect();
}


