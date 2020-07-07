import React, { FC } from "react";
import classNames from "classnames";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";


export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconPropsType extends FontAwesomeIconProps {
  /**支持框架主题 根据主题显示不同的颜色 */
  theme?: ThemeProps;
  /**自定义className */
  className?: string;
}

export const Icon: FC<IconPropsType> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("alex-icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

Icon.defaultProps = {
  theme: 'primary'
}

export default Icon;