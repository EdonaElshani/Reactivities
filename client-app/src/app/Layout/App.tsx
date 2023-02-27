import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
      console.log('Data received..');
    })
  }, [])

  return (
    <div>   
      <Header as='h2'content='Reactivities' icon='users'/>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title}, {activity.description}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
