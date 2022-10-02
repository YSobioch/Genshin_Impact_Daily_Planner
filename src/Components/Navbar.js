import React from 'react'

import './Navbar.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container'


export default function (props) {

    const buildNavbar = (array) => {
        if (array) {
            let linkArray = [];
            array.map((link, index) => {
                linkArray.push(
                    <Col key={index}>
                        {link}
                    </Col>
                )
            })
            return linkArray
        } else {
            return null;
        }
    }

  return (
    <div>
        <Container className={props.className} fluid>
        <Row xs={'auto'}>
            <Col><h3>{props.name}</h3></Col>
            {buildNavbar(props.links)}
        </Row>
        </Container>
    </div>
  )
}
