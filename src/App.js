/* eslint-disable no-console */
// Questionnaire.js
import React, { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { auth, db, storage } from './config/firebase'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'

const App = () => {
  const [ movieList, setMovieList ] = useState([])
  //data to send
  const [ movieTitle, setMovieTitle ] = useState('')
  const [ movieRealese, setMovieRealese ] = useState(0)
  const [ receivedAnOscar, setReceivedAnOscar ] = useState(false)
  //data to update
  const [ updateMode, setUpdateMode ] = useState('')
  const [ updatedTitle, setUpdatedTitle ] = useState('')
  const movieCollectionRef = collection(db, 'movies')
  //data to upload
  const [ fileUpload, setFileUpload ] = useState(null)
  const getMovieList = async() => {
    try {
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id
      }))
      setMovieList(filteredData)
    } catch (err) {
      console.log(err, 'err.........')
    }
  }
  const addMovie = async(e) => {
    e.preventDefault()
    try {
      await addDoc(movieCollectionRef, {
        title:movieTitle,
        realeseDate:movieRealese,
        receivedAnOscar:receivedAnOscar,
        userId:auth?.currentUser?.uid
      })
      getMovieList()
    } catch (err) {
      console.log(err)
    }
  }
  const deleteMovie = async(id) => {
    const moviDoc = doc(db, 'movies', id)
    try {
      await deleteDoc(moviDoc)
      getMovieList()
    } catch (err) {
      console.log(err)
    }
  }
  const updateMovie = async(id) => {
    const moviDoc = doc(db, 'movies', id)
    try {
      await updateDoc(moviDoc, {
        title:updatedTitle
      })
      getMovieList()
      setUpdateMode('')
    } catch (err) {
      console.log(err)
    }
  }
  const uploadFile = async() => {
    if (!fileUpload) return
    const fileUploadRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try {
      await uploadBytes(fileUploadRef, fileUpload)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getMovieList()
  }, [])
  return (
    <div className=' w-[100vw] h-[100vh] pt-[700px] flex flex-col justify-center items-center'>
      <Auth/>
      <form className=' my-10 flex justify-center items-center flex-col' onSubmit={addMovie}>
        <input onChange={(e) => setMovieTitle(e.target.value)} className=' w-full h-[40px] outline-none bg-gray-100 mb-3' type='text' placeholder='movie titile...'/>
        <input onChange={(e) => setMovieRealese(e.target.value)} className=' w-full h-[40px] outline-none bg-gray-100 mb-3' type='number' placeholder='movie realese date...'/>
        <input onChange={(e) => setReceivedAnOscar(e.target.checked)} checked={receivedAnOscar} type='checkbox' id='receivedAnOscar'/>
        <label htmlFor='receivedAnOscar'>received An Oscar</label>
        <button className=' bg-green-300 py-2 px-5 text-white' type='submit'> submit </button>
      </form>
      <div>
        {
          movieList.map((movie) => (
            <div key={movie.id} className={`${movie.receivedAnOscar ? 'bg-green-400' : 'bg-red-400'} flex flex-col justify-center items-center w-auto h-auto mb-10 relative`}>
              <AiFillDelete className=' absolute text-[24px] top-[-10px] right-[-10px] text-red-400' onClick={() => deleteMovie(movie.id)}/>
              <AiFillEdit className=' absolute text-[24px] top-[-10px] left-[-10px] text-green-400' onClick={() => updateMode === movie.id ? setUpdateMode('') : setUpdateMode(movie.id)}/>
              {
                movie.title
              }
              {
                updateMode === movie.id && <input onChange={(e) => setUpdatedTitle(e.target.value)} className=' w-full h-[40px] outline-none bg-gray-100 mb-3' type='text' placeholder='movie titile...'/>
              }
              {
                movie.realeseDate
              }
              {
                updateMode === movie.id && <button type='button' onClick={() => updateMovie(movie.id)}>update</button>
              }
            </div>
          ))
        }
      </div>
      <div>
        <label htmlFor='file'>
          choose file...
          <input onChange={(e) => {setFileUpload(e.target.files[ 0 ])}} type='file' id='file' hidden/>
        </label>
        <button type='button' onClick={uploadFile}>upload file</button>
      </div>
    </div>
  )
}

export default App
