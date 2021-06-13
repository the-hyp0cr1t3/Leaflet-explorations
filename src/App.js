import logo from './logo.svg';
import Basicmap from './basic';
import Polygonmap from './polygon';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Basicmap/> */}
        <Polygonmap/>
        <br/>
      </header>
    </div>
  );
}

export default App;
