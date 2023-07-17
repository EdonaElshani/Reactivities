import { ChangeEvent, useState, useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/Layout/LoadingComponent";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => {
        setActivity(activity!);
      });
    }
  }, [id, loadActivity]);


  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    //The reason [name] is in brackets is because it is a computed property name.
    //So the property name is determined dynamically at runtime based on the value of the name variable.
    setActivity({ ...activity, [name]: value });
  }
  function handleSubmit() {
    activity.id
      ? activityStore.updateActivity(activity)
      : activityStore.createActivity(activity);
  }

  if(loadingInitial) return <LoadingComponent content="Loading Activity..."/>
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
          <Button floated="right" type="button" content="Cancel" />
        </Form>
      </Segment>
    </>
  );
};

export default observer(ActivityForm);
