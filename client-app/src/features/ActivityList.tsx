
import { SyntheticEvent, useState } from "react";
import { Activity } from "../app/layout/interfaces/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";


interface Props
{
    activities: Activity[]
    selectActivity: (id: string) => void,
    deleteActivity:(id:string) => void,
    submitting: boolean

}

export default function ActivityList(props: Props)
{
    const [target, setTarget]= useState("");
    function handleActivityDelete(event:SyntheticEvent<HTMLButtonElement>, id:string)
    {
        setTarget(event.currentTarget.name);
        props.deleteActivity(id);
    }

    return (
        <Segment>
                <Item.Group divided>
                    {props.activities.map(activity =>(
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>

                                <Item.Extra> 
                                    <Button floated="right" content="View" color="blue" onClick={()=>props.selectActivity(activity.id)}/>
                                    
                                    <Button name={activity.id} 
                                            floated="right" 
                                            content="Delete" 
                                            color="red" 
                                            loading={props.submitting && target===activity.id} 
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
}