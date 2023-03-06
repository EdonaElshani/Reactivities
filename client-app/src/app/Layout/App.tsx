import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
        console.log("Data received..");
      });
  }, []);

  return (
    <div>
      <Header as="h2" content="Reactivities" icon="users" />
      <List>
        <ActivityDashboard activities={activities} />
      </List>
    </div>
  );
}

export default App;
