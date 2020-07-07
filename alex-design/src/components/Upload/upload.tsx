import React, { FC, useRef, ChangeEvent, useState } from "react";
import Button from "../Button/button";
import UploadFleList from "./uploadList";
import Dragger from "./dragger";
import axios from "axios";

export type upLoadStatus = "ready" | "loading" | "success" | "error";

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status: upLoadStatus;
  percent: number;
  file?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /**文件上传的地址  */
  action: string;
  /**默认展示的文件列表  */
  defaultFileList?: UploadFile[];
  /**文件上传成功后回调  */
  onSuccess?: (res: any, file: UploadFile) => void;
  /**文件上传失败后回调  */
  onError?: (error: any, file: UploadFile) => void;
  /**文件上传进度  */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传后的回调  */
  onChange?: (file: UploadFile) => void;
  /**文件删除后的回调  */
  onRemove?: (file: UploadFile) => void;
  /**文件上传之前回调，返回false时阻止文件上传  */
  beforeUpload?: (file: UploadFile) => boolean | Promise<File>;
  /**自定义请求参数  */
  data?: { [key: string]: any };
  /**自定义请求头  */
  headers?: { [key: string]: any };
  /**自定义name  */
  name?: string;
  /**发送时是否携带cookie  */
  withCredentials?: boolean;
  /**接收上传什么类型的文件  */
  accept?: string;
  /**是否支持多选  */
  multiple?: boolean;
  /**是否支持拖拽上传  */
  dragger?: boolean;
  children?: React.ReactNode;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onError,
    onProgress,
    beforeUpload,
    defaultFileList,
    onChange,
    onRemove,
    withCredentials,
    data,
    headers,
    name,
    accept,
    multiple,
    dragger,
    children,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    //上传完成后清空
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    const fileList = Array.from(files);
    fileList.forEach((file) => {
      if (!beforeUpload) {
        postFile(file);
      } else {
        const _file = fileChange(file);
        const result = beforeUpload(_file);
        if (result && result instanceof Promise) {
          result.then((file) => {
            postFile(file);
          });
        } else if (result !== false) {
          postFile(file);
        }
      }
    });
  };
  const fileChange = (file: File) => {
    const _file: UploadFile = {
      uid: "react-upload" + Date.now(),
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
      file,
    };
    return _file;
  };
  const postFile = (file: File) => {
    const _file = fileChange(file);
    setFileList((preState) => {
      return [...preState, _file];
    });
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress(e) {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            upDateFileList(_file, {
              status: "loading",
              percent: percentage,
            });
            if (onProgress) {
              onProgress(percentage, _file);
            }
          }
        },
      })
      .then((res) => {
        if (onSuccess) {
          onSuccess(res, _file);
        }
        if (onChange) {
          onChange(_file);
        }
        upDateFileList(_file, {
          status: "success",
          response: res,
        });
      })
      .catch((err) => {
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
        upDateFileList(_file, {
          status: "error",
          error: err,
        });
      });
  };
  const upDateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((preState) => {
      return preState.map((file) => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj,
          };
        } else {
          return {
            ...file,
          };
        }
      });
    });
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((preState) => {
      return preState.filter((_file) => _file.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  return (
    <div className="alex-upload-component">
      <div
        className="alex-upload-input"
        onClick={handleUpload}
        style={{ display: "inline-block" }}
      >
        {dragger ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: "none" }}
          ref={fileRef}
        />
      </div>

      <UploadFleList onRemove={handleRemove} fileList={fileList} />
    </div>
  );
};
Upload.defaultProps = {
  name: "file",
};
export default Upload;
