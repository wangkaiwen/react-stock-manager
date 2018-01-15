import React from 'react';
import { List } from 'antd-mobile';

const Item = List.Item;

class My extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        };
    }
    render(){
        return(
            <div>
                <List renderHeader={() => ''} className="my-list">
                    <Item arrow={'horizontal'}>修改密码</Item>
                </List>
            </div>
        )
    }
}
export default My;