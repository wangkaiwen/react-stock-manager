/**
 * Created by kevin on 2017/12/09.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Drawer, List, NavBar, TextareaItem, InputItem,SegmentedControl,WingBlank, Picker, Icon, Tag, Toast, Button, WhiteSpace} from 'antd-mobile';
import $ from 'jquery';
import pinyin from './pinyin';
// const pinyin=this.pinyin;
const Item = List.Item;
const Brief = Item.Brief;

class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            typeValue: 2,
            open: false
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }

    componentWillMount() {
        this.getDataList();
    }

    getDataList() {
        $.get($.baseUrl + 'friends', {}, (res)=> {
            var data = [], arr = [];
            res.forEach((item)=> {
                var index = arr.indexOf(item.group);
                if (~index) {
                    data[index].people.push(item)
                } else {
                    arr.push(item.group);
                    data.push({
                        name: item.group.toUpperCase(),
                        people: [item]
                    })
                }
            });
            this.setState({data: data});
        })
    }

    onOpenChange() {
        this.setState({open: !this.state.open});
    }

    addFriend() {
        var name = this.labelFriendName.state.value,
            tel = this.labelFriendTel.state.value,
            address = this.labelFriendAddress.textareaRef.value,
            note = this.labelFriendAddress.textareaRef.value,
            type = this.state.typeValue;
        if (name && address) {
            var group = pinyin(name, {style: pinyin.STYLE_FIRST_LETTER})[0][0];
            Toast.loading('正在添加', 0);
            $.post($.baseUrl + 'friends/add', {
                    name: name, tel: tel, address: address,
                    group: group, note: note, type: type
                },
                (res)=> {
                    if (res.n && res.ok) {
                        this.onOpenChange();
                        this.getDataList();
                        Toast.hide();
                        Toast.success('添加成功', 1.5)
                    } else {
                        Toast.fail('添加失败', 1.5)
                    }
                })
        }
    }

    render() {

        const sidebar = (
            <div>

                <List renderHeader={() => '输入联系人信息'}>
                    <Item style={{height: '50px'}}>
                        <div style={{display:'flex'}}>类型：<SegmentedControl style={{minWidth:'160px'}} selectedIndex={this.state.typeValue-1} onChange={(e)=>{this.setState({typeValue: e.nativeEvent.selectedSegmentIndex+1})}} values={['供货商', '出货商']} /></div>
                    </Item>
                    <InputItem clear={true} labelNumber={3} placeholder="请输入名称" ref={el => this.labelFriendName = el}>名称：</InputItem>
                    <InputItem clear={true} labelNumber={3} placeholder="请输入电话" type="tel"
                               ref={el => this.labelFriendTel = el}>电话：</InputItem>
                    <TextareaItem
                        title="地址："
                        labelNumber={3}
                        placeholder="请输入地址"
                        autoHeight
                        ref={el => this.labelFriendAddress = el}
                    />
                    <TextareaItem
                        title="备注："
                        labelNumber={3}
                        placeholder="请输入备注"
                        autoHeight
                        ref={el => this.labelFriendNote = el}
                    />
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" disabled={false} onClick={this.addFriend.bind(this)}>添加</Button>
                    <WhiteSpace />
                </WingBlank>

            </div>
        );


        var listComponent = this.state.data.map((group)=> {
            return (
                <List renderHeader={() => group.name} key={group.name} className="my-list">
                    {group.people.map((item)=>
                        <Link to={`/friend/detail/${item._id}`} key={item._id}>
                            <Item multipleLine arrow={'horizontal'} extra={item.type == 1 ? '供货商' : '出货商'}>
                                {item.name}<Brief>{item.tel}</Brief>
                            </Item>
                        </Link>
                    )}
                </List>
            )
        });
        return (
            <div>
                <NavBar
                    mode="dark"

                    rightContent={[
                        <i key="1" className="iconfont icon-add" style={{fontSize: '1.5rem'}}
                           onClick={this.onOpenChange}> </i>,
                    ]}
                >联系人</NavBar>
                <Drawer
                    className="my-drawer"
                    enableDragHandle={false}
                    position="right"
                    contentStyle={{color: '#A6A6A6', textAlign: 'center',}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    {listComponent}
                </Drawer>
            </div>
        )
    }
}
export default Friend;