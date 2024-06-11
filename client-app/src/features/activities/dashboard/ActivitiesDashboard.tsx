
import { Grid } from "semantic-ui-react";
import ActivityList from "../../ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";



//create interface for activity that need to pass down
export default observer (function ActivityDashboard()
 {//
//     {props.activities[0] &&     
//         <ActivityDetails activity={props.activities[0]}/>}  this is to tell react load this complenent only if there is at least one activity in the list. Hence activities[0] exsists
    const{activityStore}=useStore();


    return( 
    <Grid>
        <Grid.Column width="10">
            <ActivityList/>
        </Grid.Column>
        <Grid.Column width="6">   

            {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails/>}
            {activityStore.editMode && <ActivityForm/>}
        </Grid.Column>
    </Grid> 
    )
}
)