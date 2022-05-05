import Product from './Product';

import React, {Component} from 'react';

class Products extends Component{
    constructor() {
        super()
        this.state = {
            productsList: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/products/api/product')
            .then(respuesta => {
                return respuesta.json()
               
            })
            .then(products => {
                this.setState({ productsList: products.products });
                console.log(products)
            })
            .catch(error => console.error(error))
    }
 render(){
     return(
         <div>
             <h2>
                 Listado de Productos!
             </h2>

            <div>
            {this.state.productsList.map((products, index) => {
                                    return <Product
                                        product = {products} 
                                        key={index} />
                                })}
            </div>
         </div>
         
     )
 }
}

export default Products;