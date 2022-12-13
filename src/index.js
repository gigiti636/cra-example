import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./redux/store";
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components';
import {theme} from "./theme";
import { configApi } from './myrestaurant-client-api';
import App from './routes';
import { Toaster } from "react-hot-toast";
/*import reportWebVitals from './reportWebVitals';*/

const options = {};
options['environment'] = process.env.REACT_APP_ENVIRONMENT;
configApi(options);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <App />
              <Toaster
                  toastOptions={{
                      style: {
                          border: '1px solid lightgray',
                          padding: '16px'
                      }
                  }}
              />
          </ThemeProvider>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
