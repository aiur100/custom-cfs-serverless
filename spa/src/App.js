import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather/Weather.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tulsa Weather</h1>
      </header>
      <main>
        <Weather/>
      </main>
    </div>
  );
}

export default App;
