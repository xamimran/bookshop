import AddOrEditEmployee from "./AddOrEdit/AddOrEditEmployee";
import AddOrEditItem from "./AddOrEdit/AddOrEditItem";
import Employees from "./Employees/Employees";
import Items from "./Items/Items";
import ManagerSideBar from "./ManagerSidebar/ManagerSidebar";
import EmployeeSales from "./EmployeeSales/EmployeeSales";
import { Route, Routes } from "react-router-dom";
import EditManagerProfile from "./AddOrEdit/EditManagerProfile";
import "./managerDesktop.css";
import { useState } from "react";

export default function ManagerDesktop({setLoggedIn}){
    // manager's view for all desktops with the side bar
    const[employees, setEmployees] = useState();
    const[items, setItems] = useState();
    return(<div className="manager-desktop">
    <ManagerSideBar managerName={"John"} setLoggedIn={setLoggedIn}/>
        <Routes>
            <Route path="/employees" element={<Employees employees={employees} setEmployees={setEmployees}/>}/>
            <Route path="/transactions" element={<EmployeeSales/>}/>
            <Route path="/items" element={<Items setItems={setItems} items={items}/>}/>
            <Route path="/add_or_edit_employee" element={<AddOrEditEmployee employees={employees}/>}/>
            <Route path="/add_or_edit_employee/:employeeId" element={<AddOrEditEmployee  employees={employees}/>}/>
            <Route path="/add_or_edit_item" element={<AddOrEditItem  items={items}/>}/>
            <Route path="/add_or_edit_item/:itemId" element={<AddOrEditItem items={items}/>}/>
            <Route path="/manager_profile" element={<EditManagerProfile/>}/>
        </Routes></div>)
}