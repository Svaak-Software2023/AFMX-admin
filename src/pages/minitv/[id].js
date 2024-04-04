import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { single_ProductBy_Id } from 'src/store/features/productAndcategorySlice'
import { Card, Typography,CardActions,CardContent,CardMedia,Button, Box, ImageList, ImageListItem, styled } from '@mui/material';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import { getAll_MiniTv_Media } from 'src/store/features/miniTvSlice';

const Active = styled('span')(() => ({
    color: 'green'
  }))
  
  const InActive = styled('span')(() => ({
    color: 'red'
  }))

const MiniTvDetails = () => {
    const router = useRouter();
    const miniTv_Id = router.query.id;
    const dispatch = useDispatch();

    const { miniTvList, loading, status,message } = useSelector(state => state.miniTvData);
    const singleMiniTv = (miniTvList).find(({miniTvId})=> (+miniTvId === +miniTv_Id) );


    useEffect(() => {
      if(miniTv_Id){
        dispatch(getAll_MiniTv_Media())
      } 
    }, [miniTv_Id])





  return (
    <>
     <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }} >
        <span style={{cursor:"pointer"}} onClick={() => router.back()} title="go back"><TurnLeftIcon /> &nbsp; Mini Tv Media Details</span>
      </Typography>
      <Card sx={{ maxWidth: 1100 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }} >Media Url:<Box component='span' sx={{ marginLeft:"15px" }}>{singleMiniTv?.mediaUrl}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Status:<Box component='span' sx={{ marginLeft:"15px" }}>{(singleMiniTv?.isActive) ? <Active>Active</Active> : <InActive>InActive</InActive>}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Created Date:<Box component='span' sx={{ marginLeft:"15px" }}>{ (singleMiniTv?.createdDate ? singleMiniTv?.createdDate.split('T')[0] : 'N/A')}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Updated Date:<Box component='span' sx={{ marginLeft:"15px" }}>{ (singleMiniTv?.updatedDate ? singleMiniTv?.updatedDate.split('T')[0] : 'N/A')}</Box></Typography>
      </CardContent>

      <ImageList sx={{ maxWidth: 1100 }} cols={2}>
        {(([singleMiniTv?.miniTvMedia]) || []).map((item,index) => (

      <ImageListItem key={index}>
      
      {[(item?.split(".") || [])[+(item?.split(".") || []).length -1]].includes("mp4") ? (
                      <video width="400" controls key={index+1}>
                        <source src={item} type="video/mp4" />
                          Your browser does not support HTML video.
                      </video>
                    )  : <img srcSet={item} key={index+2} src={item} alt={item} loading="lazy" />}
    </ImageListItem>
  ))}
</ImageList>

    </Card>
    
        
    </>
  )
}

export default MiniTvDetails





