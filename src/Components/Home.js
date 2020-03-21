import React from "react";
import MyDrawer from "./Drawer";
import Register from "./Register";
import Login from "./Login";
import { useSelector } from "react-redux";



const Home = (props) => {
    const isLogin = useSelector(state => state.auth.isAuth);
    if (isLogin) {
        return(
        <div><MyDrawer /> </div>
        )
        
    }
    return (<div>
          
                    <Login/>
                    <Register/>
        </div>
    );
};
export default Home;