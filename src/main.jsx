import React from 'react'
import ReactDOM from 'react-dom/client'
import { WorkDatesApp } from './WorkDatesApp'
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import './styles.css';
import "@fontsource/roboto";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <WorkDatesApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
