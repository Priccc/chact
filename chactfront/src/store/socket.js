import io from 'socket.io-client';
const socket = io.connect('http://localhost:8086');
export default socket;