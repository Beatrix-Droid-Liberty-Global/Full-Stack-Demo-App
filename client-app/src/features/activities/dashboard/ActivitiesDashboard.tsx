import React  from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/layout/interfaces/Activity";
import ActivityList from "../../ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";



//create interface for activity that need to pass down
interface Props
{
    activities: Activity[]
    selectedActivity: Activity| undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void
}


export default function ActivityDashboard(props:Props)
 {//
//     {props.activities[0] &&     
//         <ActivityDetails activity={props.activities[0]}/>}  this is to tell react load this complenent only if there is at least one activity in the list. Hence activities[0] exsists

    return( 
    <Grid>
        <Grid.Column width="10">
            <ActivityList activities={props.activities} selectActivity={props.selectActivity}/>
        </Grid.Column>
        <Grid.Column width="6">   

            {props.selectedActivity &&     
            <ActivityDetails activity={props.selectedActivity} cancelSelectActivity={props.cancelSelectActivity}/>}
            <ActivityForm/>
        </Grid.Column>
    </Grid> 
    )
}