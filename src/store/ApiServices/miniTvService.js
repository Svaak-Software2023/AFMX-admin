import { Alert } from '@mui/material';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api'


export const addMiniTvMedia = async (form_Data) => {
  try {
    const formData = new FormData();
    for (const [key, val] of Object.entries(form_Data)){
      if(key === 'miniTvMedia'){
        for(const img of val){
          formData.append(key, img);
        }
      }else{
        formData.append(key, val);
      }
    }
    
    const response = await axios.post('/mini-tv/upload-media', formData)
    return response.data
  } catch (error) {
    throw error
  }
};


