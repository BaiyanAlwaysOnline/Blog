import React from "react";
import { storiesOf } from "@storybook/react";
import Icon from "../Icon/icon";

storiesOf("Icon 图标", module)
  .add("默认的 icon", () => <Icon icon="plus" />)
  .add("不同主题 icon", () => (
    <div style={{display:'flex', justifyContent: 'space-between', width: '200px'}}>
      <Icon icon="plus" theme="danger" />
      <Icon icon="plus-circle" theme="dark" />
      <Icon icon="hourglass-end" theme="light" />
      <Icon icon="house-damage" theme="info" />
      <Icon icon="clipboard" theme="success" />
    </div>
  )).add("更多行为 icon", () => (
    <div style={{display:'flex', justifyContent: 'space-between', width: '100px'}}>
      <Icon icon='spinner' spin size='lg' theme='dark' />
      <Icon icon='heart'  size='lg' theme='danger' />
    </div>
  ));
