import React from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait,
} from "@testing-library/react";

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props} defaultSelectedKeys={"0"}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="下拉1">
        <MenuItem>drop item1</MenuItem>
      </SubMenu>
      <SubMenu title="下拉2">
        <MenuItem>drop item2</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const dropElemStyle = () => {
  const cssFile:string = `
  .alex-subMenu {
    display: none;
  }
  .alex-subMenu.is-opened {
    display: block;
  }
  `
  const style = document.createElement('style');
  style.innerHTML = cssFile;
  return style
}

const testDefaultProps: MenuProps = {
  defaultSelectedKeys: "1",
  onSelected: jest.fn(),
  className: "test-defaultProps",
};
const testVerProps: MenuProps = {
  defaultSelectedKeys: "0",
  mode: "vertical",
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testDefaultProps));
    wrapper.container.append(dropElemStyle())
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("test-defaultProps alex-menu");
    // :scope 表示当前元素 也就是 menuElement
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5);
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass("is-active");
    expect(disabledElement).toBeInTheDocument();
    expect(disabledElement).toHaveClass("is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdElem = wrapper.getByText("xyz");
    fireEvent.click(thirdElem);
    expect(thirdElem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testDefaultProps.onSelected).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testDefaultProps.onSelected).not.toHaveBeenCalledWith("1");
  });
  it("test Menu and MenuItem component in vertical mode", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const element = wrapper.getByTestId("test-menu");
    expect(element).toHaveClass("alex-menu-vertical");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    //queryByText => null | HTMLElement  是否默认是隐藏的
    const dropItem = wrapper.queryByText('drop item1')
    expect(dropItem).not.toBeVisible()

    //判断鼠标移入后是否300ms显示
    fireEvent.mouseEnter(wrapper.getByText('下拉1'));
    await wait(() => {
      expect(dropItem).toBeVisible()
    })
    //判断点击submenu子item是否返回正确的index
    fireEvent.click(wrapper.getByText('drop item2'));
    expect(testDefaultProps.onSelected).toHaveBeenCalledWith('4-0')
    //判断鼠标移出后是否300ms隐藏
    fireEvent.mouseLeave(wrapper.getByText('下拉1'));
    await wait(() => {
      expect(dropItem).not.toBeVisible()
    })
  });
});
