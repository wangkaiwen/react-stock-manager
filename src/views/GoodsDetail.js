/**
 * Created by kevin on 2017/12/18.
 */
import React from 'react';
import {Drawer,Modal, List, NavBar,WingBlank,ImagePicker, Card, InputItem, Picker, Icon, Tag, Toast, Button, WhiteSpace} from 'antd-mobile';
import $ from 'jquery';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class GoodsDetail extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            data:{},
            open: false,
            files: []
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    componentWillMount() {
        this.getDataList();
    }
    getDataList() {
        $.get($.baseUrl +'goods/detail', {
           id:this.props.match.params.id
        }, (res)=> {
            this.setState({data:res[0]});
            if(res[0].img){
                this.setState({files:[{id:1,url:res[0].img}]});
            }
        });
    }

    deleteGoods(){
        alert('提示', '确定要删除吗？', [
            { text: '取消' },
            { text: '确定', onPress: () => {
                $.post($.baseUrl + 'goods/del',{id:this.props.match.params.id},(res)=>{
                    if(res.ok==1&&res.n==1){
                        this.props.history.goBack();
                    }
                })
            } },
        ])

    }

    onOpenChange(open) {
        if(!open){
            this.getDataList()
        }
        this.setState({open: !this.state.open});
    }

    onFileChange = (files, type, index) => {
        var oMyForm = new FormData();
        oMyForm.append("file", files[0].file);
        $.ajax({
            url: $.baseUrl +'upload',
            type: 'POST',
            cache: false,
            data: oMyForm,
            processData: false,
            contentType: false,
            async: false,
            success:(res)=>{
                if(res.status==200){
                    this.setState({files:[{id:'1',url:res.filePath}]})
                }
            }
        })
    }

    updateGoods(){
        var name = this.state.data.name, price = this.state.data.price,img=this.state.files[0]?this.state.files[0].url:null;

        if (name || price) {
            Toast.loading('正在修改', 0);
            $.post($.baseUrl + 'goods/update', {id:this.props.match.params.id,name: name, price: price ,img:img}, (res)=> {
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

    render(){
        const sidebar = (
            <div>
                <List renderHeader={() => '输入商品信息'}>
                    <InputItem clear={true} value={this.state.data.name} labelNumber={3}
                               onChange={(v)=>{var data=this.state.data;data.name=v;this.isEdited=true;this.setState({data:data})}}>名称：</InputItem>
                    <InputItem clear={true} value={this.state.data.price} labelNumber={3}
                               onChange={(v)=>{var data=this.state.data;data.price=v;this.isEdited=true;this.setState({data:data})}} placeholder="0" type="digit"
                    >价格：</InputItem>
                </List>
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onFileChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                />
                <WhiteSpace />
                <Button type="primary" disabled={false} onClick={this.updateGoods.bind(this)}>修改</Button>
                <WhiteSpace />
            </div>
        );


        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={<span onClick={this.onOpenChange}>修改</span>}
                >商品详情</NavBar>


                <Drawer
                    className="my-drawer"
                    enableDragHandle={false}
                    position="right"
                    contentStyle={{color: '#A6A6A6', textAlign: 'center',}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    <Card full>
                        <Card.Header
                            title=""
                            thumb={this.state.data.img||'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}
                            extra={<span>{this.state.data.name}</span>}
                        />
                    </Card>
                    <WhiteSpace size="lg" />
                    <Item extra={this.state.data.price}>价格</Item>
                    <Item extra={this.state.data.number}>库存</Item>

                    <WingBlank>
                        <WhiteSpace />
                        <Button type="warning" onClick={this.deleteGoods.bind(this)}>删除</Button>
                    </WingBlank>
                </Drawer>

            </div>
        )
    }
}
export default GoodsDetail;