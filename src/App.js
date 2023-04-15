import "./App.css";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import { Route, Routes } from 'react-router-dom';
import TodoList from "./pages/TodoList";
import Apps from "./pages/Apps";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/apps' element={< Apps/>} />
      <Route path='/to-do-list' element={<TodoList />} />
    </Routes>
  );
}
export default App;
