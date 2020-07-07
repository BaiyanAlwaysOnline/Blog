import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload from "./upload";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Button from "../Button/button";

const beforeUpload = (file: File) => {
  return true;
};
const defaultFileList: UploadFile[] = [
  { uid: "123", size: 1234, name: "hello.md", status: "loading", percent: 30 },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
const upload = () => (
  <>
    <Upload
      onError={action("error")}
      onSuccess={action("success")}
      onProgress={action("progress")}
      defaultFileList={defaultFileList}
      onChange={action("change")}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      accept={".jpg"}
      multiple
    >
      <Button>
        点击上传
        <Icon icon="upload" size='sm' style={{marginLeft: 10}} />
      </Button>
    </Upload>
  </>
);

const draggerUpload = () => (
  <>
    <Upload
      onError={action("error")}
      onSuccess={action("success")}
      onProgress={action("progress")}
      defaultFileList={defaultFileList}
      onChange={action("change")}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      multiple
      dragger
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  </>
);

storiesOf("Upload 上传", module)
  .addParameters({
    info: {
      text: `
    ~~~js
    import Upload from "alex-ui";
    ~~~
  `,
    },
  })
  .add("点击上传", upload)
  .add("支持拖拽上传", draggerUpload);
