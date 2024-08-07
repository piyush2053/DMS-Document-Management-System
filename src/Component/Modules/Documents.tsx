import { useEffect, useState } from 'react';
import {  DeleteOutlined, FolderOpenFilled, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, Spin, Tooltip, Typography } from 'antd';
import { getDocuments } from '../Constants/Functions/function';
import { useEmail } from '../../Store/Provider';
import { typeDocs } from '../Constants/constants';
import NoFiles from './Chunks/NoFiles';

const { Paragraph } = Typography;

// Define the type for a document
interface Document {
  name: string;
  extension: string;
}

export default function Documents() {
  const { email } = useEmail();
  const [docs, setDocs] = useState<Document[]>(typeDocs);
  const [selectedDocs, setSelectedDocs] = useState<Document[]>([]);

  const fetchDocs = async () => {
    const docs = await getDocuments(email);
    setDocs(docs);
  };

  useEffect(() => {
    fetchDocs();
    // eslint-disable-next-line
  }, [email]);

  const getIcon = (extension: string) => {
    switch (extension) {
      case '.docx':
        return <img src='https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/Icon-Word-28x281?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=100' alt='docx' className='h-14' />;
      case '.pdf':
        return <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/768px-Adobe_Acrobat_DC_logo_2020.svg.png' alt='pdf' className='h-14' />;
      case '.ppt':
      case '.pptx':
        return <img src='https://cdn.pixabay.com/photo/2021/01/30/12/18/powerpoint-5963677_960_720.png' alt='pptx' />;
      case '.xlsx':
      case '.xls':
        return <img src='https://w7.pngwing.com/pngs/394/915/png-transparent-excel-hd-logo-thumbnail.png' alt='excel' className='h-14' />;
      case '.jpg':
      case '.bitmap':
      case '.jpeg':
      case '.png':
        return <img src='https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png' alt='img' className='h-14' />;
      default:
        return <FolderOpenFilled className='text-[50px] text-[#FFB300]' />;
    }
  };

  const handleDocClick = (doc: Document) => {
    setSelectedDocs(prevSelectedDocs =>
      prevSelectedDocs.includes(doc)
        ? prevSelectedDocs.filter(item => item !== doc)
        : [...prevSelectedDocs, doc]
    );
  };

  const handleDeleteSelected = () => {
    setDocs(prevDocs => prevDocs.filter(doc => !selectedDocs.includes(doc)));
    setSelectedDocs([]);
  };

  return (
    <div className='animate-fade'>
      {docs.length > 0 ?
        <div>
          <div className='flex mb-1'>
            <div className='flex justify-between'>
              <div className='mr-4'>
                <Paragraph className='text-[24px] my-auto'>Your Files</Paragraph>
                {docs.length > 0 ? null : <>{docs.length === 0 ? null : <Spin className='my-auto ml-4' indicator={<LoadingOutlined spin />} />}</>}
              </div>
              <div className='my-auto'>
                {selectedDocs.length > 0 && (
                  <Tooltip title="Delete Selected Files">
                  <Popconfirm
                  title="Delete"
                  description="Are you sure to delete these files?"
                  onConfirm={handleDeleteSelected}
                  okText="Yes"
                  cancelText="No"
                >
                   <Button type="primary"  icon={<DeleteOutlined />} className='bg-red-500'>{selectedDocs.length}</Button>
                </Popconfirm>
                </Tooltip>
                )}
              </div>
            </div>
          </div>
          <Divider />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-10 gap-4'>
            {docs.map((item, index) => (
              <div
                key={index}
                className={`border p-2 rounded-lg cursor-pointer hover:scale-110 transition hover:z-50 ${selectedDocs.includes(item) ? 'border-2 border-red-300' : ''}`}
                onClick={() => handleDocClick(item)}
              >
                {getIcon(item.extension)}
                <p className='font-semibold mt-2 text-xs truncate hover:whitespace-normal hover:overflow-visible hover:truncate'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        :
        <NoFiles />
      }
    </div>
  );
}
