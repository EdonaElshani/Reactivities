import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import { Activity } from "../models/activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Navbar from "./Navbar";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list().then((response) => {
      setActivities(response);
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

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
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  if (loading) {
    return <LoadingComponent content="Loading App" />;
  }
  return (
    <div>
      <Navbar openForm={handleFormOpen} />
      <Container>
        <List style={{ marginTop: "7em" }}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDelete}
          />
        </List>
      </Container>
    </div>
  );
}

export default App;
