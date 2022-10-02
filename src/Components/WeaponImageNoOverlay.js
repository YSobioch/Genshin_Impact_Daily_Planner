import React, { useState } from 'react'
import CloseButton from 'react-bootstrap/esm/CloseButton';
import Col from 'react-bootstrap/esm/Col';
import './WeaponNoOverlay.css'



//functionality so we don't have to import every .png from the ./images/weapons folder
function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../Components/images/Weapons', false, /\.(png|jpe?g|svg)$/));



export default function Weapon_image(props) {

    const handleDelete = (charId, itemId) => {
      props.delete(charId, itemId)
    }

    //sets the return value to the default API image
    let weaponImages = <img src={`https://api.genshin.dev/weapons/${props.names}/icon`} height='100px' width='100px' />


    //sets the return value to the image in file should it not find the API image
    if(images[`${props.names}.png`]) {
      weaponImages = <img src={images[`${props.names}.png`]} height='100px' width='100px' />
    }

  return (
    <>
    <Col className='weapon-container'>
      {props.delete ? 
        <button onClick={() => handleDelete(props.character, props.itemAt)}>x</button>
        : <></>}
    {weaponImages}
    </Col>
    </>
  )
}
