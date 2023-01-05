import Container from "react-bootstrap/esm/Container"
import CharacterCard from "../Components/CharacterCard";
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import './pages.css'
import Weapon_image from "../Components/WeaponImageNoOverlay";
import { Link } from "react-router-dom";


export function CustomizePage(props) {
    const handleDeleteClick = (charId) => {
        props.deleteCharacter(charId)
    }

        let hasNoCharacters = true;
        let listElements = [];
        props.value.map((character, index) => {
            let itemList = [];
            if(character.character != null) {
                hasNoCharacters=false;
                if(character.items.length > 0) {
                    character.items.map((item, index) => {
                         {
                        itemList.push(
                            <Weapon_image names={item} delete={props.deleteItem} character={character.id} 
                                itemAt={index}></Weapon_image>
                        )}
                    })
                }
                listElements.push(
                    <CharacterCard key={index} character={props.character[character.position]} content={
                        <Row >
                            <h2>{character.character.name}</h2> <br></br><br></br>
                            <h4>Level Up Material</h4>
                            <Row>
                                {character.lvlMat ? 
                                <>
                                <Col>
                                    <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[0].id}`} title={`${character.lvlMat.items[0].name}`} height='70px' />
                                </Col>
                                <Col>
                                    <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[1].id}`} title={`${character.lvlMat.items[1].name}`} height='70px' />
                                </Col>
                                <Col>
                                <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[2].id}`} title={`${character.lvlMat.items[2].name}`} height='70px' />
                                </Col>
                                </>
                                : <h6>No level up material data at this time</h6> 
                                }
                            </Row>
                            <div><h4>Weapons <span>{character.items.length < 3 ? 
                                <Link to='/data/weapons'><button className="add-button"><h3>+</h3></button></Link>
                                : <></>}</span></h4></div>
                            <Row>
                                {itemList} 
                            </Row>
                            <Row >
                                <Col xs={1}>
                                <Button className='bottom-button' variant="outline-success" >Focus</Button>
                                </Col>
                                <Col xs={5}>
                                <Button className='bottom-button' variant="outline-secondary" onClick={() => handleDeleteClick(character.id)}>Remove from Team</Button>
                                </Col>
                            
                            
                            </Row>
                           
                        </Row>}>
                    </CharacterCard>
                )
            }
        })

    return (
        <div className="card-holder">
            <br></br>
            {hasNoCharacters ? 
                <>
                <h1>Looks like you haven't added any characters yet</h1>
                    <img src="https://ih1.redbubble.net/image.2138484772.9442/st,small,507x507-pad,600x600,f8f8f8.jpg" height='300px'/>
                </>
            : <h1>Your Team</h1>}
            
            <div className="grid-layout">
            {listElements}
            </div>
        </div>
    )
}