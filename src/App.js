import React, {Component} from 'react';
import TabBar from './TabBar';
import { Link, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import Stock from './views/Stock';
import Goods from './views/Goods';
import Storage from './views/Storage';
import Delivery from './views/Delivery';
import Record from './views/Record';
import FriendDetail from './views/FriendDetail';
import GoodsDetail from './views/GoodsDetail';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data:[]
        };
    }
    render() {
        return (
            <div className="App">
                <Route path="/:tab" exact= {true} component={TabBar}/>
                <Route path="/" exact= {true} render={()=><Redirect to={{pathname:'/home'}}/>}/>


                <Route path="/home/stock" component={Stock}/>
                <Route path="/home/goods" component={Goods}/>
                <Route path="/home/storage" component={Storage}/>
                <Route path="/home/delivery" component={Delivery}/>
                <Route path="/home/record" component={Record}/>

                <Route path="/friend/detail/:id" component={FriendDetail}/>
                <Route path="/goods/detail/:id" component={GoodsDetail}/>

            </div>
        );
    }
}





export default App;
