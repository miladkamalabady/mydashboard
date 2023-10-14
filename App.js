

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Todos from "./pages/Todos"
import TodoProvider from "./context/TodoProvider"
import A401 from "./pages/A401"
import NotFind from "./pages/NotFind"
import CreateService from "./pages/CreateService"
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

import devtools from 'devtools-detect';

function App() {
  const [login, setlogin] = useState(true);
  useEffect(() => {
    document.title = 'داشبورد- پنجره واحد خدمات الکترونیک وزارت آموزش و پرورش';
  }, [])


  return (
    <BrowserRouter >
      <Header />
      <Button className='m-2' variant='outline-danger' onClick={() => setlogin(!login)}>{login ? 'logout' : 'login'}</Button>
      {devtools.isOpen && false ?
        <Routes>
          <Route path="*" element={<A401 />} />
        </Routes>
        :
        <Routes>
          < Route exact path="/" element={<Home />} />
          <Route exact path="/services" element={login ?
            <TodoProvider>
              <Todos />
            </TodoProvider>
            :
            <Navigate to="/A401" />
          } />
          <Route exact path="/services/create" element={login ?
            <TodoProvider>
              <CreateService />
            </TodoProvider>
            :
            <Navigate to="/A401" />
          } />
          <Route exact path="/post/:id" element={login ? <Todos /> : <Navigate to="/" />} />
          <Route exact path="/A401" element={<A401 />} />
          <Route exact path="*" element={<NotFind />} />
        </Routes>
      }

    </BrowserRouter>
  );
}

export default App;
