import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

export const defaultMenu = () => (
  <Menu defaultSelectedKeys="2" onSelect={action("selected")}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
  </Menu>
);

const ShowSubMenu = () => (
  <>
    <h5>竖直方向：</h5>
    <Menu
      defaultSelectedKeys={"3-1"}
      mode="vertical"
      defaultOpenKeys={["3"]}
      onSelect={action("selected")}
    >
      <MenuItem>one</MenuItem>
      <MenuItem>two</MenuItem>
      <MenuItem disabled>three</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>MenuItem one</MenuItem>
        <MenuItem>MenuItem two</MenuItem>
        <MenuItem>MenuItem three</MenuItem>
      </SubMenu>
      <MenuItem>four</MenuItem>
    </Menu>
    <br />
    <br />
    <h5>水平方向：</h5>
    <Menu
      defaultSelectedKeys={"3-1"}
      mode="horizontal"
      defaultOpenKeys={["3"]}
      onSelect={action("selected")}
    >
      <MenuItem disabled>three</MenuItem>
      <SubMenu title="下拉菜单">
        <MenuItem>MenuItem one</MenuItem>
        <MenuItem>MenuItem two</MenuItem>
        <MenuItem>MenuItem three</MenuItem>
      </SubMenu>
      <MenuItem>four</MenuItem>
    </Menu>
  </>
);
storiesOf("Menu 导航菜单", module)
  .add("Menu", defaultMenu)
  .add("subMenu", ShowSubMenu);
