import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from './reportWebVitals'
import { Helmet } from 'react-helmet'
import Amplify from 'aws-amplify'
import awsExports from './aws-exports'
import { CookiesProvider } from 'react-cookie'
Amplify.configure(awsExports)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
  <CookiesProvider>
    <Helmet>
      <title>My Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

