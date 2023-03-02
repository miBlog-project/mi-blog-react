import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Home from './scenes/Home';
import About from './scenes/About';
import Login from './scenes/Login';
import Register from './scenes/Register';
import Post from './scenes/Post';
import Write from './scenes/Write';
import Error from './scenes/Error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './style.scss';

const Layout = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", minHeight:"100vh"}}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
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
        path: "/about",
        element: <About />
      },
      {
        path: "/post/:id",
        element: <Post />
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
