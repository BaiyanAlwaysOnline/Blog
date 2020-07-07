import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";
import Icon from "../Icon/icon";

storiesOf("Button 按钮", module)
  .add("默认 button", () => (
    <>
      <Button style={{ marginRight: 30 }} onClick={action("clicked")}>
        默认 Button
      </Button>
      <Button disabled onClick={action("clicked")}>
        禁用 Button
      </Button>
    </>
  ))
  .add("不同尺寸 button", () => (
    <>
      <Button style={{ marginRight: 30 }} size="sm" onClick={action("clicked")}>
        small Button
      </Button>
      <Button size="lg" onClick={action("clicked")}>
        large Button
      </Button>
    </>
  ))
  .add("不同类型 button", () => (
    <>
      <Button
        style={{ marginRight: 30 }}
        btnType="primary"
        onClick={action("clicked")}
      >
        primary Button
      </Button>
      <Button
        style={{ marginRight: 30 }}
        btnType="danger"
        onClick={action("clicked")}
      >
        danger Button
      </Button>
      <Button
        style={{ marginRight: 30 }}
        btnType="default"
        onClick={action("clicked")}
      >
        default Button
      </Button>
      <Button
        style={{ marginRight: 30 }}
        btnType="link"
        href="http://www.google.com"
        onClick={action("clicked")}
      >
        link Button
      </Button>
    </>
  ))
  .add("带图标 button", () => (
    <>
      <Button style={{ marginRight: 30 }} onClick={action("clicked")}>
        带图标 Button
        <Icon style={{ marginLeft: "4" }} icon="question-circle" theme="info" />
      </Button>
      <Button
        style={{ marginRight: 30 }}
        btnType="danger"
        size="sm"
        onClick={action("clicked")}
      >
        带图标 Button
        <Icon style={{ marginLeft: "4" }} icon="plus" theme="light" />
      </Button>
      <Button style={{ marginRight: 30 }} onClick={action("clicked")}>
        带图标 Button
        <Icon style={{ marginLeft: "4" }} icon="ban" theme="danger" />
      </Button>
    </>
  ));
