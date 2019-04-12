import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import DashPage from '../routes/DashPage';
import './App.css';

function LandingPage(props) {
  return (
    <main>
      <section className="section-landing">
        <article>Welcome to Petful!</article>

        <Link to="/dash">Adopt a friend!</Link>
      </section>
    </main>
  );
}

class App extends Component {
  render() {
    return <>
      <header>
        <Link to="/"><h1>Petful</h1></Link>
      </header>

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dash" component={DashPage} />
      </Switch>
    </>;
  }
}

export default App;
