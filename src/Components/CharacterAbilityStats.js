 import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
 
 export default function CharacterAbilityStats(props) {
  const { index } = useParams()
  const clickedAbility = useOutletContext()

  if(props.charAbilities[index].name === 'Traveler' && clickedAbility === 5) {
    return null
  }
  if (clickedAbility > 2) {
    return (
      <div>
      <h5>{props.charAbilities[index].passiveTalents[clickedAbility - 3].name}</h5>
      <p>{props.charAbilities[index].passiveTalents[clickedAbility - 3].description}</p>
     </div>
    )
  }

   return (
     <div>
      <h5>{props.charAbilities[index].skillTalents[clickedAbility].name}</h5>
      <p>{props.charAbilities[index].skillTalents[clickedAbility].description}</p>
     </div>
   )
 } 