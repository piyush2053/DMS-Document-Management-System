import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import { useEmail } from '../../Store/Provider';
export default function Greeting() {
  const { email } = useEmail()
  return (
    <div>
      <Title>Hi, {email || "User"}</Title>
      <Paragraph>You can now download reports and files directly from our site. Simply choose your desired range, and access the documents you need in just a few clicks</Paragraph>
    </div>
  )
}
