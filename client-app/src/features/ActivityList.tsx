import React from "react";
import { Activity } from "../app/layout/interfaces/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";


interface Props
{
    activities: Activity[]
}

export default function ActivityList(props: Props)
{
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
                                    <Button floated="right" content="View" colour="blue"/>
                                    <Label basic coontent={activity.category}></Label>
                                </Item.Extra>

                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
        </Segment>
    )
}