import { useEffect, useState } from 'react'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import { useParams, Redirect } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { DefaultLoading } from 'components/Animations/Loading'

const User = () => {
  const { unidad, id } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const docRef = doc(db, `unidades/${unidad}/integrantes/${id}`)

  const getUser = async () => {
    setLoading(true)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUser(docSnap.data())
      setLoading(false)
      return true
    } else {
      setRedirect(true)
      setLoading(false)
      return false
    }
  }

  useEffect(() => {
    /* getUser in a clean function */
    getUser()
    function clean() {
      setUser({})
      setLoading(false)
    }
    return clean
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (redirect) return <Redirect to={`/admin/${unidad}`} />

  return (
    <>
      <div className='content'>
        {loading ? <DefaultLoading /> : (
          <Row>
            <Col md='4'>
              <Card className='card-user'>
                <CardBody>
                  <CardText />
                  <div className='author'>
                    <div className='block block-one' />
                    <div className='block block-two' />
                    <div className='block block-three' />
                    <div className='block block-four' />
                    <a href='#03Quimbayas' onClick={(e) => e.preventDefault()}>
                      <img
                        alt='...'
                        className='avatar'
                        src={user.foto || 'https://picsum.photos/420'}
                      />
                      <h4 className='title'>{`${user.nombre || ''} ${user.apellidos || ''}`}</h4>
                    </a>
                    <p className='description'>{unidad}</p>
                    {user.telefono && (
                      <p className='h5 mb-1'>
                        <i className='fas fa-phone-alt mr-1' />
                        {user.telefono}
                      </p>
                    )}
                    {user.celular && (
                      <p className='h5'>
                        <i className='fas fa-mobile-alt mr-1' />
                        {user.celular}
                      </p>
                    )}
                  </div>
                  <div className='card-description'>
                    {user.descripcion}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className='button-container'>
                    <Button className='btn-icon btn-round' color='facebook'>
                      <i className='fab fa-facebook' />
                    </Button>
                    <Button className='btn-icon btn-round' color='twitter'>
                      <i className='fab fa-twitter' />
                    </Button>
                    <Button className='btn-icon btn-round' color='google'>
                      <i className='fab fa-google-plus' />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md='8'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Editar Perfil (Deshabilitado)</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className='pr-md-1' sm={6} md='4'>
                        <FormGroup>
                          <label>Unidad</label>
                          <Input
                            defaultValue={unidad}
                            disabled
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' sm={6} md='4'>
                        <FormGroup>
                          <label>Documento</label>
                          <Input disabled defaultValue={user.documento} type='text' />
                        </FormGroup>
                      </Col>
                      <Col className='px-md-1' sm={6} md='4'>
                        <FormGroup>
                          <label>Correo</label>
                          <Input disabled defaultValue={user.email} type='email' />
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' sm={6} md='6'>
                        <FormGroup>
                          <label>Nombres</label>
                          <Input disabled defaultValue={user.nombre} type='text' />
                        </FormGroup>
                      </Col>
                      <Col className='pl-md-1' sm={6} md='6'>
                        <FormGroup>
                          <label>Apellidos</label>
                          <Input disabled defaultValue={user.apellidos} type='text' />
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <label>Dirección</label>
                          <Input disabled
                            defaultValue={user.direccion?.direccion}
                            type='text'
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6} md='3'>
                        <FormGroup>
                          <label>Barrio</label>
                          <Input disabled defaultValue={user.direccion?.barrio} type='text' />
                        </FormGroup>
                      </Col>
                      <Col sm={6} md='3'>
                        <FormGroup>
                          <label>Ciudad</label>
                          <Input disabled defaultValue={user.direccion?.ciudad} type='text' />
                        </FormGroup>
                      </Col>
                      <Col sm={8}>
                        <FormGroup>
                          <label>Acerca de</label>
                          <Input disabled
                            cols='80'
                            defaultValue={user.descripcion}
                            rows='4'
                            type='textarea'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {user.madre || user.padre ? (
                      <Row>
                        <Col md='4'>
                          <Card
                          >
                            <CardBody>
                              <CardTitle tag='h4'>
                                {user.madre?.nombre}
                              </CardTitle>
                              <CardSubtitle
                                className='mb-2 text-muted'
                                tag='h5'
                              >
                                Madre
                              </CardSubtitle>
                              <CardText>
                                {user.madre?.documento}
                                {user.madre?.celular && (
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=57${user.madre.celular}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' color='success' type='button'>
                                      <i className='fab fa-whatsapp' />
                                    </Button>
                                  </a>
                                )}
                                {user.madre?.email && (
                                  <a
                                    href={`mailto:${user.madre.email}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' type='button'>
                                      <i className='fas fa-envelope' />
                                    </Button>
                                  </a>
                                )}
                                {user.madre?.telefono && (
                                  <a
                                    href={`tel:+57604${user.madre.telefono}`}
                                    rel='noreferrer'
                                    target='_blank'
                                  >
                                    <Button className='btn-icon btn-round' color='primary' type='button'>
                                      <i className='fas fa-phone-alt' />
                                    </Button>
                                  </a>
                                )}
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md='4'>
                          <Card
                          >
                            <CardBody>
                              <CardTitle tag='h4'>
                                {user.padre?.nombre}
                              </CardTitle>
                              <CardSubtitle
                                className='mb-2 text-muted'
                                tag='h5'
                              >
                                Padre
                              </CardSubtitle>
                              <CardText>
                                {user.padre?.documento}
                                {user.padre?.celular && (
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=57${user.padre.celular}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' color='success' type='button'>
                                      <i className='fab fa-whatsapp' />
                                    </Button>
                                  </a>
                                )}
                                {user.padre?.email && (
                                  <a
                                    href={`mailto:${user.padre.email}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' type='button'>
                                      <i className='fas fa-envelope' />
                                    </Button>
                                  </a>
                                )}
                                {user.padre?.telefono && (
                                  <a
                                    href={`tel:+57604${user.padre.telefono}`}
                                    rel='noreferrer'
                                    target='_blank'
                                  >
                                    <Button className='btn-icon btn-round' color='primary' type='button'>
                                      <i className='fas fa-phone-alt' />
                                    </Button>
                                  </a>
                                )}
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col md='4'>
                          <Card
                          >
                            <CardBody>
                              <CardTitle tag='h4'>
                                {user.acudiente?.nombre}
                              </CardTitle>
                              <CardSubtitle
                                className='mb-2 text-muted'
                                tag='h5'
                              >
                                Acudiente
                              </CardSubtitle>
                              <CardText>
                                {user.acudiente?.documento}
                                {user.acudiente?.celular && (
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=57${user.acudiente.celular}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' color='success' type='button'>
                                      <i className='fab fa-whatsapp' />
                                    </Button>
                                  </a>
                                )}
                                {user.acudiente?.email && (
                                  <a
                                    href={`mailto:${user.acudiente.email}`}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='mr-1'
                                  >
                                    <Button className='btn-icon btn-round' type='button'>
                                      <i className='fas fa-envelope' />
                                    </Button>
                                  </a>
                                )}
                                {user.acudiente?.telefono && (
                                  <a
                                    href={`tel:+57604${user.acudiente.telefono}`}
                                    rel='noreferrer'
                                    target='_blank'
                                  >
                                    <Button className='btn-icon btn-round' color='primary' type='button'>
                                      <i className='fas fa-phone-alt' />
                                    </Button>
                                  </a>
                                )}
                              </CardText>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    ) : null}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className='btn-fill' color='primary' type='submit'>
                    Guardar
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}


export default User
