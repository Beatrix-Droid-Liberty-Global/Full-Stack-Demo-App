import { ChangeEvent, useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";




export default observer (function ActivityForm() 
{
    const{activityStore}=useStore();
    const initialState=activityStore.selectedActivity?? 
    {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: ""};

    const[activity, setActivity]=useState(initialState);

    function handleSubmit()
    {
       activity.id? activityStore.updateActivity(activity) : activityStore.createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)
    {
        const{ name, value}=event.target;
        setActivity({...activity, [name]:value})
    }
return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autocomplete="off">
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Description" name="description" value={activity.description} onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" name="category" value={activity.category} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Date" type="date" name="date" value={activity.date} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" name="city" value={activity.city} onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" name="venue" value={activity.venue} onChange={handleInputChange}></Form.Input>
                <Button floated="right" loading={activityStore.loading} positive type="submit" content="Submit"/>
                <Button floated="right" type="button" content="Cancel" onClick={activityStore.closeForm}/>
                    
            </Form>
        </Segment>
)
})