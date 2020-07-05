import React, { Component }  from 'react';
import './App.css';
import AppRouter from './AppRouter';
import DashBoard from './Component/DashBoard/DashBoard';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


const initialState = {
  cartCount: 0,
  wishListCount: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "cartUpdate":
      return {
        cartCount: action.payload,
        wishListCount: state.wishListCount
      }
    case "wishListUpdate":
      console.log("wishupdate", action.payload)
      return {
        cartCount: state.cartCount,
        wishListCount: action.payload
      }
    default:
      return {
        cartCount: state.cartCount,
        wishListCount: state.wishListCount
      };
  }
};

const store = createStore(reducer);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
          <AppRouter />
      </div>
     </Provider>
    )
  }
}
