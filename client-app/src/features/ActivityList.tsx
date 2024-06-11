
import { SyntheticEvent, useState } from "react";
import { Activity } from "../app/layout/interfaces/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";



export default observer(function ActivityList()
{   const{activityStore}=useStore();
    const [target, setTarget]= useState("");
    
    function handleActivityDelete(event:SyntheticEvent<HTMLButtonElement>, id:string)
    {
        setTarget(event.currentTarget.name);
        activityStore.deleteActivity(id);
    }



    return (
        <Segment>
                <Item.Group divided>
                    {activityStore.activities.map(activity =>(
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>

                                <Item.Extra> 
                                    <Button floated="right" content="View" color="blue" onClick={()=>activityStore.selectActivity(activity.id)}/>
                                    
                                    <Button name={activity.id} 
                                            floated="right" 
                                            content="Delete" 
                                            color="red" 
                                            loading={activityStore.loading && target===activity.id} 
                                            onClick={(event)=>handleActivityDelete(event, activity.id)}
                                            />
                                    <Label basic coontent={activity.category}></Label>
                                </Item.Extra>

                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
        </Segment>
    )
})