import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();

  return (
    <>
    <ToastContainer position='top-center' theme='dark' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <Navbar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default observer(App);