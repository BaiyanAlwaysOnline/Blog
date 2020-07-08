import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome", module).add(
  "Welcome",
  () => {
    return (
      <>
        <h1>🔥欢迎来到 alex-design 组件库</h1>
        <p> alex-design组件库是由 React + TypeScript 打造的</p>
        <br />
        <br />
        <b>📚安装试试</b>
        <br />
        <code>npm install alex-design --save</code>
        <br />
        <br />
        <b>🎈加载样式</b>
        <br />
        <code>import 'alex-design/dist/index.css'</code>
      </>
    );
  },
  { info: { disable: true } }
);
