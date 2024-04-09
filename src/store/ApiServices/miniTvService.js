import { Alert } from '@mui/material';
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_baseURL;


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


export const getAllMiniTvMedia = async () => {
  try {
    const reponse = await axios.get('/mini-tv/get-media');
    const data = await reponse.data
    return data
  } catch (error) {
    throw error
  }
};


export const updateMiniTvMediaStatus = async ({miniTvId, formData}) => {
  try {
    let body = {miniTvId};
    if(formData.isActive !== undefined && formData.isActive != null){
      body['isActive']=formData.isActive;
    } 
    if(formData.mediaUrl !== undefined && formData.mediaUrl != null){
      body['mediaUrl']=formData.mediaUrl;
    } 
    if(formData.miniTvMedia && formData.miniTvMedia.length){
      body['miniTvMedia']=formData.miniTvMedia;
    } 
  let form_Data = new FormData();
  for(let [key,value] of Object.entries(body)){
    if(Array.isArray(value)){
      for(const img of value){
        form_Data.append(key, img);
      }
    } else {
      form_Data.append(key, value);
    }
  };
  form_Data = Object.fromEntries(form_Data.entries());
  //   console.log('response--',form_Data);
    const response = await axios.patch(`/mini-tv/updateAndDelete-media`, form_Data)
    return response.data
  } catch (error) {
    throw error
  }
};


export const deleteMiniTvMedia = async (miniTvId) => {
  try {
    const reponse = await axios.delete(`/mini-tv/delete-media?miniTvId=${miniTvId}`);
    const data = await reponse.data
    return data
  } catch (error) {
    throw error
  }
};


