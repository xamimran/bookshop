import './EmployeeSales.css'
import React, { useState, useEffect } from 'react'

export default function EmployeeSales() {
  const {bookshop_name, name} = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const [employeeSales, setemployeeSales] = useState()
  useEffect(() => {
    fetch('/sales_transactions',{
      headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,
            "role":role
    }
    })
      .then((response) => response.json())
      .then((data) => {
        setemployeeSales(role=="manager" ? data: data.filter(sale => sale.employee_name === name))
      })
  }, [])

  // return <div>{employeeSales.map((sales)=>sales.employee_name)}</div>;
  return (
    <div className="employee-sales">
      <h1>{bookshop_name} {role==="manager" && "Manager"}</h1>

      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Employee</th>
          <th>Total</th>
          <th>Received</th>
          <th>Change</th>
        </tr>
        </thead>
        <tbody>
          {employeeSales && employeeSales.map((sale,ind) => (
            <tr key={ind}>
              <td>{sale.created_at.replace("T"," - ").replace("Z","")}</td>
              <td>{sale.employee_name}</td>
              <td>{sale.amount}</td>
              <td>{sale.recieved}</td>
              <td>{sale.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
