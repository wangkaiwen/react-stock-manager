/**
 * Created by kevin on 2017/11/21.
 */
import React from 'react';
import { Link, Route, Switch,Redirect } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import Home from './Home';
import Friend from './Friend';
import  My from './My';

class TabBarExample extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            selectedTab: 'home',
            hidden: false,
            data:[]
        };
    }
    componentWillMount(){
        this.setState({selectedTab:this.props.match.params.tab});
    }

    renderContent(Component) {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <Component />
            </div>
        );
    }

    render() {
        return (
            <div style={{position: 'fixed', height: '100%', width: '100%', top: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-home_light"> </i>
                        </div>}
                        selectedIcon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-home_light"> </i>
                        </div>}
                        selected={this.state.selectedTab === 'home'}
                        onPress={() => {
                            this.setState({selectedTab: 'home'});
                            window.history.pushState({selectedTab: 'home'}, 'home', '/home');
                        }}
                    >
                        {this.renderContent(Home)}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-friend_light"> </i>
                        </div>}
                        selectedIcon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-friend_light"> </i>
                        </div>}
                        title="联系人"
                        key="联系人"
                        selected={this.state.selectedTab === 'friend'}
                        onPress={() => {
                            this.setState({selectedTab: 'friend'});
                            window.history.pushState({selectedTab: 'friend'}, 'friend', '/friend');
                        }}
                    >
                        {this.renderContent(Friend)}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-my_light"> </i>
                        </div>}
                        selectedIcon={<div style={{width: '22px', height: '22px'}}>
                            <i className="iconfont icon-my_light"> </i>
                        </div>}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'my'}
                        onPress={() => {
                            this.setState({selectedTab: 'my'});
                            window.history.pushState({selectedTab: 'my'}, 'my', '/my');
                        }}
                    >
                        {this.renderContent(My)}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default TabBarExample