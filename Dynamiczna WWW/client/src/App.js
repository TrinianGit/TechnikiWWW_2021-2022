import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";
import Contact from "./pages/Contact";
import User from './pages/User';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/history" exact element={<History />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/user/:name" exact element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
