import React from 'react'
import star from './images/star-icon.png';

export default function Stars(props) {
    let numberOfStars = [];

    for(let i = 0; i < props.number; i++) {
        numberOfStars.push(<img src={star} height={'20px'}/>)
    }
  return (
    <>{numberOfStars}</>
  )
}
