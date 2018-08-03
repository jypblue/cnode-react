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
import Me from '../pages/me';

import TopicDetail from '../pages/home/TopicDetail';

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
  <div>
    <Switch>
      <Route exact path="/" render={
        (props) => (
          <Home {...data} {...props} />
        )
      }
      />
      <Route exact path="/topics" render={
        (props) => (
          <Home {...data} {...props} />
        )
      }
      />
      <Route exact path="/topic/:id" render={(props) => (
        <TopicDetail {...data} {...props} />
      )}
      />
      <Route path="/discover" component={Discover} />
      <Route path="/publish" component={Publish} />
      <Route path="/notice" component={Notice} />
      <Route path="/me" component={Me} />
    </Switch>
  </div>
);


export default Main;