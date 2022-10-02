import React, { useCallback, useEffect, useState } from 'react';
import { Link, Routes, Route, Outlet } from "react-router-dom"

import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button';

import './Components.css'
import Stars from './Stars';
import anemo from './images/anemo-icon.png'
import dendro from './images/dendro-icon.png'
import cryo from './images/cryo-icon.png'
import hydro from './images/hydro-icon.png'
import geo from './images/geo-icon.png'
import electro from './images/electro-icon.png'
import pyro from './images/pyro-icon.png'



export default function CollapseCharacter(props) {
    const [values, setValues] = useState(0);
    const [wasClicked, setWasClicked] = useState(false);
    const [backround, setBackround] = useState()
    const [icon, setIcon] = useState()
    
    const isTrue = (charId, key, clickedAgain) => {

        if(charId <= key && charId >= key-3 && clickedAgain === false){
          return true;
        }
        return false;
    }
    
    const handleAddClick = () => {
        if(props.charId || props.charId === 0) {
        props.setStateOfCharacter(props.stats[props.charId], 0, props.charId)
        }
    }

    const handleClick = (number) => {
        if(values === number || wasClicked === false) {
            setValues(number);
            setWasClicked(!wasClicked);
        }
        setValues(number);
    } 

    let boolean = isTrue(props.charId, props.numberkey, props.clicked)

    useEffect (() => {
        if(props.charId || props.charId === 0) {
            switch (props.stats[props.charId].vision) {
                case 'Anemo':
                    setBackround('anemo-backround')
                    setIcon(anemo)
                    break;
                case 'Electro':
                    setBackround('electro-backround')
                    setIcon(electro)
                    break;
                case 'Geo':
                    setBackround('geo-backround')
                    setIcon(geo)
                    break;
                case 'Hydro':
                    setBackround('hydro-backround')
                    setIcon(hydro)
                    break;
                case 'Cryo':
                    setBackround('cryo-backround')
                    setIcon(cryo)
                    break;
                case 'Dendro':
                    setBackround('dendro-backround')
                    setIcon(dendro)
                    break;
                case 'Pyro':
                    setBackround('pyro-backround')
                    setIcon(pyro)
                    break;
            }
        } 
    }, [props.charId])
   
       
  return (
    <>
      
      <Container className='align-left'> <br></br>
      <Collapse in={boolean}>
        <Container> 
        <Row className={backround}>
            <Col className='info-title'>
                <Row>
                    <Col xs={12} md={8}>
                        <h1>{props.charId || props.charId === 0 ? props.stats[props.charId].name : null} {props.charId || props.charId === 0 ? 
                            <Stars number={props.stats[props.charId].rarity}/> : null}</h1> 
                        <h4>{props.charId || props.charId === 0 ? props.stats[props.charId].title : null}</h4><Button variant="outline-secondary" onClick={handleAddClick}>Add to Team</Button>
                    </Col>
                    <Col className='align-right'>
                        <div>
                            <img className='element-icon' src={icon} height={'80px'}/>
                        </div>   
                    </Col>
                </Row>
                <div className='line'></div>
                <div className='info-body'>
                    <p>{props.charId || props.charId === 0 ? props.stats[props.charId].description : null}</p> <br></br>
                    <Row>
                        <Col><h6>Weapon: {props.charId || props.charId === 0 ? props.stats[props.charId].weapon : null}</h6></Col>
                        <Col><h6>Nation: {props.charId || props.charId === 0 ? props.stats[props.charId].nation : null}</h6></Col>
                    </Row> <br></br>
                    <Row>
                        <Col><h6>Affiliation: {props.charId || props.charId === 0 ? props.stats[props.charId].affiliation : null}</h6></Col>
                        <Col><h6>Birthday: {props.charId && props.stats[props.charId].birthday || props.charId === 0 ? props.stats[props.charId].birthday.slice(5) : 'Unkown'}</h6></Col>
                    </Row> <br></br>
                    <br></br> <br></br>
                    <Row><h4>Abilities</h4></Row>
                    <Row xs='auto'>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                            <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-na`} alt='Normal'></img> 
                            <div className='overlay' onClick={() => handleClick(0)}></div>
                        </Link>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                                <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-skill`} alt='Skill'></img>  
                                <div className='overlay' onClick={() => handleClick(1)}></div> 
                        </Link>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                            <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-burst`} alt='Burst'></img>
                            <div className='overlay' onClick={() => handleClick(2)}></div>
                        </Link>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                            <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-passive-2`} alt='Passive 1'></img>
                            <div className='overlay' onClick={() => handleClick(3)}></div>
                        </Link>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                            <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-passive-1`} alt='Passive 2' ></img>
                            <div className='overlay' onClick={() => handleClick(4)}></div>
                        </Link>
                        <Link to={`active/${props.charId}`} className='wrapper'>
                            {(props.charId || props.charId === 0) && props.stats[props.charId].name === 'Traveler' ? null :
                                <>
                                <img src={`https://api.genshin.dev/characters/${props.characters[props.charId]}/talent-passive-0`} alt='Passive 3'></img>
                                <div className='overlay' onClick={() => handleClick(5)}></div>
                                </>
                            }
                        </Link>   
                    </Row>
                    <Collapse in={wasClicked}>
                        <div> <br></br>
                            <Outlet context={values}/>
                        </div>
                    </Collapse>
                </div>
            </Col>
            <Col md={{span: 4}} className='img-container'>
                {props.image[props.charId]}
            </Col>
        </Row>
        </Container>
      </Collapse> <br></br>
      </Container>
    </>
  );
}
