import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from 'firebaseApp'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: null,
  login: null,
  rememberLogin: null,
  logoutAndRememberUser: null,
  register: null,
  logout: null,
  forgotPassword: null,
  resetPassword: null,
  isAuthenticated: null,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})

  const checkRole = async (user) => {
    const userRef = doc(db, `users/${user.uid}`)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      console.error(`User ${user.uid} not found`)
      logout()
      throw new Error(`User ${user.uid} not found`)
    }

    if (userDoc.data().role === 'admin') {
      console.log(`User ${user.uid} is admin`)
      setCurrentUser(user)
    } else {
      console.error(`User ${user.uid} is not admin`)
      logout()
      throw new Error('El acceso se encuentra restringido')
    }
  }

  const loginToast = (user) => {
    return toast.promise(
      checkRole(user),
      {
        pending: 'Iniciando sesión...',
        success: 'Acceso autorizado',
        error: 'Acceso restringido',
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('Auth state changed', user)
      if (user && !localStorage.getItem('registering')) {
        loginToast(user)
      } else {
        setCurrentUser({})
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line
  }, [])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function rememberLogin(user) {
    const { email, displayName, photoURL } = user
    localStorage.setItem('user', JSON.stringify({ email, displayName, photoURL }))
  }

  function logoutAndRememberUser() {
    rememberLogin(currentUser)
    return signOut(auth)
  }


  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    localStorage.removeItem('user')
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function isAuthenticated() {
    return !!currentUser.uid
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    rememberLogin,
    logoutAndRememberUser,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
