import React, { FC, ButtonHTMLAttributes, LinkHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonType = "primary" | "danger" | "default" | "link";

export type ButtonSize = "lg" | "sm";


interface BaseButtonProps {
  /**自定义className */
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  /**当Button类型为link时 必填 */
  href?: string;
  children: React.ReactNode;
}

// 原生button和a标签 还有很多自带的属性，方便用户拓展 光BaseButtonProps是不够的
type nativeBtnPropsType = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type nativeLinkPropsType = BaseButtonProps & LinkHTMLAttributes<HTMLElement>;
export type ButtonPropsType = Partial<nativeBtnPropsType & nativeLinkPropsType>;

export const Button: FC<ButtonPropsType> = (props) => {
  const {
    disabled,
    size,
    btnType,
    children,
    href,
    className,
    ...restProps
  } = props;
  const classes = classNames("alex-btn", className, {
    [`alex-btn-${btnType}`]: btnType,
    [`alex-btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button {...restProps} className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  btnType: "default",
  disabled: false,
};

export default Button;
