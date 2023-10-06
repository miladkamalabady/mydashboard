
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Todos from "./pages/Todos"
import TodoProvider from "./context/TodoProvider"
import Getposts from "./pages/Getposts"
import Getpost from "./pages/Getpost"
import NotFind from "./pages/NotFind"
import Header from './components/Header';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
function App() {
  const [login, setlogin] = useState(true);
  return (
    <BrowserRouter>
      <Header />
      <Button className='m-2' variant='outline-danger' onClick={() => setlogin(!login)}>{login ? 'logout' : 'login'}</Button>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/todos" element={
          <TodoProvider>
            <Todos />
          </TodoProvider>
        } />
        <Route path="/posts" element={login ? <Getposts /> : <Navigate to="/" />} />
        <Route path="/post/:id" element={login ? <Getpost /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFind />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
