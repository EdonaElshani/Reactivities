import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./Navbar";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {

  return (
    <div>
      <Navbar />
      <Container>
        <List style={{ marginTop: "7em" }}>
          <ActivityDashboard />
        </List>
      </Container>
    </div>
  );
}

export default observer(App);
