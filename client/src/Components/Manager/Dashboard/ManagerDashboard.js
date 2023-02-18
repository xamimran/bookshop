import { useEffect, useState } from "react";
import "./styling/main.css";
import {v4} from "uuid";
import { useNavigate } from "react-router-dom";
export default function ManagerDashboard({setLoggedIn}) {
  // eslint-disable-next-line
  const {name,bookshop_name, bookshop_items_alert_limit, employees} = JSON.parse(localStorage.getItem("user"))
  const [dashboardObj, setDashboardObj] = useState({items:[], salesTransactions:[]});
  const [currentTime, setCurrentTime] = useState();
  const nav = useNavigate();
  
  function changeTime(){
    const changeTimVar = new Date();
    const hr = changeTimVar.getHours();
    const min = changeTimVar.getMinutes();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    setCurrentTime((hr% 12 ===0?(12): hr) + ":" + (min < 10?`0${min}` : min) + " " + (hr> 12? "pm":"am")+ " "+ weekday[changeTimVar.getDay()] + " " + month[changeTimVar.getMonth()] )
  }

  useEffect(()=>{
    fetch("/items",{
      headers:{
    "Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then(r=>{
      if(r.ok){
        r.json().then(data=>setDashboardObj(prev=>({...prev, items:data})))
      }
    })
    .then(()=>{
    })
    .catch(e=>console.log(e))
    fetch("/sales_transactions",{
      headers:{"role":"manager",
    "Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    .then(r=>{
      if(r.ok){
        r.json().then(data=>setDashboardObj(prev=>({...prev, salesTransactions:data})))
      }
    })
    .catch(e=>console.log(e))
  },[]);
  setInterval(changeTime,1000)
  // Manager's Dashboard
  return (
  <div className="manager-dashboard">
    <div className="title-and-time">
      <h2>{bookshop_name.toUpperCase()}</h2>
      <h4 className="time">{currentTime}</h4>
    </div>
    <div className="logout" onClick={()=>{setLoggedIn(false);localStorage.clear();nav("/")}}>
      <img src="/svgs/logout.svg" alt=""/>
    </div>
    <div className="dashboard-all-items">
      <div onClick={()=>{nav("./transactions")}}>
        <h3>Sale & Transactions</h3>
        <div className="sales-and-transactions div-glass">
          <span>{dashboardObj.salesTransactions&& dashboardObj.salesTransactions.length}</span>
          <img src="/svgs/history-logo.svg" alt=""/>
          <small>Transactions</small>
        </div>
      </div>
      <div onClick={()=>{nav("./employees")}}>
        <h3 className="employees-h3">Employees</h3>
        <div className="div-glass">
          <span>{employees &&  employees.length}</span>
          <img src="/svgs/employees.svg" className="employees" alt=""></img>
            <small>Employee List</small>
        </div>
      </div>
      <div onClick={()=>{nav("./items")}}>
        <h3>Items</h3>
        <div className="items-main-div">
          <div className="div-glass">
            <img src="/svgs/dashboard-items.svg" className="employees" alt=""/>
          </div>
          <div className="items-alert">
            {dashboardObj.items.filter(item=>item.qty<bookshop_items_alert_limit).slice(0,3).map(item=><div key={v4()}>
              <span>{item.qty}</span>
              <p>{item.name_or_title}</p>
            </div>)}
          </div>
        </div>
      </div>
    </div>
    <div className="dashboard-all-items">
      <div onClick={()=>{nav("./manager_profile")}}>
        <h3>Edit Profile</h3>
        <div className="div-glass">
          <small className="profile">{name}</small>
          <small className="profile">{bookshop_name}</small>
        </div>
      </div>
    </div>
  </div>);
}