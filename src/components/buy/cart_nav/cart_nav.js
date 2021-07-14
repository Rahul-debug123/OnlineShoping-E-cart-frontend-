import React,{useState,useEffect} from 'react';
import Cart from '../cart/cart';
import "./cart_nav.css";
import Scroll from '../../scroll/scroll';
import Basket from '../basket/basket';
import { byName,byPrice } from './compare';


const cartitems=[];
const dic={};
const products_url="http://localhost:9000/products";
let category_count=[];

function Cart_nav(props){
    const [products,Setproducts]=useState([]);
    const [allcategory,Setallcategory]=useState([]);
    const [sortby,Setsortby]=useState('Name');
    const [category,Setcategory]=useState('All');
    const [searchfield,Setsearchfield]=useState('');
    const [cartitemsnumber,Setcartitemsnumber]=useState(0);
    
    useEffect(()=>{
        fetch(products_url)
          .then(response=> response.json())
          .then(response => {
            if(response.error){
                Setproducts([])
            } 
            else {
                Setproducts(response.products);
                console.log(response.products.length)
                response.products.forEach(element => {
                    category_count.push(element.category);
                });
                Setallcategory([...new Set(category_count)])
            };
            })
             
      },[]);
    const onSearchFieldChange=(event)=>{
        Setsearchfield(event.target.value);
    }
    const onSortByChange=(event)=>{
        Setsortby(event.target.value);
    }
    const onCategoryChange=(event)=>{
        Setcategory(event.target.value);
    }
    const onAddElement=(pid,name,price)=>{
        console.log(pid+name);
        Setcartitemsnumber(cartitemsnumber+1);
        cartitems.push([pid,name,price]);
        if(pid in dic){
            dic[pid][2]+=1;
        }
        else {
            dic[pid]=[name,price,1];
        }
    }
    const onQuantityIncrease=(pid)=>{
        dic[pid][2]+=1;
        Setcartitemsnumber(cartitemsnumber+1);
    }
    const onQuantityDecrease=(pid)=>{
        if(dic[pid][2]==1){
            delete dic[pid];
        }
        else {
            dic[pid][2]-=1;
        }
        Setcartitemsnumber(cartitemsnumber-1);
    }
//  ---------------------------------------------to filter the element -----------------------
    const categorisedItems=products.filter(product=>{
        if(category=="All"){
            return true
        }
        else {
            return (product.category==category)
        }
    })
    if(sortby=="Name"){
        categorisedItems.sort(byName);
    }
    else if(sortby=="Price") {
        categorisedItems.sort(byPrice);
    }
    const filteredItems=categorisedItems.filter(product=>{
        return product.name.toLowerCase().includes(searchfield.toLowerCase());
    })
//  ---------------------------------------------to filter the element -----------------------
    return (
        <div>
        <nav class="bt bb mw10 center mt4">
        <div class="box">
            Sort By:
        <select onChange={onSortByChange}>
            <option value="Name" >Name</option>
            <option value="Price">Price</option>
        </select>
        </div>

        <div class="box">
            Category:
        <select onChange={onCategoryChange}>
            <option value="All">All</option>
            {allcategory.map(element=>{
                    return <option value={element}>{element}</option>
                })}
        </select>
        </div>
        <div className="box tc ml7">
        <input className="search" 
                type="text" 
                placeholder="Search.."
                onChange={onSearchFieldChange}></input>
        </div>
        </nav>
        <div>
            {/* this is for product items */}
            <div className="products">
                <Scroll>
                {
                    filteredItems.map(product=>{
                        const{name,price,image,description,pid}=product;
                        return <Cart Name={name}
                            Price={price}
                            Image={image}
                            Description={description}
                            PId={pid}
                            AddElement={onAddElement}
                            />
                    })
                }
                </Scroll>
            </div>

            {/* this is for selected items */}

            <div className="basket">
                <Basket CartItems={dic}
                        QuantityIncrease={onQuantityIncrease}
                        QuantityDecrease={onQuantityDecrease}
                        UserId={props.UserId}/>
               
            </div>
        </div>
        </div>
    )
}
export default Cart_nav;