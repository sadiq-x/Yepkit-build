import Auth from 'yepkit-authorization';
const auth = Auth('user-srv-key', 'yepkit', 'yepkit');

export default function updateKeyEventHandler(topic, partion, message) {
  let messageObj = null;
  try {
    messageObj = JSON.parse(message);
  } catch (err) {
    console.log(err);
    return;
  }
  const keyPair = {
    privateKey: messageObj.privateKey,
    publicKey: messageObj.publicKey,
    timeStamp: messageObj.timeStamp
  };
  auth.updateKeyPair(keyPair);
  console.log(Date.now(), ' Key pair updated to key with time stamp = ', messageObj.timeStamp);
}
