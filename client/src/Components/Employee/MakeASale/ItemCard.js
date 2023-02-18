import {FiCheck} from "react-icons/fi"
import Checkbox from "react-custom-checkbox";
export default function ItemCard({ item, isDisplayingCart,setItems, setChange}) {
  const {id,name_or_title,isCartItem,img_url,manufacturer_or_author,qty,price_per_item, total_sold} = item
  function handleItemToCart(){
    setChange(prev=> isCartItem? prev + (total_sold*price_per_item) : prev - (total_sold*price_per_item))
    setItems(prev=>prev.map(item=>item.id===id?{...item, isCartItem: !item.isCartItem, total_sold: 1}:item))
  }
  function handleQtySold(opt){
    setItems(prev=>prev.map(item=>item.id===id?{...item, total_sold: (opt==="add" ?item.total_sold+ 1: item.total_sold-1)}:item))
    setChange(prev=>opt==="add"? prev - price_per_item: prev + price_per_item )
  }
  return (
    <div className="item-card">
      <div className="div-20">
        <img src={img_url} alt="" />
      </div>
      <div className="div-40">
        <p>{name_or_title}</p>
      </div>
      <div className="div-40">
        <p>{manufacturer_or_author}</p>
      </div>
      <div className="div-40 sell-qty">
        {isDisplayingCart ? <>
            <p>{total_sold}</p>
            <button onClick={()=>item.qty> item.total_sold&&handleQtySold("add")}>Qty +</button>
            <button onClick={()=>item.total_sold> 1 && handleQtySold("")}>Qty -</button>
        </>:<p>{qty}</p>}
      </div>
      <div className="price-and-checkbox">
        <p>$ {isDisplayingCart ? (total_sold*price_per_item).toLocaleString():price_per_item.toLocaleString()}</p>
        {isDisplayingCart ? <img src="/svgs/delete-icon.svg" onClick={()=>handleItemToCart()}/>:
        <Checkbox className="custom-checkbox" borderColor = "white" borderRadius={4}
        type="checkbox" checked={isCartItem} 
        icon={
            <div
              style={{
                display: "flex",
                flex: 1,
                backgroundColor: "blue",
                alignSelf: "stretch",
                borderRadius: "4px"
              }}
            >
              <FiCheck color="white" size={20} />
            </div>
          }
        onChange={()=>handleItemToCart()}
        /> }
      </div>
    </div>
  )
}
