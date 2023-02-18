import { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { v4 } from "uuid";
import "./styling/main.css"
import { useNavigate } from "react-router-dom";

export default function Employees({employees, setEmployees}){
    // Render the employees (employee-cards)
    const[searchItem, setSearchItem] = useState("");
    const[reloadTimes,setReloadTimes] = useState(0);
    const nav = useNavigate();
    useEffect(()=>{
        fetch("/employees",{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "role": "manager"}
        })
        .then(r=>r.json())
        .then(res=>setEmployees(res))
        .catch(()=>{setTimeout(()=>{setReloadTimes(prev=>prev+1)},5000)})
    },[reloadTimes]);
    const filteredEmployees = employees? employees.filter(employee=>employee.name
        .toLowerCase().includes(searchItem.toLowerCase())):[];
    return(<div className="employees">
        <div className="search-main">
            <div className="search-bar">
                <input type="text" placeholder="Enter number or name" onChange={(e)=>setSearchItem(e.target.value)}/>
                <img className="search-icon" src="/svgs/search-icon.svg" alt="search-icon"/>
            </div>
            <div className="add" onClick={()=>nav("/dash/add_or_edit_employee")}><img className="add-icon" src="/svgs/add-icon.svg" alt="add"/></div>
        </div>
        <div className="employee-cards">
        {
        employees?filteredEmployees.map(employee=><EmployeeCard key={v4()} employee={employee} setEmployees={setEmployees}/>)
        :
        <div className='employee-loading'>
            <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>
        </div>
        }
        </div>
    </div>)
}