
  
  export default function ProductsReducer(state = {products: []}, action) {
  
    switch(action.type) {
      case 'PRODUCTS':
        return {products: []};
      default:
        return state;
    }
  
  }
  