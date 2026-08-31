import './App.css'
import User from './getUser/User'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AddUser from './addUser/AddUser'
import UpdateUser from './updateUser/UpdateUser'

function App() {


  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<User/>}/>
    <Route path='/add' element={<AddUser/>}/>
    <Route path='/update/:id' element={<UpdateUser/>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
