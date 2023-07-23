import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  if (location.pathname === "/") {
    return <HomePage />
  }
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default observer(App);
