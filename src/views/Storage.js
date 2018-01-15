/**
 * Created by kevin on 2017/12/13.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { List,NavBar,Icon ,Picker,Toast,Button,WhiteSpace,WingBlank,InputItem,Stepper} from 'antd-mobile';
import $ from 'jquery';

const Item = List.Item;
class Storage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            nameValue:[],
            friendValue:[this.props.location.state.friendId||''],
            priceValue:0,
            storageValue:0,
            totalPrice:0,
            selectedGoods:{},
            selectedFriend:{},
            goodsData:[{
                id:1,
                label:'商品1',
                value:'商品1'
            }],
            friendsData:[{
                id:1,
                label:'联系人1',
                value:'联系人1'
            }]
        }
    }
    componentWillMount(){
        $.get($.baseUrl + 'goods',{},(res)=>{
            res.forEach((item)=>{
                item.label=item.name;
                item.value=item._id;
            });
            this.setState({goodsData:res})
        });
        $.get($.baseUrl + 'friends',{},(res)=>{
            var data=res.filter((item)=>{
                item.label=item.name;
                item.value=item._id;
                return item.type==1;
            });
            this.setState({friendsData:data})
        });

    }
    openRecord(){

    }

    selectGoods(v){
        var goodsObj=this.state.goodsData.find(item=>item._id==v[0]);
        this.setState({nameValue:v,selectedGoods:goodsObj},()=>{
            this.priceComponent.stepperRef.setValue(goodsObj.price)}
        );
    }
    selectFriend(v){
        var friendObj=this.state.friendsData.find(item=>item._id==v[0]);
        this.setState({friendValue:v,selectedFriend:friendObj});
    }

    changePrice(v){
        this.setState({priceValue:v,totalPrice:v*this.state.storageValue})
    }

    sureStorage(){
        if(this.state.nameValue.length&&this.state.priceValue&&this.state.storageValue){
            var data={
                type:'入库',
                goods:[{
                    _id:this.state.selectedGoods._id,
                    name:this.state.selectedGoods.name,
                    price:this.state.priceValue,
                    number:this.state.storageValue,
                }],
                friendId:this.state.friendValue[0],
                friendName:this.state.selectedFriend.name,
                total:this.state.totalPrice
            };
            console.log(data);
            Toast.loading('正在入库', 0);
            $.post($.baseUrl+'houserecord/add',data,(res)=>{
                console.log(res);
                if(res.n&&res.ok){
                    this.setState({nameValue:[]});
                    Toast.success('入库成功', 1.5);
                }else{
                    Toast.fail('入库失败', 1.5)
                }
            })
        }

    }

    render(){
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                        <Link to={{pathname:'/home/record',state:{queryType:'入库'}}} style={{color:'#fff'}}>入库记录</Link>
                    }
                >入库</NavBar>
                <List>
                    <Picker data={this.state.friendsData} cols={1} value={this.state.friendValue} onChange={this.selectFriend.bind(this)} className="forss">
                        <List.Item arrow="horizontal">选择供货商：</List.Item>
                    </Picker>
                    <Picker data={this.state.goodsData} cols={1} value={this.state.nameValue} onChange={this.selectGoods.bind(this)} className="forss">
                        <List.Item arrow="horizontal">选择商品：</List.Item>
                    </Picker>
                    <Item extra={
                        <Stepper style={{ width: '100%', minWidth: '120px' }} ref={el => this.priceComponent = el} step={0.5} min={0} showNumber size="small"
                                 defaultValue={this.state.priceValue} onChange={this.changePrice.bind(this)}
                        />}>
                        商品单价：
                    </Item>
                    <Item extra={
                        <Stepper style={{ width: '100%', minWidth: '120px' }} min={0} showNumber size="small"
                                 defaultValue={this.state.storageValue} onChange={v=>{this.setState({storageValue:v,totalPrice:v*this.state.priceValue});}}
                        />}>
                        入库数量：
                    </Item>
                </List>
                <List>
                    <Item extra={<span style={{color:'orange',fontSize:'1.5rem'}}>{this.state.totalPrice+'元'}</span>}>总计</Item>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.sureStorage.bind(this)}>确定入库</Button>
                </WingBlank>

            </div>
        )
    }


}

export default Storage;