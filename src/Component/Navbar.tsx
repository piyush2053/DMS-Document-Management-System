import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { useEmail } from '../Store/Provider';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { email } = useEmail();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const content = (
    <div>
      <p>Email - {email}</p>
      <p className='mb-3'>Logged in - {currentTime}</p>
      <Button type="primary" size='small' className='bg-[#007373]' icon={<LogoutOutlined />} iconPosition={"start"} href='/'>
        Logout
      </Button>
    </div>
  );

  return (
    <div className='bg-[#007373] flex justify-between p-2'>
      <div className='my-auto'>
        <p className='my-auto py-auto text-white mx-4'>Hi, {email.split('@')[0] || "User"}</p>
      </div>
      <Popover content={content} title="User Details" trigger="click">
        <Avatar style={{ backgroundColor: "#004D40", verticalAlign: 'middle' }} size="default" gap={4} className='cursor-pointer hover:shadow-md hover:animate-fade'>
          <UserOutlined />
        </Avatar>
      </Popover>
    </div>
  );
};
