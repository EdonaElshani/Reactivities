import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import { Activity } from "../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./Navbar";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }
  function handleDelete(id: string) {
    agent.Activities.delete(id).then(() => {
      setSubmitting(true);
      setActivities([...activities.filter((x) => x.id !== id)]);
    });
  }

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading App" />;
  }
  return (
    <div>
      <Navbar />
      <Container>
        <List style={{ marginTop: "7em" }}>
          <ActivityDashboard
            activities={activityStore.activities}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDelete}
            submitting={submitting}
          />
        </List>
      </Container>
    </div>
  );
}

export default observer(App);
