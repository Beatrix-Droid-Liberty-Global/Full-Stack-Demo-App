import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/loadingComponent";



export default function ActivityDetails()
{//react tries to access an activity property as soon as it launches, when it loads the category. If it can't find it it will crash. We need to tell it to wait for the activity to load before loading the page
  const{activityStore}=useStore();
  const {selectedActivity: activity}=activityStore;
  
  if (!activity)
  {return <LoadingComponent/>} 
   return(
        <Card fluid>
         
        
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths="2">
              <Button basic color="blue" content="Edit"  onClick={()=>activityStore.openForm(activity.id)}/>
              <Button basic color="grey" content="Cancel" onClick={()=>activityStore.cancelSelectedActivity()}/>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}