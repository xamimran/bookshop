import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styling/add-edit.css"
export default function EditManagerProfile() {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  function handleUpdate(e){
    e.preventDefault();
    console.log(userInfo)
    if(userInfo){
        fetch("/me",{
          method:"PATCH",
          body:JSON.stringify(userInfo),
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role":"manager"
          }
        })
        .then(r=>{
          if(r.ok){
            r.json().then(data=>localStorage.setItem("user",JSON.stringify(data)))
            nav("/dash")
          }
        })
        .catch(e=>console.log(e))
    }
  }
  function handleChange(e){
      setUserInfo(prev=>({...prev, [e.target.name]: e.target.value}))
  }
  function handleDelete(e){
    fetch("/me",{
      method:"DELETE",
      headers:{"Authorization":localStorage.getItem("token"),
      "role":"manager"
    }
    }).then(r=>{
      if(r.ok){
        nav("/")
      }
    })
    .catch(e=>console.log(e))
  }


  // Edit the manager's profile form
  return (
    <div className="add-edit-main">
    <div className="title-logout">
      <h1>{user &&user.bookShopName? user.bookShopName:"BookShop"} Manager</h1>
      <div>Logout<img src="/svgs/logout.svg" alt=""/></div>
    </div>
    <form onSubmit={handleUpdate}>
      <label>
        <p>username: </p>
        <input  onChange={handleChange} name="name" type="text" placeholder={user&& user.name}/>
      </label> 
      <label>
        <p>Email: </p>
        <input  onChange={handleChange} name="email" type="email" placeholder={user&& user.email}/>
      </label> 
      <label>
        <p>Password: </p>
        <input  onChange={handleChange} name="password" type="password"/>
      </label>
      <label>
        <p>BookShop <br/>Name: </p>
        <input  onChange={handleChange} name="bookshop_name" type="text" placeholder={user&& user.bookshop_name}/>
      </label>
      <label>
        <p>Items Alert<br/>Limit: </p>
        <input  onChange={handleChange} min="100" max="1000" name="bookshop_items_alert_limit" type="number" placeholder={user && user.bookshop_items_alert_limit}/>
      </label>
      <div className="buttons">
        <button type="submit" className="add-update">Update</button>
        <button className="delete" onClick={handleDelete}>Delete Profile</button>
      </div>
      
    </form>
  </div>
  );
}
