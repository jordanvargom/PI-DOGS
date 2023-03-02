import "./App.css";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Home from "./components/Home";
import DogDetail from "./components/DogDetail";
import CreateDog from "./components/CreateDog";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Route path="/dogs" component={NavBar} />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/dogs" exact component={Home} />
        <Route path="/dogs/dog:id" exact component={DogDetail} />
        <Route path="/dogs/createdog" component={CreateDog} />
      </Switch>
      <Route path="/dogs" component={Footer} />
    </div>
  );
}

export default App;
