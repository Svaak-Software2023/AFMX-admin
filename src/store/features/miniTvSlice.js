import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addMiniTvMedia } from '../ApiServices/miniTvService'



////////////------------add mini tv media with url and image or video---------------------------/////////////////////////////

export const addMini_Tv_Media = createAsyncThunk("/mini/tv/upload-media/", async (formData) => {
    try {
        const response = await addMiniTvMedia(formData);
        return response
    } catch (err) {
        return err.response
    }
});


const miniTvSlice = createSlice({
    name: "ProductAndCategory",
    initialState: {
        miniTvList: [],
        message: "",
        error: "",
        loading: false,
        status:""
    },
    reducers: {},
    extraReducers: {
        [addMini_Tv_Media.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [addMini_Tv_Media.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.miniTvList.push(action.payload?.miniTvResponse)
            state.status = 'succeeded'
        },
        [addMini_Tv_Media.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
    }
})

// Export The reducer
export default miniTvSlice.reducer
