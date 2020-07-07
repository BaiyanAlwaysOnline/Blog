import React, { useContext, useState, FC } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
  const { index: currentIndex, mode, defaultOpenKeys } = useContext(
    MenuContext
  );
  const { className, children, index, title } = props;
  const dealDefaultOpenKeys = defaultOpenKeys as Array<string>;
  const isdefaultOpen =
    mode === "vertical" && index && dealDefaultOpenKeys
      ? dealDefaultOpenKeys.includes(index)
      : false;
  const [isOpened, setOpen] = useState(isdefaultOpen);
  const classes = classNames("alex-menuItem alex-subMenu-item", className, {
    "is-active": currentIndex === index,
    "is-opened": isOpened,
    "is-vertical": mode === "vertical",
  });
  const renderChildren = () => {
    const classes = classNames("alex-subMenu", {
      "is-opened": isOpened,
    });
    const childrenComponent = React.Children.map(
      children as React.FunctionComponentElement<SubMenuProps>,
      (child, i) => {
        if (child.type.displayName === "MenuItem") {
          return React.cloneElement(child, {
            index: `${index}-${i}`,
          });
        } else {
          console.error(
            "SubMenu has children which is not a MenuItem component"
          );
        }
      }
    );
    return (
      <Transition in={isOpened} timeout={300}>
        <ul className={classes}>{childrenComponent}</ul>
      </Transition>
    );
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!isOpened);
  };
  const clickEvents =
    mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  return (
    <li className={classes} {...hoverEvents}>
      <div className={"alex-subMenu-title"} {...clickEvents}>
        {title}
        <Icon className="arrow-icon" icon="angle-down" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
