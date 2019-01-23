import { combineReducers } from 'redux';
import ProductsReducer from './ProductsReducer'

/**
 * TODO Step 4:
 *
 * 1. Use imported combineReducers to create root reducer.
 * 2. Pass TeamReducer to combineReducers config on the team property
 * 3. Pass CharactersReducer to combineReducers config on the characters property
 */

 export default combineReducers({
    products: ProductsReducer
 });
