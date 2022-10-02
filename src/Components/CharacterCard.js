import React from 'react'
import './CharacterCard.css'
import hydro from './images/hydro-icon.png'

export default function CharacterCard(props) {
  return (
    <div className='test-card-holder'>   
            <div className='test-card-outer'>
                <div className='t-l'></div>
                <div className='tl-dotted'></div> 
                <div className='b-l'></div>
                <div className='bl-dotted'></div>
                <div className='t-r'></div>
                <div className='tr-dotted'></div>
                <div className='b-r'></div>
                <div className='br-dotted'></div>
            </div>
                <div className='outline'></div>
                <div className='diamond-tl'></div>
                <div className='diamond-tr'></div>
                <div className='diamond-bl'></div>
                <div className='diamond-br'></div>
                <div className='content'>
                    <img className='card-image' src={`https://api.genshin.dev/characters/${props.character}/gacha-card`}/>
                    
                    <div className='circlebig'>
                        <div className='circle'>
                            <div className='info-container'>
                                {props.content}

                                
                            </div> 
                        </div>
                    </div> 
                               
                </div>          
        </div>
  )
}
