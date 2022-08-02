import React from 'react'
import ActorCard from './ActorCard'
import IMAGE_NOT_FOUND from '../images/not-found.png'
import {FlexGrid} from "../Styled"

const ActorGrid = ({data}) => {
  return (
    <FlexGrid>
    {data.map(({person})=>(<ActorCard 
                             key={person.id} 
                             id={person.id} 
                             name={person.name} 
                             birthday={person.birthday}
                             country={person.country?person.country.name:null}
                             image={person.image?person.image.medium:IMAGE_NOT_FOUND}
                             />))}
       
    </FlexGrid>
  )
}

export default ActorGrid
