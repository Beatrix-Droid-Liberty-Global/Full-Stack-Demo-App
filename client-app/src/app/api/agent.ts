import axios, { AxiosResponse } from 'axios';
import { Activity } from '../layout/interfaces/Activity';


const sleep = (delay:number)=>
    {
        return new Promise((resolve)=>
            {
                setTimeout(resolve, delay)
            })
     }



axios.defaults.baseURL="http://localhost:5000/api";
axios.interceptors.response.use(async response => 
    {
        try { 
                await sleep(2000);
                return response;
            }
        catch(error)
            {
                console.log(error);
                return  await Promise.reject(error);
            }
        })

const responseBody= <T>(response:AxiosResponse<T>) => response.data;


const requests={
    get:<T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body:{}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body:{}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url:string) => axios.delete<T>(url).then(responseBody)
}

const Activities={
    list:() => requests.get<Activity[]>("/activities"),
    singleActivity:(id:string) => requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity) =>requests.post<void>("/activities", activity),
    delete: (id:string) => requests.delete<void>(`/activities/${id}`),
    update:(activity:Activity) => requests.put<void>(`/activities/${activity.id}`, activity),


}

const agent={
    Activities
}

export default agent;