import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
export interface Props {
  activities: Activity[];
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityList({
  activities,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");
  function handleActivityDelete(
    id: string,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    deleteActivity(id);
    setTarget(e.currentTarget.name);
  }
  const { activityStore } = useStore();
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={(e) => handleActivityDelete(activity.id, e)}
                  floated="right"
                  content="Delete"
                  color="red"
                  name={activity.id}
                  loading={submitting && target === activity.id}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
