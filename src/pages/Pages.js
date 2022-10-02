import React, { Component } from 'react'
import { Link, Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import { FrontPage } from './FrontPage';
import { CustomizePage } from './CustomizePage';
import { DataPage } from './DataPage';
import { CharacterList } from '../Components/CharacterList';
import CharacterAbilityStats from '../Components/CharacterAbilityStats';
import './pages.css'
import Weapons from '../Components/Weapons';
import Artifacts from '../Components/Artifacts';

export default class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            characterStats: [],
            characterCards: [],
            characterLevelMat: null,
            weapons: [],
            weaponStats: [],
            weaponLevelMat: null,
            artifacts: [],
            artifactStats: [],
            character_slots: [
              {id: 1, character: null, items: [], position: null, lvlMat: null},
              {id: 2, character: null, items: [], position: null, lvlMat: null},
              {id: 3, character: null, items: [], position: null, lvlMat: null},
              {id: 4, character: null, items: [], position: null, lvlMat: null},
              {id: 5, character: null, items: [], position: null, lvlMat: null},
              {id: 6, character: null, items: [], position: null, lvlMat: null},
              {id: 7, character: null, items: [], position: null, lvlMat: null},
              {id: 8, character: null, items: [], position: null, lvlMat: null},
            ],
        }
      this.setStateOfCharacter.bind(this);
      this.deleteStateOfCharacter.bind(this);
      this.deleteStateOfItem.bind(this);
    }

    setStateOfCharacter = (newState, itemAt, charId) => {

      let hasChangedCharacter = false;
      const returnState = this.state.character_slots.map(obj => { 
        if(itemAt === 0) {
          if(obj.character === null && !hasChangedCharacter) {
            hasChangedCharacter=true;
            let generateTalentLvl;
              this.state.characterLevelMat.freedom.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.freedom
                }
              })
              this.state.characterLevelMat.resistance.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.resistance
                }
              })
              this.state.characterLevelMat.ballad.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.ballad
                }
              })
              this.state.characterLevelMat.prosperity.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.prosperity
                }
              })
              this.state.characterLevelMat.diligence.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.diligence
                }
              })
              this.state.characterLevelMat.gold.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.gold
                }
              })
              this.state.characterLevelMat.transience.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.transience
                }
              })
              this.state.characterLevelMat.elegance.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.elegance
                }
              })
              this.state.characterLevelMat.light.characters.map(character => {
                if(character === this.state.characters[charId]) {
                  generateTalentLvl = this.state.characterLevelMat.light
                }
              })
            console.log(generateTalentLvl)
            return {...obj, character : newState, position : charId, lvlMat: generateTalentLvl}
          }
        }   
        
        if(obj.id === itemAt) {
          return {...obj, items: [...obj.items, newState]}
        }  

        return obj;
      })
      this.setState({character_slots: returnState})
    }



    deleteStateOfCharacter = (charId) => {
       const deleteCharacter = this.state.character_slots.map((characterSlot, index) => {
          if(charId === characterSlot.id) {
            return {id: {charId}, character: null, items: [], position: null, lvlMat: null}
          }
          return characterSlot;
        })
        this.setState({character_slots: deleteCharacter})
    }

    deleteStateOfItem = (charId, itemId) => {
      const deleteItem = this.state.character_slots.map((characterSlot) => {
        if(charId === characterSlot.id) {
          let newItems = characterSlot.items;
          newItems.splice(itemId, 1);
          return {...characterSlot, items: newItems}
        }
        return characterSlot
      })
      this.setState({character_slots: deleteItem})  
    }

    fetchCharacterStats = async () => {
        const res = await fetch('https://api.genshin.dev/characters/all')
        const characters = await res.json()
        this.setState({characterStats: characters});
    }
 
    fetchCharacters = async () => {
         const res = await fetch(`https://api.genshin.dev/characters`)
         const character = await res.json()
         this.setState({characters: character}) 
         this.generateImageCards(character);    
    }

    fetchCharacterLevelMat = async () => {
      const res = await fetch('https://api.genshin.dev/materials/talent-book')
      const characterLevelMat = await res.json()
      this.setState({characterLevelMat: characterLevelMat})
    }

    fetchWeapons = async () => {
      const res = await fetch('https://api.genshin.dev/weapons')
      const weapons = await res.json()
      this.setState({weapons: weapons});
    }

    fetchWeaponStats = async () => {
      const res = await fetch('https://api.genshin.dev/weapons/all')
      const weaponStats = await res.json();
      this.setState({weaponStats: weaponStats});
    }

    fetchWeaponLevelMat = async () => {
      const res = await fetch('https://api.genshin.dev/materials/weapon-ascension')
      const weaponLevelMat = await res.json()
      this.setState({weaponLevelMat: weaponLevelMat})
    }

    fetchArtifacts = async () => {
      const res = await fetch('https://api.genshin.dev/artifacts')
      const artifacts = await res.json()
      this.setState({artifacts: artifacts});
    }

    fetchArtifactStats = async () => {
      const res = await fetch('https://api.genshin.dev/artifacts/all')
      const artifactStats = await res.json();
      this.setState({artifactStats: artifactStats});
    }

    
    generateImageCards = (array) => {
      let arr = [];
      array.map((character, index) => 
        arr.push(<img key={index} src={`https://api.genshin.dev/characters/${character}/card`} className='cover'/>))
      this.setState({characterCards: arr})
    }

    async componentDidMount() {
        this.fetchCharacterStats();
        this.fetchCharacters();
        this.fetchCharacterLevelMat();
        this.fetchWeapons();
        this.fetchWeaponStats();
        this.fetchWeaponLevelMat();
        this.fetchArtifacts();
        this.fetchArtifactStats();
    }

  render() {
    return (
        <>
          <Routes>
            <Route path="/" element={<FrontPage team={this.state.character_slots} weaponLevelMat={this.state.weaponLevelMat}/>} />
            <Route path="/customize" element={<CustomizePage value={this.state.character_slots} character={this.state.characters} setStateOfCharacter = {this.setStateOfCharacter} 
                                              deleteItem={this.deleteStateOfItem} deleteCharacter={this.deleteStateOfCharacter}/>} />
            <Route path="/data" element={<DataPage characters={this.state.characters} characterStats={this.state.characterStats} card={this.state.characterCards}/>}>
              <Route path='characters' element={<CharacterList setStateOfCharacter = {this.setStateOfCharacter} characters={this.state.characters} characterStats={this.state.characterStats} card={this.state.characterCards}/>} >
                <Route path='active/:index' element={<CharacterAbilityStats charAbilities={this.state.characterStats}/>}/>
              </Route>
              <Route path='weapons' element={<Weapons availableCharacters={this.state.character_slots} setStateOfCharacter = {this.setStateOfCharacter} weaponNames={this.state.weapons} weaponStats={this.state.weaponStats}/>} />
              <Route path='artifacts'>
                <Route path='sorted-by/:type' element={<Artifacts artifactNames={this.state.artifacts} artifactStats={this.state.artifactStats}/>}/>
              </Route>
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </>
    )
    
  }
  
}
