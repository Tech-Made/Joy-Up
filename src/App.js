
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import NavBar from "./components/NavBar";
// import Footer from "./components/Footer";

import NoMatch from "./pages/NoMatch";

import './styles/variables.scss'
import './styles/components.scss';
import './styles/layouts.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/checkout" component={Checkout} />
              <Route component={NoMatch} />
          </Switch>
          {/* <Footer/> */}
      </Router>
    </Provider>
  );
}

export default App;
