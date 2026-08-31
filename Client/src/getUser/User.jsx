import React from 'react'
import './user.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'
import API from "../api.js";
const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() =>{
        const fetchData = async () =>{
            try {
               const response = await axios.get(`${API}`)  
               setUsers(response.data)
            } catch (error) {
                console.log("error while fetching data:", error)
            }
        }
        fetchData()
    }, [])

    const deleteUser = async(userid) =>{
        //  await axios.delete(`http://localhost:5000/api/delete/users/${userid}`)
        await axios.delete(`${API}${userid}`)
         .then((response) =>{
         setUsers((prevUsers) => prevUsers.filter((users) =>users._id !==userid))
         toast.success(response.data.message, {position:"top-right"})
         })
         .catch((error) =>{
            console.log(error)
         })
    }


 return (
    <div className="userTable">
        <Link to="/add" type="button" class="btn btn-primary">
            Add User<i class="fa-solid fa-user-plus"></i>
        </Link>

          {users.length === 0 ? (
        <div className="nodata">
            <h3>No data to disppaly</h3>
            <p>Please add the user</p>
        </div>
    ):(
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope='col'>S.No</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>

         <tbody>
            {users.map((user, index) =>{
                return (
            <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td className='actionButtons'>
                    <Link to={`/update/` + user._id} type="button" class="btn btn-info">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    
                    <button 
                    type="button"
                    onClick={() =>deleteUser(user._id)}
                    class="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                    </button>
                    
                </td>
            </tr>
                )
            })}
                   
                </tbody>
            </table>
     )}
        
        </div>
    )
}

export default User
