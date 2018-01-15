/**
 * Created by kevin on 2017/12/14.
 */
import React from 'react';
import { List,NavBar,Icon ,Flex,Drawer,Toast,Button,WingBlank,WhiteSpace,Picker} from 'antd-mobile';
import $ from 'jquery';

const Item = List.Item;
const Brief = Item.Brief;
class Record extends React.Component {
    constructor(props){
        super(props);

        this.state={
            data:[],
            open:false,
            queryType:[this.props.location.state.queryType||''],
            queryFriendsId:[],
            queryGoodsId:[],

            typesData:[{
                id:1, label:'出库', value:'出库'
            },{
                id:2, label:'入库', value:'入库'
            }],
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
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }

    componentWillMount(){
        this.getRecordData()
    }
    getRecordData(){
        Toast.loading('正在加载', 0);
        $.get($.baseUrl +'houserecord',{
            type:this.state.queryType[0],
            friendId:this.state.queryFriendsId[0],
            goodsId:this.state.queryGoodsId[0]
        },(res)=>{
            console.log(res);
            Toast.hide();
            this.setState({data:res.reverse()})
        });
    }

    onOpenChange(){
        this.setState({open: !this.state.open},function(){
            if(this.state.open){
                $.get($.baseUrl + 'goods',{},(res)=>{
                    res.forEach((item)=>{
                        item.label=item.name;
                        item.value=item._id;
                    });
                    this.setState({goodsData:res})
                });
                $.get($.baseUrl + 'friends',{},(res)=>{
                    res.forEach((item)=>{
                        item.label=item.name;
                        item.value=item._id;
                    });
                    this.setState({friendsData:res})
                });
            }
        });
    }

    queryData(){
        this.onOpenChange();
        this.getRecordData();
    }
    resetQuery(){
        this.setState({
            queryType:[],
            queryFriendsId:[],
            queryGoodsId:[],
        })
    }

    render(){
        const sidebar = (
            <div>
                <List renderHeader={() => '输入查询条件'}>
                    <Picker data={this.state.typesData} cols={1} value={this.state.queryType} onChange={(v)=>{this.setState({queryType:v})}} className="forss">
                        <List.Item arrow="horizontal">选择类型：</List.Item>
                    </Picker>
                    <Picker data={this.state.friendsData} cols={1} value={this.state.queryFriendsId} onChange={(v)=>{this.setState({queryFriendsId:v})}} className="forss">
                        <List.Item arrow="horizontal">选择联系人：</List.Item>
                    </Picker>
                    <Picker data={this.state.goodsData} cols={1} value={this.state.queryGoodsId} onChange={(v)=>{this.setState({queryGoodsId:v})}} className="forss">
                        <List.Item arrow="horizontal">选择商品：</List.Item>
                    </Picker>
                </List>
                <WingBlank>
                    <WhiteSpace />
                    <Flex>
                        <Flex.Item><Button type="primary" onClick={this.queryData.bind(this)}>查询</Button></Flex.Item>
                        <Flex.Item><Button type="ghost" onClick={this.resetQuery.bind(this)}>重置</Button></Flex.Item>
                    </Flex>
                    <WhiteSpace />
                </WingBlank>
            </div>
        );
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}  onClick={this.onOpenChange}/>
                    ]}
                >出入库记录</NavBar>
                <Drawer
                    className="my-drawer"
                    enableDragHandle={false}
                    position="right"
                    contentStyle={{color: '#A6A6A6', textAlign: 'center',}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <List renderHeader={() => ' '} className="my-list">
                        {this.state.data.map((item)=>{
                            return <Item key={item._id} wrap={true} multipleLine extra={
                                <div>
                                    <span>{new Date(item.createDate).toLocaleDateString()}</span><br/><span>{new Date(item.createDate).toLocaleTimeString()}</span
                                ></div>
                            }>
                                {item.friendName} ({item.type})<Brief>{item.type=='入库'?'-':''}{item.total+'元'}</Brief>
                            </Item>
                        })}
                    </List>
                </Drawer>


            </div>
        )
    }
}
export default Record;