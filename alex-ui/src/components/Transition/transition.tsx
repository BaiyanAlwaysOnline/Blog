import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type AnimationType =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

export type TransitionProp = CSSTransitionProps & {
  animation?: AnimationType;
  wrapper?: boolean; // 防止包裹组件的动画与transition组件冲突
};

export const Transition: FC<TransitionProp> = (props) => {
  const { animation, children, classNames, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={animation ? animation : classNames}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  animation: "zoom-in-top",
  appear: true,
  unmountOnExit: true,
};
export default Transition;
