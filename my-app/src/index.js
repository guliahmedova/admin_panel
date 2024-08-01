import React from 'react';
import ReactDOM from 'react-dom/client';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);