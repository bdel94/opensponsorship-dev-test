import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {ContextProvider} from "./contexts/athleteContext"
import Athletes from "./components/Athletes/athletes.jsx"
import Header from "./components/Header/header.jsx"
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Athletes />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
