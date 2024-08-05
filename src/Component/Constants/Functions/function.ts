import JS_SHA from 'jssha';
import { URL_SERVICE } from '../constants';

export const generateToken = (email:any) => {
  const shaObj = new JS_SHA("SHA-256", "TEXT");
  const randomString = crypto.getRandomValues(new Uint8Array(16)).toString();
  const data = email + randomString;
  shaObj.update(data);
  return shaObj.getHash("HEX");
}

export const CreateDBSpace = async (email:any) => {
    try {
      const response = await fetch(`${URL_SERVICE}/createSpace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  export const getDocuments = async (email:any) => {
    try {
      const response = await fetch(`${URL_SERVICE}/listFiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };