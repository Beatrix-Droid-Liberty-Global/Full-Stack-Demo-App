// a react component
import {IDuck} from "./demo"
interface Props{
    duck: IDuck
}

export default function  DuckItem({duck}:Props) {
    return(
          <div key={duck.name}>
            <span>{duck.name}</span>
           //defer method so that it only works onclick
            <button onClick={()=>duck.MakeNoise(duck.name + "quack!")}></button>
          </div>
        )
      
    }
