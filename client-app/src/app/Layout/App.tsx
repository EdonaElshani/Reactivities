import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {
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
