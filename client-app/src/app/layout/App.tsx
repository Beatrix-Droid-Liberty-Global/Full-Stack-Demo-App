
import { Fragment, useEffect, useState } from 'react';
import DuckItem from './DuckItem.tsx'
import { ducks } from './demo'
import axios, { Axios } from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import type {Activity} from './interfaces/Activity';
import Navbar from './navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard.tsx';



function App() {

//from axios usestate, useffect hooks get request from api with this
//this line initializes a state variable activities with an empty array as its initial value.
//setActivities is a function that will update the activities state.

const [activities,setActivities]=useState<Activity[]>([]);
  
  //accepts a function
  useEffect(()=>
    {
      //.then describes what happens once the response has been returned
      axios.get<Activity[]>("http://localhost:5000/api/activities").then(response =>{setActivities(response.data)})
    },[])


  return (
    <Fragment>
  <Navbar/> //imported from navbar.tsx
    //apply to each duck in the array

<Container style={{marginTop:"7em"}}>
{ducks.map(duck=>(<DuckItem duck={duck}/>))}
    <ActivityDashboard activities={activities}/>
    </Container>
    </Fragment>
  )
}

export default App
