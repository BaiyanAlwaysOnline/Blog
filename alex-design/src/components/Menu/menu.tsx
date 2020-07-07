import React, { createContext, useState, FC } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type menuMode = "horizontal" | "vertical";

export interface MenuProps {
  defaultSelectedKeys?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: any;
  mode?: menuMode;
  defaultOpenKeys?: string[];
  onSelect?: (selectedIndex: string) => void;
}

interface IMenuContext {
  index: string;
  mode?: menuMode;
  defaultOpenKeys?: string[];
  onSelect?: (selectedIndex: string) => void;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    style,
    onSelect,
    defaultSelectedKeys,
    children,
    mode,
    defaultOpenKeys,
  } = props;
  const [currentActive, setActive] = useState(defaultSelectedKeys);
  const classes = classNames("alex-menu", className, {
    [`alex-menu-horizontal`]: mode === "horizontal",
    [`alex-menu-vertical`]: mode !== "horizontal",
  });
  const renderChildren = () => {
    return React.Children.map(
      children as React.FunctionComponentElement<MenuItemProps>,
      (child, index) => {
        console.log(children);
        if (
          child.type.displayName === "MenuItem" ||
          child.type.displayName === "SubMenu"
        ) {
          return React.cloneElement(child, { index: index.toString() });
        } else {
          console.error("Menu has children which is not a MenuItem component");
        }
      }
    );
  };
  const handleSelect = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const ctxProvideVal: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleSelect,
    mode,
    defaultOpenKeys,
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={ctxProvideVal}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultSelectedKeys: "0",
  mode: "horizontal",
};

export default Menu;
