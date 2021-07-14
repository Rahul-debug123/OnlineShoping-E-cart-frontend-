import React from 'react';

const image_pre="http://localhost:9000";

function Cart(props){
return(
   <div style={{width:"1200px"}}>
    <article style={{float:'left',padding:"10px",margin:"20px"}} className="bg-white br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5">
    <img src={image_pre+props.Image} className="db w5 h5 br2 br--top" alt="Photo of a kitten looking menacing."/>
    <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
        <div className="dtc">
            <h1 className="f5 f5-ns mv0">{props.Name}</h1>
        </div>
        <div className="dtc tr">
            <h2 className="f5 mv0">Rs.{props.Price}</h2>
        </div>
        </div>
        <p className="f6 lh-copy measure mt2 mid-gray">
        {props.Description}
        </p>
        <div className="bt pa3">
        <a className="tc w-100 f6 lm3 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue" onClick={()=>props.AddElement(props.PId,props.Name,props.Price)}>Add to cart</a>
        </div>
    </div>
    </article>
   </div>)
}

export default Cart