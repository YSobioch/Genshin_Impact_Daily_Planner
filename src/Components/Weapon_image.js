import React, { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/esm/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Stars from './Stars';
import { Link } from 'react-router-dom';

//functionality so we don't have to import every .png from the ./images/weapons folder
function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

const images = importAll(require.context('../Components/images/Weapons', false, /\.(png|jpe?g|svg)$/));


export default function Weapon_image(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };

    const handleAddClick = (item, character) => {
      props.setStateOfCharacter(item, character)
  }


    //sets the return value to the default API image
    let weaponImages = <img src={`https://api.genshin.dev/weapons/${props.names}/icon`} height='100px' width='100px' onClick={handleClick}/>
    let test = `https://api.genshin.dev/weapons/${props.names}/icon`


    //sets the return value to the image in file should it not find the API image
    if(images[`${props.names}.png`]) {
      weaponImages = (<img src={images[`${props.names}.png`]} height='100px' width='100px' onClick={handleClick}/>)
    }

    let buttons = [];

    const generateButtons = () => {
      props.availableCharacters.map((character, index) => {
        if(character.character != null && character.character.weapon === props.stats.type) {
          let name = character.character.name;
          let isDisabled = false;
          if(character.items.length >= 3) {
            name = `${character.character.name}: WEAPON MAX`
            isDisabled = true;
          }
          buttons.push(<Link to='/customize'><Button href='/customize' variant="outline-light" onClick={() => handleAddClick(props.names, character.id)}
          disabled={isDisabled}>{name}</Button></Link>)
        }
      })
    }
    generateButtons()

  return (
    <OverlayTrigger
          show={show}
          target={target}
          key={props.names}
          placement='bottom'
          overlay={
            <div id={`popover-positioned-${props.names}`} className='popover'>
              <div className={`star-${props.stats.rarity}-header`}>
                <Row>
                <Col><h3>{props.stats.name}</h3> {buttons} <Stars number={props.stats.rarity}/></Col>
                <CloseButton className='popover-header' onClick={handleClick}></CloseButton>
                </Row>
                </div>
              <div className={`star-${props.stats.rarity}-background`}>
                  <Row>
                    <Col><h3>Base Attack </h3> <h4>{props.stats.baseAttack}</h4></Col>
                    <Col><h3>Second Stat</h3> <h4>{props.stats.subStat}</h4></Col>
                  </Row> <br></br>
                  <Row>
                    <h6>{props.stats.passiveName}</h6>
                    <p>{props.stats.passiveDesc}</p>
                  </Row>
                  
              </div>
            </div>
            }
          >
    {weaponImages}
    </OverlayTrigger>
  )
}
