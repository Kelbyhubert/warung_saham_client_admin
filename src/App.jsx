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
import UserSetting from './pages/user-management/user-setting/UserSetting';
import NotFoundPage from './pages/error/NotFoundPage';
import AddUserForm from './pages/user-management/AddUserForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import Rekom from './pages/saham/rekom/Rekom';
import CreateRekomForm from './pages/saham/rekom/form/CreateRekomForm';
import EditRekomForm from './pages/saham/rekom/form/EditRekomForm';
import Stock from './pages/saham/stock/Stock';
import { useDispatch } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B49AC',
    },
    secondary: {
      main: '#98BDFF',
    },
    background: {
      main: '#d5d7e0'
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

  const dispatch = useDispatch();
  const router = createBrowserRouter([
    { 
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage /> ,
      loader: checkAuthToken(dispatch),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
          loader: checkAuthToken(dispatch),
        },
        {
          path: "saham/rekom",
          element: <Rekom />,
          loader: checkAuthToken(dispatch),
        },
        {
          path: "saham/rekom/create",
          element: <CreateRekomForm/>,
          loader: checkAuthToken(dispatch)
        },
        {
          path: "saham/rekom/:id/edit",
          element: <EditRekomForm/>,
          loader: checkAuthToken(dispatch)
        },
        {
          path: "saham/stock",
          element: <Stock />,
          loader: checkAuthToken(dispatch),
        },
        {
          path: "saham/stock/:id/edit",
          element: <EditRekomForm/>,
          loader: checkAuthToken(dispatch)
        },
        {
          path: "insight",
          element: <Dashboard />,
          loader: checkAuthToken(dispatch),
        },
        {
          path: "user-management",
          element: <UserManagement />,
          loader: checkAuthToken(dispatch),
        },
        {
          path: "user-management/:userId",
          element: <UserSetting />,
          loader: checkAuthToken,
        },
        {
          path: "user-management/add-user",
          element: <AddUserForm />,
          loader: checkAuthToken(dispatch),
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
