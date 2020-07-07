import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

export interface DraggerProps {
  onFile: (e: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragover, setDragover] = useState(false);
  const classes = classNames("alex-uploader-dragger", {
    "is-dragover": dragover,
  });
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragover(over);
  };
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragover(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => handleDrag(e, true)}
      onDrop={(e) => handleDrop(e)}
    >
      {children}
    </div>
  );
};

export default Dragger;
