import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
export default function EmployeeCard({ employee, setEmployees }) {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState();
    const nav = useNavigate();
    const { id, name, salesTransactions, active } = employee;
    const unknownError=()=>{
        setTimeout(()=>{setError(()=>({message:"Unknown Error.\nContact Support."}))},1250)
        setTimeout(()=>{setLoading(false)},100);
    }

  const errorOccurred=(e)=>{
    setTimeout(()=>{setError(()=>e)},125)
    setTimeout(()=>{setLoading(false);setError(()=>null);},300);
  }

  function handleDelete() {
    setLoading(true)
    fetch(`/employees/${id}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role": "manager"},
        method:"DELETE"})
    .then(r=>{
        if(r.ok){
            setTimeout(()=>{setLoaded(()=>true);setLoading(false);},100)
            setTimeout(()=>{
                setEmployees(prev=>prev.filter(emp=>emp.id!==id))
            },300);

        }else{
            unknownError();
        }
    })
    .catch(e=>{
        errorOccurred(e);
    })
  }

  function handleActive(){
    setLoading(true)
    fetch(`/employees/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "role": "manager"},
        body:JSON.stringify({active:!active}),
        method:"PATCH"})
        .then(r=>{
            if(r.ok){
                setTimeout(()=>{setLoaded(()=>true);setLoading(false);},100)
                setTimeout(()=>{
                    setEmployees(prev=>prev.map(employee=>employee.id===id?{...employee, active:!active}:employee))
                },1000);
    
            }else{
                unknownError();
            }
        })
        .catch(e=>{
            errorOccurred(e);
        })
  }
  return <div className='employee-card'>
     {loading ? 
        (error ?
        <div className='employee-error'><p>{error.message}</p></div>
        : <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>)
   :(loaded? <div className='success-delete'>
                <p><strong>COMPLETE</strong> <br/>{name}</p>
            </div>:
        <>
            <p>{name}</p>
            <img src="/svgs/employees-black.svg" alt="employees" />
            <p>Sales : {salesTransactions.length}</p>
            <div className="buttons">
                <img src={`/svgs/${active?"closed-eye-icon.svg":"eye-icon.svg"}`} alt="icon" onClick={()=>handleActive()}/>
                <img src="/svgs/edit-icon.svg" alt="icon" onClick={()=>nav(`/dash/add_or_edit_employee/${id}`)}/>
                <img src="/svgs/delete-icon.svg" alt="icon" onClick={handleDelete} />
            </div>
        </>
      )}
    </div>
}
