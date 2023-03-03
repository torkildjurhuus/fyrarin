import logo from "./img/oy.png"
import "./App.css";
import Countdown from "./countdown";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Countdown />
      </header>
    </div>
  );
}

export default App;
