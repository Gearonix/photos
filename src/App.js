import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Photos from "./components/photos/photos";
import Header from "./components/header/header";
import About from "./components/about/about";


function App() {
  return (
    <div className="App">
      <Switch>
            <Route path={'/login'} component={Login} />
            <Route path={'/register'} component={Register} />
            <Route path={'/photos'} component={Main} />
            <Route path={'/about'} component={About} />
            <Route exact path={'/'} component={Login} />
      </Switch>
    </div>
  );
}
const Main = function(){
    return(
        <div className={'main'}>
        <Header />
        <Photos />
        </div>
    )
}

export default App;
