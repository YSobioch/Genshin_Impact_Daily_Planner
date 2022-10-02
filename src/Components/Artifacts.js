import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stars from './Stars';
import './Artifacts.css';
import './weapons.css'
import { Link, useOutletContext, useParams } from 'react-router-dom';

export default function Artifacts(props) {
  const [list, setList] = useState([])
  const [stars5List, setStars5List] = useState([])
  const [stars4List, setStars4List] = useState([])
  const [stars3List, setStars3List] = useState([])
  const type = useParams(); 

 
  useEffect(() => {
    setList([]);
    setStars5List([]);
    setStars4List([]);
    setStars3List([]);

  props.artifactNames.map((artifact, index) => {
    let subStat1 = Object.keys(props.artifactStats[index])[2]
    let subStat2 = Object.keys(props.artifactStats[index])[3]
    let subStat1Title = "2 Piece Bonus: ";
    let update = 
        <div className='construction-div'>
          <div className={`star-${props.artifactStats[index].max_rarity}-header`}>
            <h5 className='header-text'>{props.artifactStats[index].name}</h5>
            <div className='title'><Stars number={props.artifactStats[index].max_rarity} /></div>
            <br></br>
          </div> 
          <Row> 
            <div className='artifact-window'> <br></br>
              <div >
              { subStat2 ? <Container >
                <br></br>
              <Row>
                <Container>
                  <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/circlet-of-logos`} alt='circlet' height='100px'/>
                </Container>
              </Row>
              <Row xs="auto">
                <Container>
                  <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/flower-of-life`} alt='flower' height='100px'/>
                  <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/goblet-of-eonothem`} alt='goblet' height='100px'/>
                </Container>
              </Row>
              <Row xs="auto">
                <Container >
                    <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/plume-of-death`} alt='plume' height='100px'/>
                    <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/sands-of-eon`} alt='sands' height='100px'/>
                </Container>
              </Row>
                <br></br>
              </Container>
              : <Container> <br></br>
                    <img className={`star-${props.artifactStats[index].max_rarity}-artifact`} src={`https://api.genshin.dev/artifacts/${artifact}/circlet-of-logos`} alt='circlet' height='100px'/>
                    <br></br> 
                </Container>
              }
              </div>
            </div> <br></br> <br></br>
            <div className='stat-container'>
              <br></br>
              {subStat2 ?
              <div>
                <ul>
                  <li><h6><b>{subStat1Title}</b> {props.artifactStats[index][subStat1]}</h6></li>
                  <li><h6><b>4 Piece Bonus:</b> {props.artifactStats[index][subStat2]}</h6> </li>
                </ul>
              </div>
              :
              <div>
                <ul>
                  <li><h6><b>1 Piece Bonus:</b>  {props.artifactStats[index][subStat1]}</h6></li>
                </ul>
              </div>
              }
            </div>
          </Row>
        </div>

      
        setList(preList => [preList, update])
      

    if(type.type === 'rarity' || type.type === 'rarity1') {
      if(props.artifactStats[index].max_rarity === 5){
        setStars5List(preList => [preList, update])
        console.log('pushing 5 stars')
      } else if(props.artifactStats[index].max_rarity === 4){
        setStars4List(preList => [preList, update])
      } else {
        setStars3List(preList => [preList, update])
        console.log('pushing 3 stars')
      }
      
    }

  })}, [type])


  return (
    <div>
      <Link to='/data/artifacts/sorted-by/rarity1'><button className='sort-button-button'><h5>rarity: low</h5></button></Link>
      <Link to='/data/artifacts/sorted-by/rarity'><button className='sort-button-button'><h5>rarity: high</h5></button></Link>
      <Link to='/data/artifacts/sorted-by/alphabetical'><button className='sort-button-button'><h5>a-z</h5></button></Link>
      
      <h4 className='sort-button'>Sort by: </h4>
      <div className='grid-container'>
        {type.type === 'alphabetical' ?
          <>
          {list}
          </>
        : <></>}
        {type.type === 'rarity' ?
        <>
        {stars5List}
        {stars4List}
        {stars3List}
        </>
        : <></>}
        {type.type === 'rarity1' ?
        <>
        {stars3List}
        {stars4List}
        {stars5List}
        </>
        : <></>}
      </div>
    </div>
    
  )
}
