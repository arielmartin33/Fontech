import React from 'react';

function Product(props){
    console.log(props.product);
    return(
        <React.Fragment>
            <div >
                <div>
                    <div>
                        {props.product.name}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Product;