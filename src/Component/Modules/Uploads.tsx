import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useEmail } from "../../Store/Provider";
import { URL_SERVICE } from "../Constants/constants";

const { Dragger } = Upload;

export default function Uploads() {
  const [fileList, setFileList] = useState<any[]>([]);
  const { email } = useEmail();
  const [Loading, setLoading] = useState(false)
  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
  
    if (!email) {
      message.error("Email is required.");
      return;
    }
  
    if (fileList.length === 0) {
      message.error("Please select a file.");
      return;
    }
  
    try {
      const file = fileList[0].originFileObj;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', email);
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(key, value);
      });
  
      const response = await fetch(`${URL_SERVICE}/uploadFile`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setLoading(Loading)
        const result = await response.json();
        message.success(`${file.name} file uploaded successfully.`);
        console.log(result);
      } else {
        setLoading(Loading)
        const errorText = await response.text();
        message.error(`File upload failed: ${errorText}`);
      }
    } catch (error) {
      setLoading(Loading)
      message.error('File upload failed.');
      console.error('Error uploading file:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Dragger
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false} 
          style={{ marginBottom: '16px' }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading suspicious data.
          </p>
        </Dragger>
        <div className="flex justify-center">
          {fileList.length > 0 && <Button type="primary" className="bg-[#007373] mt-5" htmlType="submit" loading={Loading}>
          Submit
        </Button>}
        </div>
      </div>
    </form>
  );
}
