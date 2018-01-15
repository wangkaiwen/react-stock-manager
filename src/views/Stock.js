/**
 * Created by kevin on 2017/12/13.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { List,NavBar,Icon ,Toast,Button,WhiteSpace} from 'antd-mobile';
import $ from 'jquery';

const Item = List.Item;
const Brief = Item.Brief;
class Stock extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        $.get($.baseUrl +'goods',{},(res)=>{
            this.setState({data:res})
        });
    }
    openRecord(){
        console.log(this)
    }

    render(){
        const content =(
            <List renderHeader={() => ''} className="my-list">
                {this.state.data.map((item)=>{
                    return (
                        <Item
                            key={item._id}
                            arrow="horizontal"
                            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                            multipleLine
                            onClick={() => {}}
                        >
                            {item.name} <Brief>库存：{item.number}</Brief>
                        </Item>
                    )
                })}
            </List>
        )


        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                        <Link to={{pathname:'/home/record'}} style={{color:'#fff'}}>记录</Link>
                    }
                >仓库</NavBar>
                {content}
            </div>
        )
    }
}
export default Stock;