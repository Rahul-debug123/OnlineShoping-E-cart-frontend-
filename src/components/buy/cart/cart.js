import React from 'react';

const Cart=(props)=>{
return(
    <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
    <img src={props.Image} class="db w-100 br2 br--top" alt="Photo of a kitten looking menacing."/>
    <div class="pa2 ph3-ns pb3-ns">
        <div class="dt w-100 mt1">
        <div class="dtc">
            <h1 class="f5 f4-ns mv0">{props.Name}</h1>
        </div>
        <div class="dtc tr">
            <h2 class="f5 mv0">Rs.{props.Price}</h2>
        </div>
        </div>
        <p class="f6 lh-copy measure mt2 mid-gray">
        {props.Description}
        </p>
        <div class="bt pa3">
        <a class="tc w-100 f6 lm3 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue" href="#0">Add to cart</a>
        </div>
    </div>
    </article>)
}

export default Cart