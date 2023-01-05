import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col'
import Weapon_image from '../Components/WeaponImageNoOverlay';

import './FrontPage.css'
import cecilia from './images/cecilia-garden.png'
import ceciliaLocation from './images/cecilia-garden-location.png';
import courtOfSands from './images/court-of-flowing-sand.png';
import courtOFSandsLocation from './images/court-of-flowing-sand-location.png';
import forsaken from './images/forsaken-rift.png';
import forsakenLocation from './images/forsaken-rift-location.png';
import palace from './images/hidden-palace-of-lianshan.png';
import palaceLocation from './images/hidden-palace-of-lianshan-location.png';
import taishan from './images/taishan-mansion.png';
import taishanLocation from './images/taishan-mansion-location.png';
import violet from './images/violet-court.png';
import violetLocation from './images/violet-court-location.png';


export function FrontPage(props) {
    const [cardClass, setCardClass] = useState('card-frontpage')
    const [itemToFarm, setItemToFarm] = useState([]);
    const [characterToDo, setCharacterToDo] = useState([]);

    const handleColorChange = () => {
        setCardClass('card-front-clicked')
    }

    let today = new Date();
    let day = today.toLocaleString('en-us', {weekday: 'long'});
    
    

    useEffect(() => {
        let domainToFarm = [];
        props.team.map(character => {
            let usedDomain = false;
            let usedItemDomain = false;
            if(character.items.length > 0) {
                character.items.map((item, index) => {
                    const fetchItem = async () => {
                        let res = await fetch(`https://api.genshin.dev/weapons/${item}`);
                        let itemObj = res.json();
                        let materialKey = await itemObj
                        let domain;
                        let location;
                        let itemDomain = props.weaponLevelMat[materialKey.ascensionMaterial]
                        if(itemDomain.availability[0] === day || itemDomain.availability[1] === day || itemDomain.availability[2] === day) {
                            switch (itemDomain.source) {
                                case 'cecilia-garden': 
                                    domain = cecilia;
                                    location = ceciliaLocation;
                                    break;
                                case 'hidden-palace-of-lianshan':
                                    domain = palace;
                                    location = palaceLocation;
                                    break;
                                case 'court-of-flowing-sand':
                                    domain = courtOfSands;
                                    location = courtOFSandsLocation;
                                    break;
                            }
                            setItemToFarm(itemArray => [...itemArray,
                                <>
                                
                                <Card className='toDoCard'>
                                
                                    <Row><h2 className='center'>{itemDomain.source}</h2></Row>
                                    <Row>
                                        <Row className="justify-content-md-center">

                                                <div className='weaponImage'>
                                                    <Weapon_image names={item} />
                                                </div>

                                            <Col xs lg="2">
                                                <img src={`https://api.genshin.dev/materials/weapon-ascension/${itemDomain.items[0].id}`}
                                                 alt={itemDomain.items[0].name} title={itemDomain.items[0].name} height='100px'/>
                                            </Col>
                                            <Col xs lg="2">
                                                <img src={`https://api.genshin.dev/materials/weapon-ascension/${itemDomain.items[1].id}`}
                                                 alt={itemDomain.items[1].name} title={itemDomain.items[1].name} height='100px'/>
                                            </Col>
                                            <Col xs lg="2">
                                                <img src={`https://api.genshin.dev/materials/weapon-ascension/${itemDomain.items[2].id}`}
                                                 alt={itemDomain.items[2].name} title={itemDomain.items[2].name} height='100px'/>
                                            </Col>
                                            <Col xs lg="auto">
                                                <img src={`https://api.genshin.dev/materials/weapon-ascension/${itemDomain.items[3].id}`}
                                                 alt={itemDomain.items[3].name} title={itemDomain.items[3].name} height='100px'/>
                                            </Col>
                                        </Row>
                                    </Row>
                                    <br></br>
                                    <div className='line-two'></div> <br></br>
                                    <Row className="justify-content-md-center">
                                        <Col xs='auto'>
                                            <img src={domain} height='250px' width='500px'/>
                                        </Col>
                                        <Col xs='auto'>
                                            <img src={location} height='250px' width='500px'/>
                                        </Col>
                                    </Row>
                                    <br></br>
                                    </Card>
                                <br></br>
                                </>
                            ]);
                        }
    
                    }
                    fetchItem();              
                })
    
    
            }
            if(character != null && character.lvlMat) {
                if(character.lvlMat.availability[0] === day || character.lvlMat.availability[1] === day || character.lvlMat.availability[2] === day) {
                    for(let i = 0; i < domainToFarm.length; i++) {
                        if(domainToFarm[i].name === character.lvlMat.source) {
                            usedDomain = true;
                            domainToFarm[i].characters.push(<h4>{character.character.name}</h4>) 
                        }
                    }

                    let charDomain;
                    let location;
                    switch (character.lvlMat.source) {
                        case 'forsaken-rift':
                            charDomain = forsaken;
                            location = forsakenLocation;
                            break;
                        case 'taishan-mansion':
                            charDomain = taishan;
                            location = taishanLocation;
                            break;
                        case 'violet-court':
                            charDomain = violet;
                            location = violetLocation;
                            break;
                    }

                    if(!usedDomain && character.character != null) {
                        domainToFarm.push({
                            name: character.lvlMat.source,
                            characters: [<h4>{character.character.name}</h4>],
                            domainImg: charDomain,
                            domainLocation: location,
                            materialsToday: [
                                <Col xs lg='2'>
                                <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[0].id}`} title={`${character.lvlMat.items[0].name}`} height='140px' />
                                </Col>,
                                <Col xs lg='2'>
                                <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[1].id}`} title={`${character.lvlMat.items[1].name}`} height='140px' />
                                </Col>,
                                <Col xs lg='2'>
                                    <img src={`https://api.genshin.dev/materials/talent-book/${character.lvlMat.items[2].id}`} title={`${character.lvlMat.items[2].name}`} height='140px' />
                                </Col>
                            ]             
                        })
                    }
                }
                
            }
        })
    
        
        domainToFarm.map(domain => {
            setCharacterToDo(list => [...list,
                <>
                <Card className='center'>
                <h2>{domain.name}</h2>
                <h2>{domain.characters}</h2>
                <Row className="justify-content-md-center">{domain.materialsToday}</Row>
                <div className='line-two'></div> <br></br>
                    <Row className="justify-content-md-center">
                        <Col xs='auto'>
                            <img src={domain.domainImg} height='250px' width='500px'/>
                        </Col>
                        <Col xs='auto'>
                            <img src={domain.domainLocation} height='250px' width='500px'/>
                        </Col>
                    </Row> <br></br>
                </Card>
                <br></br>
                </>
            ])
        })
    }, [props.team])
    
    
    

    return (
        
        <Container>
        <br></br>
        <h1>Your list for today: </h1>
        <div className='line'></div>
        <br></br>  <br></br>
        <div className={cardClass} onClick={handleColorChange}>
            <a href="https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&utm_source=hoyolab&utm_medium=tools&lang=en-us&bbs_theme=light&bbs_theme_device=1"
            target="_blank">
                <h1>Daily Check-In</h1>
            </a>
        </div>
        <br></br>
        {characterToDo.length > 0 ? <h1>Character Talent Book Domains:</h1>
        : <h1 className='nullText'>It Looks like you don't have any characters or weapons to farm for today</h1>}
        
        {characterToDo}
        <br></br>
        {itemToFarm.length > 0 ? 
        <>
        <h1>Weapon Material Domains:</h1>
        {itemToFarm}
        </>
        : <></>}
        </Container>
        
    )
}