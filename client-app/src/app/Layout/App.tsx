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
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
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
      <Navbar openForm={handleFormOpen} />
      <Container>
        <List style={{ marginTop: "7em" }}>
          <ActivityDashboard
            activities={activityStore.activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
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
