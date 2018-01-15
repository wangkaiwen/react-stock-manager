/**
 * Created by kevin on 2017/12/09.
 */
import React from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import {Grid} from 'antd-mobile';
import img from './images/yuzhu.jpg';
import $ from 'jquery';

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: 'http://www.wangkaiwen.cn/api/',
            // crossDomain:true,
            // type:'post',
            // data:{
            //     name:'李四',
            //     tel:13982738291,
            //     address:'东大街',
            //     type:2,
            //     friendId:'5a2cf241db7778846ac7e211',
            //     goods:[
            //         {'_id':'5a2d2441d6d7e019f8b16bb9',name:'商品10',price:100,number:-5},
            //         {'_id':'5a2e3b11f6c0e68e4cdb37fa',name:'商品2',price:80,number:-8}]},
            // data:{name:'这是一个商品',price:188},
            // data:{id:"5a2cf241db7778846ac7e211"},
            success: function (res) {
                console.log(res)
            }
        });
        this.setState({
            data: [{
                icon: 'icon-cangku',
                text: '仓库',
                color: '#de8d38',
                link: '/home/stock'
            }, {
                icon: 'icon-product',
                text: '商品',
                color: '#1aa525',
                link: '/home/goods'
            }, {
                icon: 'icon-icon112',
                text: '入库',
                color: '#397cd0',
                link: '/home/storage'
            }, {
                icon: 'icon-chuku-begin',
                text: '出库',
                color: '#c13eab',
                link: '/home/delivery'
            }],
        });
    }

    render() {
        return (
            <div>
                <img src={img} alt="" style={{width:'100%'}}/>
                <Grid data={this.state.data} columnNum={2}
                      renderItem={(el)=> {
                          return (
                              <Link to={{pathname:el.link,state:{}}} style={{color: 'initial'}}>
                                  <i className={'iconfont ' + el.icon} style={{fontSize: '6rem', color: el.color,display:'block',marginTop:'.6rem'}}> </i>
                                  <div className="am-grid-text" style={{fontSize: '1.4rem'}}>{el.text}</div>
                              </Link>)
                      }}
                />
            </div>
        )
    }

}

export default MainGrid;