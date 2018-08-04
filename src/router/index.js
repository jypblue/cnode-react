import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

// import Loadable from 'react-loadable';
// import { ActivityIndicator } from 'antd-mobile';


import Home from '../pages/home';
import Publish from '../pages/publish';
import Notice from '../pages/notice';
import Me from '../pages/me';
import User from '../pages/user';
import Login from '../pages/login';

import TopicDetail from '../pages/home/detail';

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

const Main = (data) => (
  <div className="cnd-routes-main">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/topics" component={Home} />
      <Route exact path="/topic/:id" component={TopicDetail} />
      <Route path="/publish" component={Publish} />
      <Route path="/notice" component={Notice} />
      <Route path="/me" component={Me} />
      <Route path="/user/:name" component={User} />
      <Route path="/login" component={Login} />
    </Switch>
  </div>
);


export default Main;