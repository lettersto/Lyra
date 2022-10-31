// import React, {useState} from 'react';
// import SockJS from 'sockjs-client';
// import StompJs from '@stomp/stompjs';
const WSTest = () => {
  return;
};

export default WSTest;
// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState(null);
//   const client = new StompJs.Client({
//     brokerURL: '/api/ws',
//     connectHeaders: {
//       login: 'user',
//       passcode: 'password',
//     },
//     debug: function (str) {
//       console.log(str);
//     },
//     reconnectDelay: 5000, //자동 재 연결
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });

//   client.onConnect = function (frame) {

//   };

//   client.onStompError = function (frame) {
//     console.log('Broker reported error: ' + frame.headers['message']);
//     console.log('Additional details: ' + frame.body);
//   };

//   let onSendMessage = msgText => {
//     chatAPI
//       .sendMessage(user.username, msgText)
//       .then(res => {
//         console.log('Sent', res);
//       })
//       .catch(err => {
//         console.log('Error Occured while sending message to api');
//       });
//   };

//   let handleLoginSubmit = username => {
//     console.log(username, ' Logged in..');

//     setUser({
//       username: username,
//       color: randomColor(),
//     });
//   };

//   return (
//     <div className="App">
//       {!!user ? (
//         <>
//           <SockJsClient
//             url={SOCKET_URL}
//             topics={['/topic/group']}
//             onConnect={onConnected}
//             onDisconnect={console.log('Disconnected!')}
//             onMessage={msg => onMessageReceived(msg)}
//             debug={false}
//           />
//           <Messages messages={messages} currentUser={user} />
//           <Input onSendMessage={onSendMessage} />
//         </>
//       ) : (
//         <LoginForm onSubmit={handleLoginSubmit} />
//       )}
//     </div>
//   );
// };

// export default App;
