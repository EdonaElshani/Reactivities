import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import Navbar from './Navbar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
      console.log('Data received..');
    })
  }, [])

  return (
    <>
      <Navbar />
      <Container style={{marginTop: '7em'}}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title}, {activity.description}
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
