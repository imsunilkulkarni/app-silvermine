import App from 'next/app'
import React from 'react';
import {Provider} from 'react-redux'
import {createWrapper} from 'next-redux-wrapper';
// import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../store/store'
import '../styles/main.scss'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
