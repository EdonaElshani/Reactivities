import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/Layout/LoadingComponent";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity } = activityStore;
  if (!activity) return <LoadingComponent content="Loading..." />;
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
          <div className="description">{activity.description}</div>
        </div>
        <Card.Content extra>
          <Button.Group widths="2">
            <Button
              basic
              color="blue"
              content="Edit"
              onClick={() => activityStore.openForm(activity.id)}
            />
            <Button
              onClick={activityStore.cancelSelectedActivity}
              basic
              color="grey"
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </div>
    </div>
  );
};

export default ActivityDetails;
