/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { auth, GoogleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth'
function Auth() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const signIn = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.log(err)
    }
  }
  const logOut = async() => {
    try {
      await signOut(auth)
    } catch (err) {
      console.log(err)
    }
  }
  const signInWithGoogle = async() => {
    try {
      await signInWithPopup(auth, GoogleProvider)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log(auth.currentUser?.email, auth.currentUser?.photoURL, auth.currentUser?.phoneNumber)
  }, [ email ])
  return (
    <>
      <button type='button' onClick={logOut}>logOut</button>
      <form className=' w-[53%] h-[50%] flex flex-col justify-center items-start' onSubmit={signIn}>
        <input type='text' className=' w-full h-[40px] outline-none bg-gray-100 mb-3' onChange={(e) => setEmail(e.target.value)} placeholder='email' name='email' />
        <input type='password' className=' w-full h-[40px] outline-none bg-gray-100 mb-3' onChange={(e) => setPassword(e.target.value)} placeholder='password' name='password' />
        <button type='button' className=' bg-green-300 py-2 px-5 mb-2 text-white'>signIn</button>
        <button type='button' className=' bg-green-300 py-2 px-5 text-white' onClick={signInWithGoogle}>signIn with google</button>
      </form>
    </>
  )
}

export default Auth