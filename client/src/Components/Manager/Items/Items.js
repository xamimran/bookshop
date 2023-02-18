import { useEffect, useState } from "react"
import ItemCard from "./ItemCard";
import "./items.css"
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Items({items, setItems}){
    // render the items (item-cards)
    // TODO add search and filter functionalities
    // TODO add eye, edit and click item-icon redirects functionalities
    const[reloadTimes,setReloadTimes] = useState(0);
    const[searchItem, setSearchItem] = useState("");
    const nav = useNavigate();
    useEffect(()=>{
        fetch("/items",{
          headers:{"role":"manager",
          "Authorization": `Bearer ${localStorage.getItem("token")}`}
        })
        .then(r=>{
            if(r.ok){
                console.log("okay");
                r.json().then(json=>{
                    setItems(json)
                })
            }
        })
        .catch(()=>{setTimeout(()=>{setReloadTimes(prev=>prev+1)},5000)})
    },[reloadTimes])
    const filteredItems = items? items.filter(item=>item.name_or_title
        .toLowerCase().includes(searchItem.toLowerCase())):[];
    return(<div className="items">
        <div className="search-main">
            <div className="search-bar">
                <input type="text" placeholder="Enter number or name" onChange={(e)=>setSearchItem(e.target.value)}/>
                <img className="search-icon" src="/svgs/search-icon.svg" alt="search-icon"/>
            </div>
            <div className="add" onClick={()=>nav("/dash/add_or_edit_item")}><img className="add-icon" src="/svgs/add-icon.svg" alt="add"/></div>
        </div>
        <div className="item-cards">
            {items ? filteredItems.map(item=><ItemCard key={v4()} item={item} setItems={setItems}/>)
            :
            <div className='item-loading'>
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
            </div>}
        </div>
    </div>)
}
