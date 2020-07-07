import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  percent: number;
  showText?: boolean;
  strokeHeight?: number;
  theme?: ThemeProps;
  styles?: React.CSSProperties;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="alex-progress-bar" style={styles}>
      <div
        className="alex-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`alex-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;
