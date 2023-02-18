import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "./addOrEdit.css";
export default function AddOrEditEmployee({employees }) {
  const nav = useNavigate();
  const {employeeId} = useParams();
  const editEmployee = employees&& employees.find(item=>item.id== employeeId)
  const [userInfo, setUserInfo] = useState(editEmployee?editEmployee:null);
  const user = JSON.parse(localStorage.getItem("user"));
  function handleUpdate(e){
    e.preventDefault();
    console.log(userInfo)
    if(userInfo){
      employeeId?  fetch(`/employees/${employeeId}`,{
          method:"PATCH",
          body:JSON.stringify(userInfo),
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role":"manager"
          }
        })
        .then(()=>nav("/dash/employees"))
        .catch(e=>console.log(e))
        :
        fetch("/employees",{
          method:"POST",
          body:JSON.stringify(userInfo),
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role":'manager'
          }
        })
        .then(()=>nav("/dash/employees"))
        .catch(e=>console.log(e))
    }
  }
  function handleChange(e){
      setUserInfo(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  return (
    <div className="add-edit-main">
      <div className="title-logout">
        <h1>{user &&user.bookshop_name? user.bookshop_name:"BookShop"} Manager</h1>
        <div>Logout<img src="/svgs/logout.svg" alt=""/></div>
      </div>
      <form onSubmit={handleUpdate} id="form">
          <label>
            <p>Name:</p> <input required type="text" name="name" onChange={handleChange} placeholder={editEmployee&& editEmployee.name}/>
          </label>
          <label>
            <p>Email:</p> <input required type="email" name="email" onChange={handleChange} placeholder={editEmployee&& editEmployee.email}/>
          </label>
          <label>
            <p>Password:</p>
            <input required type="password" name="password" onChange={handleChange} />
          </label>
        <div className="buttons">
          <button type="submit" className="add-update">{employeeId?"Update":"Add"}</button>
        </div>
      
    </form>
  </div>
  );
}

