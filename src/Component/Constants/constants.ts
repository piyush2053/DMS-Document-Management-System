import { FileOutlined, HistoryOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";

export const URL_SERVICE = "http://localhost:9000"

export const items = [
  {
    key: '1',
    icon: React.createElement(FileOutlined),
    label: 'Documents',
    path:"/documents"
  },
  {
    key: '2',
    icon: React.createElement(UploadOutlined),
    label: 'Upload',
    path:"/upload"
  },
  {
    key: '3',
    icon: React.createElement(HistoryOutlined),
    label: 'History',
    path:"/logs"
  },
];


export const files = [
  {
    date: new Date(),
    fileName: "Credential Report 1",
    description: "Detailed report for credentials of domain A"
  },
  {
    date: new Date(),
    fileName: "Credential Report 2",
    description: "Detailed report for credentials of domain B"
  },
  {
    date: new Date(),
    fileName: "Credential Report 3",
    description: "Detailed report for credentials of domain C"
  },
  {
    date: new Date(),
    fileName: "Credential Report 4",
    description: "Detailed report for credentials of domain D"
  },
  {
    date: new Date(),
    fileName: "Credential Report 5",
    description: "Detailed report for credentials of domain E"
  },
  {
    date: new Date(),
    fileName: "Credential Report 6",
    description: "Detailed report for credentials of domain F"
  },
  {
    date: new Date(),
    fileName: "Credential Report 7",
    description: "Detailed report for credentials of domain G"
  },
  {
    date: new Date(),
    fileName: "Credential Report 8",
    description: "Detailed report for credentials of domain H"
  },
  {
    date: new Date(),
    fileName: "Credential Report 9",
    description: "Detailed report for credentials of domain I"
  },
  {
    date: new Date(),
    fileName: "Credential Report 10",
    description: "Detailed report for credentials of domain J"
  },
  {
    date: new Date(),
    fileName: "Credential Report 11",
    description: "Detailed report for credentials of domain K"
  },
  {
    date: new Date(),
    fileName: "Credential Report 12",
    description: "Detailed report for credentials of domain L"
  },
  {
    date: new Date(),
    fileName: "Credential Report 13",
    description: "Detailed report for credentials of domain M"
  },
  {
    date: new Date(),
    fileName: "Credential Report 14",
    description: "Detailed report for credentials of domain N"
  },
  {
    date: new Date(),
    fileName: "Credential Report 15",
    description: "Detailed report for credentials of domain O"
  },
  {
    date: new Date(),
    fileName: "Credential Report 16",
    description: "Detailed report for credentials of domain P"
  },
  {
    date: new Date(),
    fileName: "Credential Report 17",
    description: "Detailed report for credentials of domain Q"
  },
  {
    date: new Date(),
    fileName: "Credential Report 18",
    description: "Detailed report for credentials of domain R"
  },
  {
    date: new Date(),
    fileName: "Credential Report 19",
    description: "Detailed report for credentials of domain S"
  },
  {
    date: new Date(),
    fileName: "Credential Report 20",
    description: "Detailed report for credentials of domain T"
  },
  {
    date: new Date(),
    fileName: "Credential Report 21",
    description: "Detailed report for credentials of domain U"
  },
  {
    date: new Date(),
    fileName: "Credential Report 22",
    description: "Detailed report for credentials of domain V"
  },
  {
    date: new Date(),
    fileName: "Credential Report 23",
    description: "Detailed report for credentials of domain W"
  },
  {
    date: new Date(),
    fileName: "Credential Report 24",
    description: "Detailed report for credentials of domain X"
  },
  {
    date: new Date(),
    fileName: "Credential Report 25",
    description: "Detailed report for credentials of domain Y"
  }
];


export interface Document {
  name: string;
  extension: string;
  content: string; 
}

export const typeDocs: Document[] = [
  {
    name: 'test',
    extension: '.pdf',
    content: 'path/to/test.pdf', // Provide a default or placeholder content
  },
  {
    name: 'example',
    extension: '.docx',
    content: 'path/to/example.docx',
  },
  // Add more documents as needed
];