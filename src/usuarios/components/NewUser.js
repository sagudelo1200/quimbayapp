import React from 'react'
import ReactWizard from 'react-bootstrap-wizard'
import { Col } from 'reactstrap'
import ReactBSAlert from 'react-bootstrap-sweetalert'
import classnames from 'classnames'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { toast } from 'react-toastify'


import { useAuth } from 'contexts/authContext'
import { updateProfile, getAuth, deleteUser } from 'firebase/auth'

import PasosIntegrante from './forms/newUserSteps/PasosIntegrante'
import PasosScout from './forms/newUserSteps/PasosScout'
import PasosSalud from './forms/newUserSteps/PasosSalud'

var steps = [
  { stepName: 'integrante', stepIcon: 'fas fa-user', component: PasosIntegrante },
  { stepName: 'scout', stepIcon: 'fas fa-hiking', component: PasosScout },
  { stepName: 'salud', stepIcon: 'fas fa-notes-medical', component: PasosSalud },
]

function NewUser() {
  document.title = 'Nuevo integrante | 03 Quimbayas'
  const [notify, setNotify] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const { register, logoutAndRememberUser } = useAuth()

  const errorMessage = (msg) => {
    setNotify(
      <ReactBSAlert
        danger
        style={{ display: 'block', marginTop: '-100px' }}
        title='Error'
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle='success'
        btnSize=''
      >
        {msg}
      </ReactBSAlert>
    );
  };

  const hideAlert = (exit = false) => {
    setNotify(null)
    setLoading(false)
    if (exit) logoutAndRememberUser()
  }

  const createUser = async (userData) => {
    setLoading(true)

    // Acción para ocultar el alert de inicio de sesión
    localStorage.setItem('registering', true)

    const { email, documento, nombre, foto, unidad } = userData
    let id = null
    // Validar que el email no exista en la base de datos y crear cuenta
    try {
      const res = await register(email, documento)
      await updateProfile(res.user, {
        displayName: nombre,
        photoURL: foto,
      })
      id = res.user.uid
    } catch (error) {
      localStorage.removeItem('registering')
      if (error.code === 'auth/email-already-in-use') {
        errorMessage('Ya existe un usuario con el correo electrónico ingresado.')
        return
      }
      errorMessage(error.message)
      return
    }

    const path = `unidades/${unidad}/integrantes/${documento}`
    const docRef = doc(db, path)
    // valida que el documento no exista en la base de datos
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      // elimina la cuenta creada
      alert('Ya existe un integrante con el documento ingresado.')
      await deleteUser(getAuth().currentUser)
      localStorage.removeItem('registering')
      return
    }

    // crea el documento de usuario de la app en la base de datos
    const userRef = doc(db, `users/${id}`)
    await setDoc(userRef, {
      name: nombre,
      ref: docRef,
      role: unidad === 'jefatura' || unidad === 'consejo' ? 'admin' : 'user',
    })

    // Guardar los datos del integrante en la base de datos
    await setDoc(docRef, {
      ...userData,
      userID: id,
    })
    localStorage.removeItem('registering')
    return true
  }

  const finishButtonClick = async (data) => {
    setLoading(true)
    const userData = { ...data.integrante, ...data.scout, ...data.salud }
    toast.promise(
      createUser(userData),
      {
        pending: 'Creando usuario...',
        success: 'Usuario creado correctamente',
        error: 'Error al crear el usuario',
      })
  }

  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    }
  })

  return (
    <div className='content'>
      {notify}
      <Col className='mx-auto' md={11}>
        {(loading &&
          <div className='text-center'>
            <i className='fa fa-spinner fa-spin fa-10x fa-fw' />
          </div>
        )}
        <div className={classnames('test', { 'd-none': loading })}>
          <ReactWizard
            steps={steps}
            navSteps
            validate
            title='Nuevo integrante'
            description='Por favor, registre la hoja de vida del integrante'
            headerTextCenter
            finishButtonClasses='btn-wd btn-info'
            finishButtonText='Guardar'
            nextButtonClasses='btn-wd btn-info'
            nextButtonText='Siguiente'
            previousButtonClasses='btn-wd'
            previousButtonText='Regresar'
            progressbar
            color='blue'
            finishButtonClick={finishButtonClick}
          />
        </div>
      </Col>
    </div>
  )
}


export default NewUser