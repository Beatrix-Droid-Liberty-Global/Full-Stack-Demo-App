
import { useEffect, useState } from 'react';
import './App.css'
import DuckItem from './DuckItem'
import { ducks } from './demo'
import axios, { Axios } from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  //from axios usestate, useffect hooks get request from api with this
  const [activities,setActivities]=useState([]);
  
  //accepts a function
  useEffect(()=>
    {
      //.then describes what happens once the response has been returned
      axios.get("http://localhost:5000/api/activities").then(response =>{setActivities(response.data)})
    },[])


  return (
    <div>
    <Header as="h2" icon="users" content="Reactivities"/>
    //apply to each duck in the array
    {ducks.map(duck=>(<DuckItem duck={duck}/>))}

    <List>
      {activities.map((activity:any)=>(<List.Item key={activity.id}>{activity.title}</List.Item>))}
    </List>
    </div>
  )
}

export default App
