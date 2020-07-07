import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Button from "../Button/button";
import Transition from '../Transition/transition'

function App() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "space-around", height: 300 }}>
      <div>
        <Button onClick={() => setShow1(!show1)}>
          {show1 ? "展示" : "隐藏"} - 从上到下
        </Button>
        <Transition in={show1} timeout={300} animation="zoom-in-top">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592504906847&di=507e11abb8a87fc201fecce02eea65ad&imgtype=0&src=http%3A%2F%2Fstatic.open-open.com%2Flib%2FuploadImg%2F20150506%2F20150506124658_885.png"
            alt="图片加载失败"
          />
        </Transition>
      </div>
      <div>
        <Button onClick={() => setShow2(!show2)}>
          {show2 ? "展示" : "隐藏"} - 从下到上
        </Button>
        <Transition in={show2} timeout={300} animation="zoom-in-bottom">
          <h2>我是标题</h2>
        </Transition>
      </div>
      <div>
        <Button onClick={() => setShow3(!show3)}>
          {show3 ? "展示" : "隐藏"} - 从左到右
        </Button>
        <Transition in={show3} timeout={300} animation="zoom-in-left">
          <div>
            <p>我是第一行</p>
            <p>我是第二行</p>
            <p>我是第三行</p>
            <p>我是第四行</p>
          </div>
        </Transition>
      </div>
    </div>
  );
}
storiesOf("Transition 动画", module)
  .add("不同类型 transition", App);
