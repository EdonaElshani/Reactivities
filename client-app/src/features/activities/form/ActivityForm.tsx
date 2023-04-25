import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const initialState = activityStore.selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    //The reason [name] is in brackets is because it is a computed property name.
    //So the property name is determined dynamically at runtime based on the value of the name variable.
    setActivity({ ...activity, [name]: value });
  }
  function handleSubmit() {
    console.log(activity);
    activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity);
  }
  return (
    <>
      <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Input
            placeholder="Title"
            name="title"
            value={activity.title}
            onChange={handleInputChange}
          />
          <Form.TextArea
            placeholder="Description"
            name="description"
            value={activity.description}
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Category"
            name="category"
            value={activity.category}
            onChange={handleInputChange}
          />
          <Form.Input
            type="date"
            placeholder="Date"
            name="date"
            value={activity.date}
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="City"
            name="city"
            value={activity.city}
            onChange={handleInputChange}
          />
          <Form.Input
            placeholder="Venue"
            name="venue"
            value={activity.venue}
            onChange={handleInputChange}
          />
          <Button
            floated="right"
            positive
            type="submit"
            content="Submit"
            loading={activityStore.loading}
          />
          <Button
            floated="right"
            type="button"
            content="Cancel"
            onClick={activityStore.closeForm}
          />
        </Form>
      </Segment>
    </>
  );
};

export default observer(ActivityForm);
