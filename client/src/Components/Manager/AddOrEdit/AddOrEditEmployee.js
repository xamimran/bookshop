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
      <form onSubmit={handleUpdate} id="form">
        <div class="container mt-5 mb-5 d-flex justify-content-center">
            <div class="card px-1 py-4">
                <div class="card-body">
                    <h3 class="card-title mb-3">{user &&user.bookshop_name? user.bookshop_name:"BookShop"} Manager</h3>
                    <h6 class="information mt-4">Please provide following information</h6>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                              <input class="form-control" type="text" onChange={handleChange} placeholder={editEmployee&& editEmployee.name}/> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="input-group"> <input class="form-control" type="text" onChange={handleChange} placeholder={editEmployee&& editEmployee.email}/> </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="input-group"> <input class="form-control" type="password" onChange={handleChange} placeholder="Password"/> </div>
                            </div>
                        </div>
                    </div>
                    <div class=" d-flex flex-column text-center px-5 mt-3 mb-3"> <small class="agree-text">Update / Add this button </small> <a href="#" class="terms">Terms & Conditions</a> </div> 
                    <button class="btn btn-danger btn-block confirm-button">{employeeId?"Update":"Add"}</button>
                </div>
            </div>
        </div>
      </form>
  </div>
  );
}

