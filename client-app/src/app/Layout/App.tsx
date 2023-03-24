import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
        console.log("Data received..");
      });
  }, []);

function handleSelectActivity(id :string)
{
  setSelectedActivity(activities.find(x=>x.id === id));
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
  return (
    <div>
      <Navbar openForm={handleFormOpen}/>
      <Container>
      <List style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        />
      </List>
      </Container>
    </div>
  );
}

export default App;
