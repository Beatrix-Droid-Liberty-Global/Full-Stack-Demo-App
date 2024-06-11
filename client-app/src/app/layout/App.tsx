
import { Fragment, useEffect, useState } from 'react';
import DuckItem from './DuckItem.tsx'
import { ducks } from './demo'

import { Container} from 'semantic-ui-react';
import type {Activity} from './interfaces/Activity';
import Navbar from './navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard.tsx';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent.ts'
import LoadingComponent from './loadingComponent.tsx';

function App() {

//from axios usestate, useffect hooks get request from api with this
//this line initializes a state variable activities with an empty array as its initial value.
//setActivities is a function that will update the activities state.

const [activities,setActivities]=useState<Activity[]>([]);
const [selectedActivity, setselectedActivity]=useState<Activity| undefined>(undefined);
const [editMode, setEditMode]=useState(false);
const [loading, setLoading]=useState(true);
const [submitting, setSubmitting]= useState(false);


  //accepts a function
  useEffect(()=>
    {
      //.then describes what happens once the response has been returned
      agent.Activities.list().then(response => {
        let activities:Activity[]=[];
        response.forEach(activity => {activity.date=activity.date.split("T")[0];
        activities.push(activity);})
        setActivities(activities);
        setLoading(false);
      })
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
      setSubmitting(true);
      if (activity.id)
          { //if the id is found then we are editing teh activity. if the id is new tehn we are creating a new activity
            agent.Activities.update(activity).then(()=> {
            setActivities([...activities.filter(x=>x.id !== activity.id), {...activity, id:uuid()}]);
            setselectedActivity(activity)
            setEditMode(false);
            setSubmitting(false);
            })
          }
      else{
            activity.id=uuid();
            agent.Activities.create(activity).then(()=>
            {
              setActivities([...activities, activity])
              setselectedActivity(activity)
              setEditMode(false);
              setSubmitting(false);
            })
        }
      }


    function handleDeleteActivity(id:string)
    {
      setSubmitting(true);
      agent.Activities.delete(id).then(()=>
      {  
        setActivities([...activities.filter(x => x.id!==id)])
        setEditMode(false);
        setSubmitting(false);
      })
    }
      


   






    if (loading) return <LoadingComponent content="Loading app"/>

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
    submitting={submitting}
    />
    </Container>
    </Fragment>
  )
}

export default App
