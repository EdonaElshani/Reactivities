import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
interface Props {
activity: Activity
}
const ActivityDetails = ({activity}:Props) => {
    return (
        <div>
            <div className="ui card fluid">
                <div className="image">
                    <img src={`/assets/categoryImages/${activity.category}.jpg`} />
                </div>
                <div className="content">
                    <a className="header">{activity.title}</a>
                    <div className="meta">
                        <span className="date">{activity.date}</span>
                    </div>
                    <div className="description">
                        {activity.description}
                    </div>
                </div>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button basic color='blue' content='Edit'/>
                        <Button basic color='grey' content='Cancel'/>
                    </Button.Group>
                </Card.Content>
            </div>
        </div>
    )
}

export default ActivityDetails