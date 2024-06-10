
import { Fragment, useEffect, useState } from 'react';
import DuckItem from './DuckItem.tsx'
import { ducks } from './demo'
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import type {Activity} from './interfaces/Activity';
import Navbar from './navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard.tsx';
import {v4 as uuid} from 'uuid'


function App() {

//from axios usestate, useffect hooks get request from api with this
//this line initializes a state variable activities with an empty array as its initial value.
//setActivities is a function that will update the activities state.

const [activities,setActivities]=useState<Activity[]>([]);
const [selectedActivity, setselectedActivity]=useState<Activity| undefined>(undefined);
const [editMode, setEditMode]=useState(false);
  
  //accepts a function
  useEffect(()=>
    {
      //.then describes what happens once the response has been returned
      axios.get<Activity[]>("http://localhost:5000/api/activities").then(response =>{setActivities(response.data)})
    },[])

   
    function handleSelectActivity(id:string)
    {
      setselectedActivity(activities.find(activityobject=>activityobject.id===id))
    }
   
    function handleCanceledSelectActivity()
    {
      setselectedActivity(undefined);
    }

    //if id is not null then handleselect activity. else cancel the activity
    function handleFormOpen(id?:string)
    {
      id ? handleSelectActivity(id):handleCanceledSelectActivity();
      setEditMode(true);
    }

    function handleFormClose()
    {
      setEditMode(false);
    }

    function handleCreateOrEditActivity(activity:Activity)
    {
      activity.id? setActivities([...activities.filter(x=>x.id !== activity.id), {...activity, id:uuid()}]) // check whether activity has id that is not undefined, and then filkters out any existing activity withe the same id. it then adds the new activity object ti the new array
      :setActivities([...activities, activity])
      setEditMode(false)
      setselectedActivity(activity)
    }


    function handleDeleteActivity(id:string)
    {
      setActivities([...activities.filter(x => x.id!==id)])
    }


  return (
    <Fragment>
  <Navbar  openForm={handleFormOpen}/> //imported from navbar.tsx
    //apply to each duck in the array

<Container style={{marginTop:"7em"}}>
{ducks.map(duck=>(<DuckItem duck={duck}/>))}
    <ActivityDashboard 
    activities={activities} 
    selectedActivity={selectedActivity}
    selectActivity={handleSelectActivity}  
    cancelSelectActivity={handleCanceledSelectActivity}
    editMode={editMode}
    openForm={handleFormOpen}
    closeForm={handleFormClose}
    createOrEdit={handleCreateOrEditActivity}
    deleteActivity={handleDeleteActivity}
    />
    </Container>
    </Fragment>
  )
}

export default App
