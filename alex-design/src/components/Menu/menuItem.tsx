import React, { useContext, FC } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { className, style, index, disabled, children } = props;
  const { index: currentIndex, onSelect } = useContext(MenuContext);
  const classes = classNames("alex-menuItem", className, {
    "is-disabled": disabled,
    "is-active": currentIndex === index,
  });
  const handleClick = () => {
    if (onSelect && !disabled && typeof index === "string") {
      onSelect(index);
    }
  };
  return (
    <li style={style} className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
