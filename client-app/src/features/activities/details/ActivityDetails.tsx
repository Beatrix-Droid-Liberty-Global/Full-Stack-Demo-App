import React from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { Activity } from "../../../app/layout/interfaces/Activity";


interface Props
{
    activity: Activity,
    cancelSelectActivity: () => void,
    openForm:(id:string)=>void;
}


export default function ActivityDetails(props:Props)
{//react tries to access an activity property as soon as it launches, when it loads the category. If it can't find it it will crash. We need to tell it to wait for the activity to load before loading the page
    return(
        <Card fluid>
        
        <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.activity.title}</Card.Header>
          <Card.Meta>
            <span>{props.activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {props.activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths="2">
              <Button basic color="blue" content="Edit"  onClick={()=>props.openForm(props.activity.id)}/>
              <Button basic color="grey" content="Cancel" onClick={()=>props.cancelSelectActivity()}/>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}