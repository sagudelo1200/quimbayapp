import React from 'react'
// reactstrap components
import {
  Row,
  Col,
} from 'reactstrap'


const ActivityCard = ({ item }) => {

  return (
    <>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} className='text-center'>
          <h4>{item.nombre || 'Actividad sin nombre'}</h4>
        </Col>
        <Col xs={10} sm={4} md={3} className='text-center'>
          <img src={item.imagen} alt='Publicidad de la actividad' />
        </Col>
        <Col sm={3} md={2} className='text-center text-sm-left'>
          {item.lugar && <span><i className='fas fa-map-marker-alt text-danger mx-2' /> {item.lugar}</span>}
          <br className='d-none d-sm-block' />
          {item.fecha && <span><i className='fas fa-calendar-alt text-primary mx-2' />{item.fecha}</span>}
          <br />
          {item.hora && <span><i className='fas fa-clock text-success ml-2 mr-1' /> {item.hora}</span>}
          <br className='d-none d-sm-block' />
          {item.precio && <span><i className='fas fa-dollar-sign text-warning mx-2' /> {item.precio}</span>}
        </Col>
        <Col md={7} className='text-center mt-4 mt-md-0'>
          <p>{item.descripcion}</p>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default ActivityCard
