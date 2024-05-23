
import { useEffect, useState } from 'react';
import './App.css'
import DuckItem from './DuckItem'
import { ducks } from './demo'
import axios, { Axios } from 'axios';

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
    <h1>Reactivities</h1>
    //apply to each duck in the array
    {ducks.map(duck=>(<DuckItem duck={duck}/>))}

    <ul>
      {activities.map((activity:any)=>(<li key={activity.id}></li>))}
    </ul>
    </div>
  )
}

export default App
