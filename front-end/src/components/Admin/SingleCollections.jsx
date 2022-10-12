import { useEffect } from "react";
import { useParams } from "react-router-dom";
const SingleCollection =()=> {
    const {id} = useParams()
    console.log("id",id);
    const token = window.localStorage.getItem("token");
    useEffect(()=> {
        fetchSingleCollection()
    },[])
    const fetchSingleCollection =async()=> {
        const response = await fetch(`https://itransition-capstone.herokuapp.com/collections/${id}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        })
        const data = await response.json()
        console.log("DATA",data);
    }
    return(
        <h1>Single collection page</h1>
    )
}
export default SingleCollection