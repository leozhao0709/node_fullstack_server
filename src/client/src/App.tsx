import * as React from 'react';
import * as style from './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className={style.app}>
        <header className={style.appHeader} >
          <img src={logo} className={style.appLogo} alt="logo" />
          <h1 className={style.appTitle}>Welcome to React</h1>
        </header>
        <p className={style.appIntro}>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="/auth/google">login with google</a>
      </div>
    );
  }
}

export default App;
