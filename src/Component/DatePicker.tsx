import { useEffect, useState } from 'react';
import List from './List';
import Greeting from './Modules/Greeting';


const DatePickerComp = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        let token = Math.random().toString(36).substr(2);
        setToken(token);
        sessionStorage.setItem('token', token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
    const intervalId = setInterval(fetchToken, 10 * 60 * 1000); // 10 minutes token refresh

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='m-5'>
      <div className='flex justify-start'>
        <div className='m-2'>
          <Greeting />
          <div className='mt-3'>
            {/* <Button onClick={handleSearch} loading={loading}>Search</Button> */}
          </div>
        </div>
      </div>
      <div className='flex justify-start'>
        <List loading={loading} Records={data} />
      </div>
    </div>
  );
};

export default DatePickerComp;
