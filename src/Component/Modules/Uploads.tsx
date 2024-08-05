import React, { useState } from "react";
import { Button, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;

const uploadProps: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function Uploads() {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Ant Design Upload Component */}
        <Dragger {...uploadProps} style={{ marginBottom: '16px' }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading suspicious data.
          </p>
        </Dragger>

        <TextArea placeholder="File Name" autoSize className="mb-3 mt-5" />
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Description"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div style={{ margin: '24px 0' }} />
        <Button type="primary" className="bg-[#007373]" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
