import React from 'react'
import { SearchCard } from '../Styled'

const ActorCard = ({birthday,name,country,image}) => {
  return (
    <SearchCard>
      <div className='img-wrapper'>
        <img src={image} alt="actor"/>
      </div>

      <h2>{name}</h2>
      <p>{country?`country: ${country}`:'country: Unknown'}</p>
      <p>{birthday?`Birth: ${birthday}`:'Birth: not mentioned'}</p>
    </SearchCard>
  )
}

export default ActorCard
