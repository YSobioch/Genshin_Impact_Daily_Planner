 import { Outlet } from "react-router-dom"
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import data from '../Components/images/data-page-background.png'
import Navbar from "../Components/Navbar";



import { Link } from 'react-router-dom'
import './pages.css'
import Button from "react-bootstrap/esm/Button";


export function DataPage(props) {

    return (
        <> 
            <img src={data} className='data-background'/>
            <br></br>
            <Container>
                <Card>
                    <Navbar className='bar-color-light' links={[
                    <Link to='characters'><button className="tab">Characters</button></Link>,
                    <Link to='weapons'><button className="tab">Weapons</button></Link>,
                    <Link to='artifacts/sorted-by/alphabetical'><button className="tab">Artifacts</button></Link>,]}>
                    </Navbar>
                            
                    <Outlet />
        
                <div className="hidden">
                    {props.card}
                </div>

                </Card>
            </Container> <br></br>
        </>
    )
}