import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';

let socket; // Declare socket variable outside the action functions

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: { connected: false },
    users: [],
  },
  reducers: {
    setSocket: (state, action) => {
      return { ...state, socket: { ...state.socket, ...action.payload } };
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      const existingUser = state.users.find(
        (user) => user.name === newUser.name
      );

      if (!existingUser) {
        state.users.push(newUser);
      }
    },
  },
});

export const { setSocket, addUser, addMessage } = socketSlice.actions;
export const userJoined = (name) => (dispatch) => {
  const message = `${name} has joined the chat`;
  dispatch(addUser({ name }));
  dispatch(addMessage({ sender: name, message }));
};

export const connectSocket = () => (dispatch) => {
  if (!socket) {
    socket = io('https://ecommerce-app-legends-bn-production.up.railway.app');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('user joined', (name) => {
      dispatch(userJoined(name));
    });

    socket.on('chat message', (data) => {
      const { name, message } = data;
      dispatch(addMessage({ sender: name, message }));
    });
  }

  dispatch(setSocket({ connected: true }));
};

export const disconnectSocket = () => (dispatch, getState) => {
  if (socket) {
    socket.disconnect(); // Disconnect the socket if it exists
  }
  dispatch(setSocket({ connected: false }));
};

export default socketSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import io from 'socket.io-client';

// let socket; // Declare socket variable outside the action functions

// export const connectSocket = () => (dispatch) => {
//   if (!socket) {
//     socket = io('http://localhost:5000');

//     socket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });

//     socket.on('user joined', (name) => {
//       const message = `${name} has joined the chat`;
//       console.log(message);
//       dispatch(addUser({ email: name }));
//       dispatch(addMessage({ sender: name, message }));
//     });

//     socket.on('chat message', (data) => {
//       const { name, message } = data;
//       dispatch(addMessage({ sender: name, message }));
//     });
//   }

//   dispatch(setSocket({ connected: true }));
// };

// export const disconnectSocket = () => (dispatch, getState) => {
//   if (socket) {
//     socket.disconnect(); // Disconnect the socket if it exists
//   }
//   dispatch(setSocket({ connected: false }));
// };

// const socketSlice = createSlice({
//   name: 'socket',
//   initialState: {
//     socket: { connected: false },
//     users: [],
//   },
//   reducers: {
//     setSocket: (state, action) => {
//       state.socket = { ...state.socket, ...action.payload };
//     },
//     addUser: (state, action) => {
//       state.users.push(action.payload);
//     },
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//   },
// });

// export const { setSocket, addUser, addMessage } = socketSlice.actions;

// export default socketSlice.reducer;
