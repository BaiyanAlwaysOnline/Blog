import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

export interface UploadFileListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: FC<UploadFileListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="alex-upload-list">
      {fileList.map((item) => {
        return (
          <li className="alex-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === "loading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === "loading" && <Progress percent={item.percent} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
