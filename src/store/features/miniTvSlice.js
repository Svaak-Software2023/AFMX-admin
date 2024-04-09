import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addMiniTvMedia, getAllMiniTvMedia, updateMiniTvMediaStatus, deleteMiniTvMedia } from '../ApiServices/miniTvService'



////////////------------add mini tv media with url and image or video---------------------------/////////////////////////////

export const addMini_Tv_Media = createAsyncThunk("/mini/tv/upload-media/", async (formData) => {
    try {
        const response = await addMiniTvMedia(formData);
        return response
    } catch (err) {
        return err.response
    }
});


export const getAll_MiniTv_Media = createAsyncThunk("/mini-tv/get-media/", async () => {
    try {
        const response = await getAllMiniTvMedia();
        return response
    } catch (err) {
        return err.response
    }
});

export const updateMini_TvMedia_Status = createAsyncThunk("/mini-tv/updateAndDelete-/media/", async ({miniTvId, formData}) => {
    try {
        const response = await updateMiniTvMediaStatus({miniTvId, formData});
        return response
    } catch (err) {
        return err.response
    }
});

export const delete_MiniTv_Media = createAsyncThunk("/delete/mini-tv/delete-media/", async (miniTvId) => {
    try {
        const response = await deleteMiniTvMedia(miniTvId);
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
            if(!state.miniTvList?.length){
                state.miniTvList = [action.payload.miniTvResponse] 
            } else {
                state.miniTvList.push(action.payload.miniTvResponse)
            }
            state.status = 'succeeded'
        },
        [addMini_Tv_Media.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
        [getAll_MiniTv_Media.pending]:(state,action)=>{
            state.loading=true
            state.status = 'loading'
        },
        [getAll_MiniTv_Media.fulfilled]:(state,action)=>{
            state.message = action.payload?.message
            state.loading=false
            state.miniTvList = action.payload?.miniTvGetSingleResponse
            state.status = 'succeeded'
        },
        [getAll_MiniTv_Media.rejected]:(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.status = 'failed'
        },
    }
})

// Export The reducer
export default miniTvSlice.reducer
