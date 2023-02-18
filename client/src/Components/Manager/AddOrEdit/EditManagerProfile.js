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
    </div>
    <div class="container mt-5 mb-5 d-flex justify-content-center">
    <div class="card px-1 py-4">
          <div class="card-body">
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                        <input class="form-control" onChange={handleChange} name="name" type="text" placeholder="User Name"/> 
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                          <div class="input-group"> 
                            <input class="form-control" onChange={handleChange} name="email" type="email" placeholder={user&& user.email}/> 
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                          <div class="input-group"> 
                          <input class="form-control" onChange={handleChange} name="password" type="password"/> 
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                          <div class="input-group"> 
                          <input class="form-control" onChange={handleChange} name="bookshop_name" type="text" placeholder={user&& user.bookshop_name}/> 
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-sm-12">
                      <div class="form-group">
                          <div class="input-group"> 
                          <input class="form-control"  onChange={handleChange} min="100" max="1000" name="bookshop_items_alert_limit" type="number" placeholder={user && user.bookshop_items_alert_limit}/> 
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row"> 
                  <button class="btn btn-block confirm-button column border border-danger" style={{color:"red"}}>Update</button>
                  <button class="btn btn-danger btn-block confirm-button column mr-2" onClick={handleDelete}>Delete Profile</button>
              </div>
          </div>
      </div>
      </div>
  </div>
  );
}
