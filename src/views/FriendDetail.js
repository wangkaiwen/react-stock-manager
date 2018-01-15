/**
 * Created by kevin on 2017/12/16.
 */
import React from 'react';
import {Drawer,Modal, List, NavBar,WingBlank,SegmentedControl, TextareaItem, InputItem, Picker, Icon, Tag, Toast, Button, WhiteSpace} from 'antd-mobile';
import $ from 'jquery';
import pinyin from '../pinyin';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class FriendDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data:{},
            open:false
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    componentDidMount() {
        this.getDataList()
    }
    getDataList(){
        $.get($.baseUrl + 'friends/detail',{id:this.props.match.params.id},(res)=>{
            this.setState({
                data:res[0]
            })
        })
    }

    onOpenChange(open) {
        if(!open){
            this.getDataList()
        }
        this.setState({open: !this.state.open});
    }

    updateFriend(){
        var name = this.state.data.name,
            tel = this.state.data.tel,
            address = this.state.data.address,
            note = this.state.data.note,
            type = this.state.data.type;
        if (name && address) {
            var group = pinyin(name, {style: pinyin.STYLE_FIRST_LETTER})[0][0];
            Toast.loading('正在修改', 0);
            $.post($.baseUrl + 'friends/update', {
                    id:this.state.data._id,
                    name: name, tel: tel, address: address,
                    group: group, note: note, type: type
                },
                (res)=> {
                    if (res.n && res.ok) {
                        this.onOpenChange();
                        this.getDataList();
                        Toast.hide();
                        Toast.success('修改成功', 1.5)
                    } else {
                        Toast.fail('修改失败', 1.5)
                    }
                })
        }
    }


    deleteFriend(){
        alert('提示', '确定要删除吗？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                $.post($.baseUrl + 'friends/del',{id:this.props.match.params.id},(res)=>{
                    if(res.ok==1&&res.n==1){
                        this.props.history.goBack();
                    }
                })
            } },
        ])
    }

    render(){
        const sidebar = (
            <div>
                <List renderHeader={() => '输入联系人信息'}>
                    <Item style={{height: '50px'}}>
                        <div style={{display:'flex'}}>类型：
                            <SegmentedControl style={{minWidth:'160px'}} selectedIndex={this.state.data.type-1}
                                              onChange={(e)=>{var data=this.state.data;data.type=e.nativeEvent.selectedSegmentIndex+1;this.setState({data: data})}} values={['供货商', '出货商']} />
                        </div>
                    </Item>
                    <InputItem clear={true} labelNumber={3} placeholder="请输入名称" value={this.state.data.name}
                               onChange={(v)=>{var data=this.state.data;data.name=v;this.setState({data:data})}}>名称：</InputItem>
                    <InputItem clear={true} labelNumber={3} placeholder="请输入电话" type="tel" value={this.state.data.tel}
                               onChange={(v)=>{var data=this.state.data;data.tel=v;this.setState({data:data})}}>电话：</InputItem>
                    <TextareaItem
                        value={this.state.data.address}
                        title="地址："
                        labelNumber={3}
                        placeholder="请输入地址"
                        autoHeight
                        onChange={(v)=>{var data=this.state.data;data.address=v;this.setState({data:data})}}
                    />
                    <TextareaItem
                        value={this.state.data.note}
                        title="备注："
                        labelNumber={3}
                        placeholder="请输入备注"
                        autoHeight
                        onChange={(v)=>{var data=this.state.data;data.note=v;this.setState({data:data})}}
                    />
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" disabled={false} onClick={this.updateFriend.bind(this)}>修改</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        );

        var Handle=<Button type="primary" onClick={()=>{this.props.history.push('/home/delivery',{friendId:this.state.data._id})}}>出库</Button>;
        if(this.state.data.type==1){
            Handle=<Button type="primary" onClick={()=>{this.props.history.push('/home/storage',{friendId:this.state.data._id})}}>入库</Button>
        }
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={<span onClick={this.onOpenChange}>修改</span>}
                >详细资料</NavBar>
                <Drawer
                    className="my-drawer"
                    enableDragHandle={false}
                    position="right"
                    contentStyle={{color: '#A6A6A6', textAlign: 'center',}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <List renderHeader={() => '基本信息'}>
                        <Item extra={this.state.data.type=='1'?'供货商':'出货商'}>类型</Item>
                        <Item extra={this.state.data.name}>名称</Item>
                        <Item extra={<a href={'tel:'+this.state.data.tel}>{this.state.data.tel}</a>}>电话</Item>
                        <Item extra={this.state.data.address} multipleLine={true}>地址</Item>
                        <Item extra={this.state.data.note} multipleLine={true}>备注</Item>
                    </List>
                    <WingBlank>
                        <WhiteSpace />
                        {Handle}
                        <WhiteSpace />
                        <Button type="warning" onClick={this.deleteFriend.bind(this)}>删除</Button>
                    </WingBlank>
                </Drawer>
            </div>
        )
    }
}
export default FriendDetail;