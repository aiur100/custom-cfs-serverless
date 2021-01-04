import logo from './logo.svg';
import './App.css';
import Weather from "./components/Weather/Weather.js";

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="centerItem">
            <div className="card">
              <div className="card-body">
                <h1>Tulsa Weather</h1>
                <hr/>
                <Weather/>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
