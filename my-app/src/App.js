import { Route, Routes } from 'react-router-dom';
import { Layout } from "./components/index";
import { Login } from "./pages";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Layout />} path="/*"/>
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
