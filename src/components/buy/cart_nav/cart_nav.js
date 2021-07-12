import Cart from '../cart/cart';
import "./cart_nav.css";

const Cart_nav=()=>{
    return (
        <div>
        <nav class="bt bb mw10 center mt4">
        <div class="box">
            Sort By:
        <select>
            <option value="Name" >Name</option>
            <option value="Price">Price</option>
        </select>
        </div>
        <div class="box">
            Category:
        <select>
            <option value="Food" >Food</option>
            <option value="Metals">Metals</option>
        </select>
        </div>
        <div className="box tc ml7">
        <input type="text" placeholder="Search.."></input>
        </div>
        </nav>
        <Cart Name="name" Price={50} Description="This is the description" Image="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"/>
        </div>
    )
}
export default Cart_nav;