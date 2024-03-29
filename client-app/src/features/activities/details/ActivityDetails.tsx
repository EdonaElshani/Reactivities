import { Button, Card } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent content="Loading..." />;
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
            <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
            <Button as={Link} to={`/activities`} basic color="grey" content="Cancel" />
          </Button.Group>
        </Card.Content>
      </div>
    </div>
  );
});
