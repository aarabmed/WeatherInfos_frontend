import React, { useEffect } from 'react';
import { ApolloClient,ApolloProvider,InMemoryCache,HttpLink } from '@apollo/client';
import ReactGA from 'react-ga';
  
import ReactDOM from 'react-dom';
import App from './components/layout/App';
import reportWebVitals from './reportWebVitals';

import "./styles/styles.scss"


const setGA = () => {
  ReactGA.initialize(process.env.TRACKID);
  ReactGA.pageview('Init page view');
};

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri:`${process.env.REACT_APP_PUBLIC_GRAPHQL_API_ENDPOINT}`,
  }),
  cache: new InMemoryCache(),
});

const AppWrapper = ()=>{
  return (
    <ApolloProvider client={apolloClient}>
      <App/>
    </ApolloProvider>
  )
}


const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
,root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(setGA());
