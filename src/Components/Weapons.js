import { useState, React, useEffect } from 'react';
import './weapons.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Weapon_image from './Weapon_image';

export default function Weapons(props) {
  const [weapons, setWeapons] = useState();
  let weaponArr = [];
  let weaponList = [];

  useEffect(() => {
  props.weaponNames.map((names, index) => {
    if(names === 'eberlasting-moonglow') {

    } else {
    weaponArr.push(
      <Col key={index} className='weapon-items'>
        
        <Weapon_image availableCharacters = {props.availableCharacters} setStateOfCharacter = {props.setStateOfCharacter} number={index} names={names} stats={props.weaponStats[index]}/>
        <p>{props.weaponStats[index].name}</p>
      </Col>
    )
    }
  })

  
    for(let i = 0; i < props.weaponNames.length; i=i+6) {
      weaponList.push(
        <Row xs={2} md={4} lg={6}>
          {weaponArr[i]} 
          {weaponArr[i+1] ? weaponArr[i+1] : null}
          {weaponArr[i+2] ? weaponArr[i+2] : null}
          {weaponArr[i+3] ? weaponArr[i+3] : null}
          {weaponArr[i+4] ? weaponArr[i+4] : null}
          {weaponArr[i+5] ? weaponArr[i+5] : null}
        </Row>
      )
    }
    setWeapons(weaponList);
  }, [])
  
  
  return (
    <div>{weapons}</div>
  )
}
