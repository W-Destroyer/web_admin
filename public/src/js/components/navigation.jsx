import { Component } from 'react';

import { Link } from 'react-router';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import menu from '../constants/menu';

export default class Nav extends Component {
    state = {
        current: 'item_000',
        openKeys: [],
        list: menu
    }
    handleClick = (e) => {
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }
    onOpenChange = (openKeys) => {
        console.log(openKeys);
        // openKeys 为菜单设置的key值
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys = (key) => {
        const map = {
            sub_3: ['item_3_0'],
        };
        return map[key] || [];
    }
    render() {
        var subMenuList = this.state.list.map((item, index, arr) => item.type == 'group' ? (
            <SubMenu key={"sub_" + index} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
            {item.children.map((child, childIndex) => (<Menu.Item key={'item_' + index + '_' + childIndex}><Link to={child.link ? child.link : ''}>{child.name}</Link></Menu.Item>))}
            </SubMenu> ) : (
                <Menu.Item key={'item_' + index}><Link to={item.link ? item.link : ''}><Icon type={item.icon} />{item.name}</Link></Menu.Item>
            )
        )
        return (
            <Menu
                theme="light"
                mode="inline"
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 240 }}
                onOpenChange={this.onOpenChange}
                onClick={this.handleClick}
            >{ subMenuList }</Menu>
        );
    }
}
