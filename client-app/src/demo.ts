//  DEMO OF TYPESCRIPT

const data: number=42;


export interface IDuck{

    name:string;
    numLegs:number;
    
    MakeNoise:(sound:string)=>void

}


const duck1: IDuck=
{
    name:"longboi",
    numLegs:2,
    MakeNoise:(sound:string)=>console.log(sound)
}



const duck2: IDuck=
{
    name:"shortboi",
    numLegs:2,
    MakeNoise:(sound:string)=>console.log(sound)
}


duck1.MakeNoise("quack");
duck2.MakeNoise("quick");


export const ducks=[duck1, duck2]
