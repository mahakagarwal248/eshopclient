//import axios from "axios";
import jwtDecode from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = ()=>{
    return isDevelopment ? "http://localhost:5000" : "https://gopalashringarserver.herokuapp.com/";
};

const decodeUser = ()=>{
    const token = localStorage.getItem("token");
    return jwtDecode(token);
}

export {getServer, decodeUser};
