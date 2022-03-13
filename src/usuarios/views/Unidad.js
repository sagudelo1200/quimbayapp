import React, { useEffect } from "react"
import classNames from "classnames"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap"
import routes from 'routes.js'
import { Switch, Link, useRouteMatch } from "react-router-dom"
import { PrivateRoute } from 'routes'

import IntegrantesTable from '../components/IntegrantesTable'
import { Redirect } from 'react-router'
import { useUsers } from 'usuarios/hooks/useUsers'

import User from '../components/User'

const Unidad = () => {
  const [data, setData] = React.useState([])
  const { path } = useRouteMatch()

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }

  const unidad = getActiveRoute(routes).toLowerCase()
  const [usuarios, loading] = useUsers(unidad)
  let datosUnidad = {}

  useEffect(() => {
    setData(
      usuarios.map((prop, key) => {
        return {
          ...prop,
          acciones: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <Button
                size="sm"
                className={classNames("btn-icon btn-link like", {
                  "btn-neutral": false,
                })}
              >
                <Link to={`${path}/${prop.documento}`}>
                  <i className="fas fa-eye" />
                </Link>
              </Button>{" "}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => (alert('No disponible'))}
                size="sm"
                color='danger'
                className={classNames("btn-icon btn-link like", {
                  "d-none": true,
                })}
              >
                <i className="fas fa-trash-alt" />
              </Button>{" "}
            </div>
          ),
        };
      })
    )

    function clean() {
      setData([])
    }

    return clean
  }, [usuarios, path])

  switch (unidad) {
    case 'familia':
      datosUnidad = {
        nombre: 'Familia Mohwa',
      }
      break
    case 'manada':
      datosUnidad = {
        nombre: 'Manada Seoonee',
      }
      break
    case 'tropa':
      datosUnidad = {
        nombre: 'Tropa Arawak',
      }
      break
    case 'sociedad':
      datosUnidad = {
        nombre: 'Sociedad Sion',
      }
      break
    case 'clan':
      datosUnidad = {
        nombre: 'Clan Taironas',
      }
      break
    case 'jefatura':
      datosUnidad = {
        nombre: 'Jefatura Katios',
      }
      break
    case 'consejo':
      datosUnidad = {
        nombre: 'Consejo de padres',
      }
      break
    default:
      return <Redirect to='/admin/dashboard' />
  }

  document.title = `${datosUnidad.nombre} | 03 Quimbayas`

  const component = () => {
    return (
      <>
        <Col md={8} className='ml-auto mr-auto'>
          <h2 className='text-center'>{datosUnidad.nombre}</h2>
        </Col>
        <Row className="mt-5">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag='h2'>Integrantes</CardTitle>
              </CardHeader>
              <CardBody>
                <IntegrantesTable
                  data={data}
                  filterable
                  loading={loading}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Documento',
                      accessor: 'documento',
                      filterable: true,
                    },
                    {
                      Header: 'Nombre',
                      accessor: 'nombreCompleto',
                      filterable: true,
                    },
                    {
                      Header: 'Correo',
                      accessor: 'email',
                    },
                    {
                      Header: 'Estado',
                      accessor: 'estado',
                    },
                    {
                      Header: 'Acciones',
                      accessor: 'acciones',
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <div className="content">
        <Switch>
          <PrivateRoute exact path={path}>
            {component()}
          </PrivateRoute>
          <PrivateRoute exact path={`/admin/:unidad/:id`} >
            <User />
          </PrivateRoute>
          <Redirect to={`/admin/${unidad}`} />
        </Switch>
      </div>
    </>
  );
};

export default Unidad
