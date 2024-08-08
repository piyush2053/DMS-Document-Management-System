import { Spin, Steps } from "antd";
import { useEmail } from "../../Store/Provider";
import { useEffect, useState } from "react";
import { getLogs } from "../Constants/Functions/function";
import { LoadingOutlined } from "@ant-design/icons";

interface LogDetails {
  originalName?: string;
  deletedFiles?: string[];
}

interface LogEntry {
  timestamp: string;
  action: string;
  details?: LogDetails;
}

function getDescriptionForAction(action: string, details?: LogDetails, timestamp?: string): string {
  const time = timestamp ? new Date(timestamp).toLocaleTimeString() : "unknown time";

  switch (action) {
    case "Directory Creation":
      return `Directory created at ${time}.`;
    case "List Files":
      return `Listed files at ${time}.`;
    case "File Upload":
      return `Uploaded file ${details?.originalName} at ${time}.`;
    case "Delete Files":
      return `Deleted files ${details?.deletedFiles?.join(", ")} at ${time}.`;
    default:
      return `Action ${action} performed at ${time}.`;
  }
}

export default function History() {
  const { email } = useEmail();
  const [Logs, setLogs] = useState<LogEntry[]>([]);

  const fetchLogs = async () => {
    try {
      const log = await getLogs(email);
      setLogs(Array.isArray(log) ? log : []);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
    }
  };
  

  useEffect(() => {
    fetchLogs();
  }, [email]);

  const items = Logs.map((log, index) => {
    const title = `${email} ${log.action === "File Upload" ? "uploaded a file" : log.action.toLowerCase()}`;
    const description = getDescriptionForAction(log.action, log.details, log.timestamp);

    return {
      title,
      description,
    };
  });

  return (
    <div>
      {Logs.length > 0 ? (
        <Steps direction="vertical" current={0} items={items} />
      ) : (
        <Spin className="my-auto ml-4" indicator={<LoadingOutlined spin />} />
      )}
    </div>
  );
}
