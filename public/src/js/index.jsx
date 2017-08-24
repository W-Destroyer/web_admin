/*
    create by Piny
 */
// 加载React全家桶
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Link, browserHistory, Redirect} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// 加载React样式框架antd
// import 'antd/dist/antd.css';

// redux store
import configureStore from './redux/config_store';

// 路由组件
import App from './components/app';
import Dashboard from './components/dashboard';

// Page Setting 页面设置
import PageFullStation from './components/pagesetting/fullstation';
import PageHome from './components/pagesetting/home';
import PageCompany from './components/pagesetting/company';
import PageProduction from './components/pagesetting/production';
import PageNews from './components/pagesetting/news';
import PageService from './components/pagesetting/service';
import PageContact from './components/pagesetting/contact';

// Product 类
import Product from './components/product/product';
import ProductClassify from './components/product/classify';
import ProductList from './components/product/productlist';
import AddProduct from './components/product/addproduct';
import EditProduct from './components/product/editproduct';
import ProductInfo from './components/product/productinfo';


// User 类
import User from './components/user';

var preloadedState = window.preloadedState;

const store = configureStore(preloadedState);

const history = syncHistoryWithStore(browserHistory, store)

console.log(store);

ReactDOM.render((
    <Provider store={store}>
        <Router history={ history }>
            <Route path='/' component={ App } >
                <IndexRoute component={ Dashboard } />

                <Route path='pagesetting'>
                    <IndexRoute component={ PageFullStation } />

                    <Route path='fullstation' component={ PageFullStation } />
                    <Route path='home' component={ PageHome } />
                    <Route path='company' component={ PageCompany } />
                    <Route path='production' component={ PageProduction } />
                    <Route path='news' component={ PageNews } />
                    <Route path='service' component={ PageService } />
                    <Route path='contact' component={ PageContact } />

                    <Redirect from='*' to='/pagesetting' />
                </Route>

                <Route path='production'>
                    <IndexRoute component={ Product } />

                    <Route path='classify' component={ ProductClassify } />
                    <Route path='productlist' component={ ProductList } />
                    <Route path='addproduct' component={ AddProduct } />
                    <Route path='editproduct' component={ EditProduct } />
                    <Route path='productinfo' component={ ProductInfo } />

                    <Redirect from='*' to='/production' />
                </Route>
                
                <Route path='user' component={ User } />
                
                <Redirect from='*' to='/' />
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));