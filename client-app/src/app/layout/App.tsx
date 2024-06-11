
import { Fragment, useEffect } from 'react';
import DuckItem from './DuckItem.tsx'
import { ducks } from './demo'
import { Container} from 'semantic-ui-react';
import Navbar from './navbar.tsx';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard.tsx';
import LoadingComponent from './loadingComponent.tsx';
import { useStore } from '../stores/store.ts';
import { observer } from 'mobx-react-lite';

function App() {
// returns store 
const {activityStore}= useStore();


//from axios usestate, useffect hooks get request from api with this
//this line initializes a state variable activities with an empty array as its initial value.
//setActivities is a function that will update the activities state


  //accepts a function
  useEffect(()=>{activityStore.loadActivities();},[activityStore])

    //if id is not null then handleselect activity. else cancel the activity
   


  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>

  return (
    <Fragment>
  <Navbar/> //imported from navbar.tsx
    //apply to each duck in the array

<Container style={{marginTop:"7em"}}>



{ducks.map(duck=>(<DuckItem duck={duck}/>))}
    <ActivityDashboard/>
    </Container>
    </Fragment>
  )
}

export default observer(App);
