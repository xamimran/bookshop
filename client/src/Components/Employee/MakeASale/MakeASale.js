import './styling/sale.css'
import { useState, useEffect } from 'react'
import PosSidebar from './PosSidebar'
import SaleItems from './SaleItems'
import { useNavigate } from 'react-router-dom'

export default function MakeASale({ setLoggedIn }) {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [change, setChange] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const nav = useNavigate();

  const filteredItems = items
    ? items.filter((item) =>
      item.name_or_title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    : null

  useEffect(() => {
    fetch(`/items`, {
      headers: {
        role: '',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((r) => r.json())
      .then((json) => {
        setItems(
          json.filter(item=>item.active).map((item) => ({ ...item, isCartItem: false, total_sold: 1 }))
        )
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  function handleCalc(e) {
    const total = items && items.reduce((total, item) => item.isCartItem ? item.total_sold * item.price_per_item + total : total, 0)
    setChange(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value) - total)
    setReceivedAmount(parseInt(e.target.value))
  }
  function checkout(){
    const amount = items.reduce((total, item) => item.isCartItem ? item.total_sold * item.price_per_item + total : total, 0);
    const cartItems = items.filter(item=>item.isCartItem);
    console.log(receivedAmount)
    fetch("/sales_transactions",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
          items: cartItems,
          recieved: receivedAmount,
          amount: amount,
          change: change
      })
    })
    .then(r=>{
      if(r.status===201){
        r.json().then(res=>{
          setItems(prev=>prev.map(item=>({...item, isCartItem: false, total_sold: 1 })))
          setReceivedAmount(0)
          setChange(0)
          nav("/make_sale")
        })
      }
    })
    .catch(e=>console.log(e))
  }


  return (
    <div className="point-of-sale">
      <PosSidebar setItems={setItems} items={items} isSearching={searchInput.length > 0} checkout={checkout}
      change={change} setSearchInput={setSearchInput} />
      <div className="sale-items-div">
        <div className='search-div'>
          <input
            className="search-in-all-items"
            type="text"
            placeholder='Search for the item name'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          /><img src="/svgs/black-logout.svg" alt="logout" onClick={() => { setLoggedIn(false);localStorage.clear(); nav("/"); }} />
        </div>
        <SaleItems isNotSearching={searchInput.length === 0}
          items={items} setItems={setItems} filteredItems={filteredItems} setChange={setChange} />


        <div className='sale-calc-main'>
          <div className='flex-main'>
          <h2>MAKE CALCULATIONS</h2>
            <div className='total-h4s'>
              
              <h4>Total Qty sold</h4>
              <h4>Total amount</h4>
              <h4>Recieved</h4>
              <h4 className='change'>Change</h4>
            </div>
            <div className='total-text'>
              <h4>{items && items.reduce((total, item) => item.isCartItem ? item.total_sold + total : total, 0).toLocaleString()}</h4>
              <h4>{items && items.reduce((total, item) => item.isCartItem ? item.total_sold * item.price_per_item + total : total, 0).toLocaleString()}</h4>
              <input type="number" onChange={handleCalc} value={receivedAmount}/>
              <h4 className='change' style={change < 0 ? { color: "red" } : { color: "#0368FF" }}>{change.toLocaleString()}</h4>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}
