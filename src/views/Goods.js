/**
 * Created by kevin on 2017/12/13.
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Drawer, List, NavBar, ImagePicker, InputItem, Icon, Toast, Button, WhiteSpace} from 'antd-mobile';
import './home.css';
import $ from 'jquery';

const Item = List.Item;
const Brief = Item.Brief;


class Goods extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            data: [],
            open: false,
            files: []
        };
        this.onOpenChange = this.onOpenChange.bind(this)
    }

    componentWillMount() {
        this.getDataList();
    }
    getDataList() {
        $.get($.baseUrl +'goods', {
        }, (res)=> {
            this.setState({data: res})
        });
    }

    onOpenChange() {
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

    addGoods() {
        var name = this.labelGoodsName.state.value, price = this.labelGoodsPrice.state.value;
        if (name || price) {
            Toast.loading('正在添加', 0);
            var data={name: name, price: price };
            if(this.state.files[0]){ data.img=this.state.files[0].url;}
            $.post($.baseUrl + 'goods/add', data, (res)=> {
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
                <List renderHeader={() => '输入商品信息'}>
                    <InputItem clear={true} labelNumber={3} ref={el => this.labelGoodsName = el}>名称：</InputItem>
                    <InputItem clear={true} labelNumber={3} placeholder="0" type="digit"
                               ref={el => this.labelGoodsPrice = el}>价格：</InputItem>
                </List>
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onFileChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                />
                <WhiteSpace />
                <Button type="primary" disabled={false} onClick={this.addGoods.bind(this)}>添加</Button>
                <WhiteSpace />
            </div>
        );

        const content = (
            <List renderHeader={() => ''} className="my-list">
                {this.state.data.map((item)=> {
                    return (
                        <Link key={item._id} to={{
                            pathname: `/goods/detail/${item._id}`,
                            state: {name: item.name, price: item.price, number: item.number,img:item.img}
                        }}>
                            <Item
                                arrow="horizontal"
                                thumb={item.img||'https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png'}
                                multipleLine
                                onClick={() => {
                                }}
                            >
                                {item.name} <Brief>￥{item.price}</Brief>
                            </Item>
                        </Link>
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
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
                        <i key="1" className="iconfont icon-add" style={{fontSize: '1.5rem'}}
                           onClick={this.onOpenChange}> </i>,
                    ]}
                >商品</NavBar>


                <Drawer
                    className="my-drawer"
                    enableDragHandle={false}
                    position="right"
                    contentStyle={{color: '#A6A6A6', textAlign: 'center',}}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    {content}
                </Drawer>
            </div>
        )
    }
}
export default Goods;