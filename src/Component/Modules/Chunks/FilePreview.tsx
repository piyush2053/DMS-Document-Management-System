import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { Document } from '../../Constants/constants';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

interface FilePreviewModalProps {
  visible: boolean;
  onClose: () => void;
  document: Document | null;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ visible, onClose, document }) => {
  const [content, setContent] = useState<string | null>(null);
  const pdfViewerRef = useRef<HTMLDivElement | null>(null);
  console.log(document,'----')

  useEffect(() => {
    if (document && visible) {
      const fetchContent = async () => {
        if (document.extension === '.docx') {
          const response = await fetch(document.content);
          const arrayBuffer = await response.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          setContent(result.value);
        } else if (document.extension === '.pdf') {
          const loadingTask = pdfjsLib.getDocument(document.content);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = window.document.createElement('canvas'); 
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          if (context) {
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await page.render(renderContext).promise;
            setContent(canvas.toDataURL());
          }
        } else {
          setContent(document.content); 
        }
      };

      fetchContent().catch(console.error);
    }
  }, [document, visible]);

  const renderContent = () => {
    if (!content) return <div>Loading...</div>;

    switch (document?.extension) {
      case '.pdf':
        return <img src={content} alt="PDF preview" style={{ width: '100%' }} />;
      case '.docx':
        return <div>{content}</div>;
      case '.jpg':
      case '.jpeg':
      case '.png':
        return <img src={content} alt={document?.name} style={{ width: '100%' }} />;
      default:
        return <div>Preview not available for this file type</div>;
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} width={800}>
      <h2>{document?.name}</h2>
      <div ref={pdfViewerRef}>
        {renderContent()}
      </div>
    </Modal>
  );
};

export default FilePreviewModal;
