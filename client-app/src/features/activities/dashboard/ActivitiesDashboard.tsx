
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/layout/interfaces/Activity";
import ActivityList from "../../ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";



//create interface for activity that need to pass down
interface Props
{
    activities: Activity[]
    selectedActivity: Activity| undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=> void;
    createOrEdit: (activity:Activity)=> void;
    deleteActivity:(id:string) => void;
    submitting: boolean
}


export default function ActivityDashboard(props:Props)
 {//
//     {props.activities[0] &&     
//         <ActivityDetails activity={props.activities[0]}/>}  this is to tell react load this complenent only if there is at least one activity in the list. Hence activities[0] exsists

    return( 
    <Grid>
        <Grid.Column width="10">
            <ActivityList activities={props.activities} selectActivity={props.selectActivity} deleteActivity={props.deleteActivity} submitting={props.submitting}/>
        </Grid.Column>
        <Grid.Column width="6">   

            {props.selectedActivity && !props.editMode &&    
            <ActivityDetails 
            activity={props.selectedActivity} 
            cancelSelectActivity={props.cancelSelectActivity}
            openForm={props.openForm}    
            />}
            {props.editMode && <ActivityForm closeForm={props.closeForm} activity={props.selectedActivity} createOrEdit={props.createOrEdit} submitting={props.submitting}/>}
        </Grid.Column>
    </Grid> 
    )
}