import { Steps } from "antd";
import { useEmail } from "../../Store/Provider";

const titles = [
  "Logged in DMS",
  "Downloaded File XYZ",
  "Waiting",
  "Updated Profile",
  "Sent Email",
  "Received Response",
  "Scheduled Meeting",
];

const descriptions = [
  "User logged into the Document Management System.",
  "User downloaded the file XYZ successfully.",
  "User is waiting for the next action.",
  "User updated their profile information.",
  "User sent an email to the team.",
  "User received a response from the client.",
  "User scheduled a meeting for next week.",
];

function getRandomItem(arr:any) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function History() {
  const { email } = useEmail();
  const items = Array.from({ length: 3 }, () => ({
    title: `${email} ${getRandomItem(titles)}`,
    description: getRandomItem(descriptions),
  }));

  return (
    <Steps
      direction="vertical"
      current={1}
      items={items}
    />
  );
}
