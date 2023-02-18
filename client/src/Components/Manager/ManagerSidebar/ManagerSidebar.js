import './styling/main.css'
import { NavLink, useNavigate } from 'react-router-dom'

export default function ManagerSideBar({ managerName, setLoggedIn }) {
  // manager's side bar
  const nav = useNavigate();
  return (
    <div className="manager-sidebar">
      <img className='book-reader' src="/svgs/book-reader.svg" alt="book-reader" />
      <p>{managerName}</p>
      <hr />
      <NavLink to="/dash" className={"shadow-lg p-3 mb-5 bg-dark rounded"}>
        <img src="/svgs/dashboard.svg" alt="dashboard" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="./employees" className={"shadow-lg p-3 mb-5 bg-dark rounded"}>
        <img src='/svgs/employees.svg' alt='employees'/>
        <span>Employees</span>
      </NavLink>
      <NavLink to="./items" className={"shadow-lg p-3 mb-5 bg-dark rounded"}>
        <img src='/svgs/items.svg' alt='items'/>
        <span>Items</span>
      </NavLink>
      <NavLink to="./transactions" className={"shadow-lg p-3 mb-5 bg-dark rounded"}>
        <img src='/svgs/transactions.svg' alt='transactions'/>
        <span>Transactions</span>
      </NavLink>
      <div className='bottom'>
        <hr/>
        <div onClick={/*Logout and navigate to landing page */ ()=>{setLoggedIn(false);localStorage.clear();nav("/")}}>
            <img src='/svgs/logout.svg' alt="logout"/>
            <span>Logout</span>
        </div>
      </div>
    </div>
  )
}
