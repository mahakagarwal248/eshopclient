import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productsReducer from "./productsReducer";
import profileReducer from "./ProfileReducer";
import cartReducer from"./CartReducer";

export default combineReducers({
    auth: authReducer,
    products: productsReducer,
    profile: profileReducer,
    cart: cartReducer,
});