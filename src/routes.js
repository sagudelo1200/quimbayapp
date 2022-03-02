import {
  useLocation,
  Redirect,
  Route,
} from 'react-router-dom'
import { useAuth } from 'contexts/authContext'

import Login from 'views/Login'
import Lock from 'views/Lock'

import Dashboard from 'views/Dashboard.js'
import Unidad from 'usuarios/views/Unidad.js'
import NewUser from 'usuarios/components/NewUser'
import Actividades from 'actividades/views/Actividades'


const routes = [
  {
    path: '/ingresar',
    name: 'Ingresar',
    icon: 'fas fa-sign-in-alt',
    component: Login,
    layout: '/auth',
    invisible: true
  },
  {
    path: '/bloqueo',
    name: 'Bloqueo',
    icon: 'fas fa-lock',
    component: Lock,
    layout: '/auth',
    invisible: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: 'fas fa-chart-pie',
    component: Dashboard,
    layout: '/admin',
  },
  {
    collapse: true,
    name: 'Unidades',
    icon: 'fas fa-users',
    state: 'unidadesCollapse',
    views: [
      {
        path: '/nuevo-integrante',
        name: 'Nuevo Integrante',
        icon: 'fas fa-user-plus',
        component: NewUser,
        layout: '/admin',
      },
      {
        path: '/familia',
        name: 'Familia',
        mini: 'F',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/manada',
        name: 'Manada',
        mini: 'M',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/tropa',
        name: 'Tropa',
        mini: 'T',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/sociedad',
        name: 'Sociedad',
        mini: 'S',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/clan',
        name: 'Clan',
        mini: 'C',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/jefatura',
        name: 'Jefatura',
        mini: 'J',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/consejo',
        name: 'Consejo',
        mini: 'C',
        component: Unidad,
        layout: '/admin',
      }
    ]
  },
  {
    path: '/actividades',
    name: 'Actividades',
    icon: 'fas fa-calendar-alt',
    component: Actividades,
    layout: '/admin',
  },
]

const PrivateRoute = (props) => {
  const { isAuthenticated } = useAuth()
  const { path } = props
  const location = useLocation()

  if (
    path === '/auth/ingresar' ||
    path === '/auth/bloqueo' ||
    path === '/auth/recuperar-contraseña' ||
    path === '/auth/cambiar-contraseña'
  ) {
    return isAuthenticated() ? (
      <Redirect to={location.state?.from ?? '/admin/dashboard'} />
    ) : (
      <Route {...props} />
    )
  }
  return isAuthenticated() ? (
    <Route {...props} />
  ) : localStorage.getItem('user') ? (
    <Redirect
      to={{
        pathname: '/auth/bloqueo',
        state: { from: location.pathname }
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: '/auth/ingresar',
        state: { from: location.pathname }
      }}
    />
  )
}


export default routes
export { PrivateRoute }