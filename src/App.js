import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <div className="custom-scrollbar">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
