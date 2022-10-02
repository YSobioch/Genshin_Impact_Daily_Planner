import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container';
import Popup from './Popup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Example from './Collapse';
import './Components.css'
import { Outlet } from 'react-router-dom';
import CollapseCharacter from './Collapse';

export function CharacterList(props) {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [numberId, setNumberId] = useState();
    const [clickedOn, setClickedOn] = useState(null);
    const [clickedOnBoolean, setClickedOnBoolean] = useState(false)
    const [clickedOnReturn, setClickedOnReturn] = useState(false)

    let characterCards = [];
    let characterList = [];
    let tempCharArr = [];

    const youClicked = (character, image, charId) => {
        setButtonPopup(!buttonPopup);
        setNumberId(charId);
        wasClickedAgain(charId)
        setClickedOnBoolean(!clickedOnBoolean)
    }

    const wasClickedAgain = (charId) => {
        if(charId === clickedOn) {
            setClickedOnReturn(!clickedOnReturn)
            
        } else {
            setClickedOn(charId)
            setClickedOnReturn(false)
        }
    }

    props.characters.map((character, index) => {
        let characterAtIndex = `${character}/icon-big`;
        let characterImage = props.card[index]
        let characterName = props.characterStats[index].name;

        if(props.characterStats[index].name === 'Traveler'){
            characterAtIndex = 'traveler-anemo/icon-big-aether';
            characterName = `${characterName}: ${props.characterStats[index].vision}`
        }
        

        characterCards.push(
            <div key={index}>
                <h3>{characterName}</h3>
                <div onClick={() => youClicked(props.characterStats[index], characterImage, index)}>
                    <Link to={`active/${index}`}>
                        <img src={`https://api.genshin.dev/characters/${characterAtIndex}`} height='150px'/>     
                    </Link>
                </div>
            </div>
        )
    })

    for(let i = 0; i < characterCards.length; i++){
        tempCharArr.push(<Col key={i}>{characterCards[i]}</Col>);
        if((i + 1) % 4 === 0) {
            characterList.push(
                <>
                <Row key={i * 12} >
                    {tempCharArr}
                </Row>
                <CollapseCharacter key={i} boolean={buttonPopup} charId={numberId} 
                    numberkey={i} clicked={clickedOnReturn} stats={props.characterStats} 
                    image={props.card} characters={props.characters} statsToggle={clickedOnBoolean}
                    setStateOfCharacter={props.setStateOfCharacter}/>
                </>
            )
            tempCharArr = [];
        } else if (i + 1 === characterCards.length) {
            characterList.push(
                <>
                <Row key={i*23}>
                    {tempCharArr}
                </Row>
                <CollapseCharacter key={i} boolean={buttonPopup} charId={numberId} 
                    numberkey={i} clicked={clickedOnReturn} stats={props.characterStats} 
                    image={props.card} characters={props.characters} statsToggle={clickedOnBoolean}
                    setStateOfCharacter={props.setStateOfCharacter}/>
                </>
            )
            tempCharArr = [];
        }
    }

    return (
        <div> 
            
            <Container className='align-center'>
                {characterList}
            </Container>
        </div>       

    )
}