import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
export default function PosSidebar({
  setItems,
  isSearching,
  setSearchInput,
  checkout,
  change
}) {
  const nav = useNavigate();
  const completeButton = useRef();
  const  {name} = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <div className="pos-sidebar">
        <h1>Sales</h1>
        <p>{name}</p>
        <hr />
        <button
          className="input-btn"
          type="submit"
          onClick={() => nav('/dash')}
        >
          Back to Dashboard
        </button>
        {isSearching ? (
          <button className="input-btn" type="submit" onClick={() => { setSearchInput('') }}>
            Back To Sale
          </button>
        ) : (
          <>
            <button className="input-btn" type="submit" 
            onClick={() =>setItems((prev) => prev.map((item) => ({...item,isCartItem: false,sell_qty: 1,  })))  } >
              Cancel
            </button>
            <button style={{backgroundColor:change<0 &&"rgba(232, 72, 72, 0.45)"}} ref={completeButton} className="input-btn" type="submit" onClick={change>-1?checkout:()=>{}}>
              Complete
            </button>
          </>
        )}
      </div>
    </>
  )
}
