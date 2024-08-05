import React from 'react';
import { Button, Table } from 'antd';
import * as XLSX from 'xlsx';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface ListProps {
  Records: any;
}

const TableRecords: React.FC<ListProps> = ({ Records }) => {
  const details = Records?.Details || [];
  const columnNames = details.length > 0 ? Object.keys(details[0]) : [];
  
  const columns = columnNames.map(name => ({
    title: name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim(),
    dataIndex: name,
    key: name,
  }));

  const data: DataType[] = details.slice(0, 11).map((item: any, index: any) => ({
    key: index.toString(),
    ...item,
  }));

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(details); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'csv', type: 'array' }); 
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report (${details.length}).csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      {details.length > 0 && <Button className='mt-5' onClick={handleDownload}>Download Full Report</Button>}
    </div>
  );
};

export default TableRecords;
