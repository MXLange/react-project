import "./App.css";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Tasks from "./pages/Tasks";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/tasks' element={<Tasks />} />
      <Route path='/to-do-list' element={<TodoList />} />
    </Routes>
  );
}
export default App;
