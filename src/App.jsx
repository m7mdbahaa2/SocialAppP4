import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About/About';
// import Posts from './Components/Pages/Posts/Posts';
import NotFound from './Components/Pages/NotFound/NotFound';
import Login from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import Profile from './Components/Pages/Profile/Profile';
import CounterContextProvider from './Components/Context/CounterContext';
import Counter from './Components/Pages/Counter/Counter';
import AuthContextProvider, { AuthContext } from './Components/Context/AuthContext';
import ProtectedRoutes from './Components/ProtectRoutes/ProtectedRoutes';
import ProtectedAuthRoutes from './Components/ProtectRoutes/ProtectedAuthRoutes';
import PostDetails from './Components/Pages/PostDetails/PostDetails';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { lazy, Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient()

const Posts = lazy(() => import("./Components/Pages/Posts/Posts"))

function App() {

  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Posts />
        </Suspense>
      </ProtectedRoutes>
    }, {
      path: 'about',
      element: <ProtectedRoutes>
        <About />
      </ProtectedRoutes>
    }, {
      path: '/posts',
      element: <ProtectedRoutes>
        <Posts />
      </ProtectedRoutes>
    }, {
      path: "/posts/:id",
      element: <ProtectedRoutes>
        <PostDetails />
      </ProtectedRoutes>
    }, {
      path: 'notfound',
      element: <NotFound />
    }, {
      path: 'login',
      element: <ProtectedAuthRoutes>
        <Login />
      </ProtectedAuthRoutes>
    }, {
      path: 'register',
      element: <ProtectedAuthRoutes>
        <Register />
      </ProtectedAuthRoutes>
    }, {
      path: 'profile',
      element: <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    }, {
      path: 'counter',
      element: <ProtectedAuthRoutes>
        <Counter />
      </ProtectedAuthRoutes>
    },]
  }])

  return (
    <>

      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
            <ReactQueryDevtools />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
