import React, { useState } from "react";
import ActorGrid from "../components/Actors/ActorGrid";
import ShowGrid from  "../components/Shows/ShowGrid";
import MainPageLayout from "../components/MainPageLayout";

import {apiGet} from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import { RadioInputsWrapper, RadioWrapper, SearchButtonWrapper, SearchInput } from "./Home.Styled";

function Home(){
  const [input, setInput] = useLastQuery();
  const [results,setResult]=useState(null);
  const [searchOptions,setSearchOptions]=useState('shows');
 
   const isShowsSearch=searchOptions==='shows';
  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOptions}?q=${input}`).then(result=> setResult(result));
    }
  const onRadioChange=(event)=>{
    setSearchOptions(event.target.value);

  }

  const keyPressed=(event)=>{
    if(event.keyCode===13)
    onSearch();
  }

  //function for rendring results at line no 31
  const renderResult=()=>{
    if(results && results.length===0)
     return <div>No results</div>

    if(results && results.length >0){
    return results[0].show?( <ShowGrid data={results}/>):(<ActorGrid data={results}/>)
    }
    return null;
  }

  return (
    <MainPageLayout>
      {<SearchInput type="text" placeholder="Search for something" onKeyDown={keyPressed} onChange={handleOnChange} value={input} /> } 
      
     
      
      <RadioInputsWrapper>
        <div>
            <RadioWrapper htmlFor="shows-search">
              Shows
              <input id="shows-search" type="radio" value="shows" onChange={onRadioChange} checked={isShowsSearch}/>
              <span/>
            </RadioWrapper>
        </div>
        <div>
            <RadioWrapper htmlFor="actors-search">
             Actors
              <input id="actors-search" type="radio" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
            <span/>
            </RadioWrapper>
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
   
  );
}
export default Home;
