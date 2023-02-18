import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styling/add-edit.css"
export default function AddOrEditItem({ items}) {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const {itemId} = useParams();
  const editItem = items&& items.find(item=>item.id== itemId)
  const [userInfo, setUserInfo] = useState(editItem?editItem:null);
  function handleUpdate(e){
    e.preventDefault();
    console.log(userInfo)
    if(userInfo){
      itemId?  fetch(`/items/${itemId}`,{
          method:"PATCH",
          body:JSON.stringify({...userInfo, img_url: `${userInfo.img_url}`,price_per_item:parseInt(userInfo.price_per_item),
            qty: parseInt(userInfo.qty)}),
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role":"manager"
          }
        })
        .then(()=>nav("/dash/items"))
        .catch(e=>console.log(e))
        :
        fetch("/items",{
          method:"POST",
          body:JSON.stringify(userInfo),
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role":'manager'
          }
        })
        .then(()=>nav("/dash/items"))
        .catch(e=>console.log(e))
    }
  }
  function handleChange(e){
      setUserInfo(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  return(
  <div className="add-edit-main">
    <div className="title-logout">
      <h1>{user &&user.bookshop_name? user.bookshop_name:"BookShop"} Manager</h1>
      <div>Logout<img src="/svgs/logout.svg" alt=""/></div>
    </div>
    <form onSubmit={handleUpdate} id="form">
      <label>
        <p>Name: </p>
        <input  onChange={handleChange} name="name_or_title" type="text" placeholder={editItem&& editItem.name_or_title}/>
      </label> 
      <label>
        <p>Make/<br/>Publisher: </p>
        <input  onChange={handleChange} name="manufacturer_or_author" type="text" placeholder={editItem&& editItem.manufacturer_or_author}/>
      </label> 
      <label>
        <p>Image url: </p>
        <input  onChange={handleChange} name="img_url" type="text" placeholder={editItem&& editItem.img_url}/>
      </label>
      <label>
        <p>Price: </p>
        <input  onChange={handleChange} min="1" name="price_per_item" type="number" placeholder={editItem&& editItem.price_per_item}/>
      </label>
      <label>
        <p>Category: </p>
        <input  onChange={handleChange} name="category" type="text" />
      </label>
      <label>
        <p>Quantity: </p>
        <input  onChange={handleChange} name="qty" type="number" placeholder={editItem&& editItem.qty}/>
      </label>
      <div className="buttons">
        <button type="submit" className="add-update">{itemId?"Update":"Add"}</button>
      </div>
      
    </form>
  </div>)
}
