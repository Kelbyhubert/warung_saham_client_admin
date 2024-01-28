import React from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Root from './pages/Root';
import Dashboard from './pages/dashboard/Dashboard';
import ErrorPage from './pages/error/ErrorPage';
import SignIn from './pages/signin/SignIn';
import { checkAuthToken } from './utils/auth/AuthUtils';
import UserManagement from './pages/user-management/UserManagement';
import UserView from './pages/user-management/UserView';
import NotFoundPage from './pages/error/NotFoundPage';
import AddUserForm from './pages/user-management/AddUserForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B49AC',
    },
    secondary: {
      main: '#98BDFF',
    },
    background: {
      main: '#F5F7FF'
    }
  },
  components:{
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: "white",
            backgroundColor: "#4B49AC",
            border: "1px #4B49AC solid",
            borderRadius: "5px"
          },
          '&.Mui-selected:hover':{
            color: "white",
            backgroundColor: "#4B49AC",
            border: "1px #4B49AC solid",
            borderRadius: "5px"
          },
          ':hover':{
            color: "black",
            backgroundColor: "#4B49AC 10%",
            borderRadius: "5px",

          }
        }
      }
    }
  }
});

function App() {


  const router = createBrowserRouter([
    { 
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage /> ,
      loader: checkAuthToken,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
          loader: checkAuthToken,
        },
        {
          path: "saham",
          element: <Dashboard />,
          loader: checkAuthToken,
        },
        {
          path: "insight",
          element: <Dashboard />,
          loader: checkAuthToken,
        },
        {
          path: "user-management",
          element: <UserManagement />,
          loader: checkAuthToken,
        },
        {
          path: "user-management/:userId",
          element: <UserView />,
          loader: checkAuthToken,
        },
        {
          path: "user-management/add-user",
          element: <AddUserForm />,
          loader: checkAuthToken,
        },
        {
          path: '*',
          element:<NotFoundPage/>,
        },
      ]
    },
    {
      path: '/login',
      element:<SignIn/>,
    },
  ])

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider> 
    </LocalizationProvider>

    </>

  )
}

export default App
