import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// import Loadable from 'react-loadable';
// import { ActivityIndicator } from 'antd-mobile';


import Home from '../pages/home';
import Discover from '../pages/discover';
import Publish from '../pages/publish';
import Notice from '../pages/notice';
import Me from '../pages/me'

// function Loading() {
//   return <ActivityIndicator
//           toast
//           />;
// }

// // 动态加载
// const Home = Loadable({
//   loader: () => import(`../pages/home`),
//   loading: Loading
// });
// const Me = Loadable({
//   loader: () => import(`../pages/me`),
//   loading: Loading
// });


const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route path='/discover' component={ Discover } />
      <Route path='/publish' component={ Publish } />
      <Route path='/notice' component={ Notice } />
      <Route path='/me' component={ Me } />
    </Switch>
  </div>
)


export default Main;