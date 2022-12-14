import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
import ShowMainData from "../components/Shows/ShowMainData";
import Details from "../components/Shows/Details";
import Seasons from "../components/Shows/Seasons";
import Cast from "../components/Shows/Cast"
import { InfoBlock, ShowPageWrapper } from "./show.Styled";


const reducer=(prevState,action)=>{
          switch(action.type){

               case 'FETCH_SUCCESS':{
                    return{isLoading:false,error:null,show:action.show}
               }
               case 'FETCH_FAILED':{
                    return{...prevState,isLoading:false,error:action.error}
               }

               default:
                    return prevState;
          }
}
const initialState={
     show:null,
     isLoading:true,
     error:null

}
const Show = () => {
  const { id } = useParams();
  const [{show,isLoading,error},dispatch]=useReducer(reducer,initialState)
  //const [show, setShow] = useState(null);
  //const [isLoading,setIsLoading]=useState(true);
  //const [error,setError]=useState(null)

  useEffect(() => {
     let isMounted=true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then((result) => {
      
      
          if(isMounted){
               dispatch({type:'FETCH_SUCCESS',show:result})
         
           } })
      .catch(err=>{
          if(isMounted){
              dispatch({type:'FETCH_FAILED',error:err.message})
     }
     })
   
    return ()=>{
      isMounted=false;
    }
  }, [id]);
 
 if(isLoading)
 {
    return <div>Data is being loaded...</div>
 }
 if(error)
 {
    return <div>error occured:{error}</div>
 }
 return <ShowPageWrapper>
     <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>
 
      
  <InfoBlock>
  <h2>Details</h2>
  <Details status={show.status} network={show.network} premiered={show.premiered} />
  {console.log('details')} 
  </InfoBlock>

  <InfoBlock>
  <h2>Seasons</h2>
  <Seasons seasons={show._embedded.seasons} />
  {console.log('seasons')} 
  </InfoBlock>

  <InfoBlock>
  <h2>Cast</h2>
  <Cast cast={show._embedded.cast} />
  {console.log('cast')} 
  </InfoBlock>
  
  </ShowPageWrapper>
};

export default Show;
