import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Home from './scenes/Home';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Blog from './scenes/Blog';
import Write from './scenes/Write';
import Error from './scenes/Error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blog/:id",
        element: <Blog />
      },
      {
        path: "/write",
        element: <Write />
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
