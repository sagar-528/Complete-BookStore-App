import DashBoard from './Component/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch, Router} from 'react-router-dom'
import React, { Component } from 'react'
import Cart from './Component/Cart/Cart'
import WishList from './Component/WishList/WishList'
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder'
import UserLogin from './Component/UserLogin/UserLogin'
import SignUp from './Component/SignUp/SignUp'
import Headerbar from './Component/Header/Headerbar'
import ForgotPassword from './Component/ForgotPassword/ForgotPassword'
import RestPassword from './Component/ResetPassword/RestPassword'


class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>    
                <div>
                    <Switch>
                        <Route path="/" component={DashBoard} exact="true" /> 
                        <Route path="/Cart" component={Cart} />
                        <Route path="/WishList" component={WishList} /> 
                        <Route path="/ConfirmOrder" component={ConfirmOrder} />
                        <Route path="/UserLogin" component={UserLogin} />
                        <Route path="/SignUp" component={SignUp} />
                        <Route path="/header" component={Headerbar} />
                        <Route path="/ForgotPassword" component={ForgotPassword} />
                        <Route path="/ResetPassword/*" component={RestPassword} />
                    </Switch>      
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter
