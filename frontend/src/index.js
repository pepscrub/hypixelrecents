import React from 'react';
import ReactDOM from 'react-dom';
import Searchfetch from './components/Searchfetch';
import Title from './components/Title';
import reportWebVitals from './reportWebVitals';
import Ads from './components/Ads';

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Searchfetch />
    <Ads />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
