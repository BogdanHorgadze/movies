import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Create from './containers/Create';
import Login from './containers/Login';
import Main from './containers/Main';
import Registration from './containers/Registration';
import './styles.module.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route
          path="main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
