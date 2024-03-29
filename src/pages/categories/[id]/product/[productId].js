import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import { single_ProductBy_Id } from 'src/store/features/productAndcategorySlice'
import { Card, Typography,CardActions,CardContent,CardMedia,Button, Box } from '@mui/material';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

const productDetails = () => {
    const router = useRouter();
    const productId = router.query.productId;
    console.log('/',productId);
    const dispatch = useDispatch();

    const { singleProduct:{productDetails, loading, status,message} } = useSelector(state => state.productAndcategoryData)
    console.log('productDetails----productDetails------------',productDetails);


    useEffect(() => {
      if(productId){
        dispatch(single_ProductBy_Id(productId))
      }
     
    }, [productId])





  return (
    <>
     <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }} >
        <span style={{cursor:"pointer"}} onClick={() => router.back()} title="go back"><TurnLeftIcon /> &nbsp; Product Details</span>
      </Typography>
      <Card sx={{ maxWidth: 1100 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }} >Product Name:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.productName}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Brand:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.productBrand}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Container Type:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.containerType}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Container Size:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.containerSize}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Cleaner Form:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.cleanerForm}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>UPC Code:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.upcCode}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>SKU Code:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.skuCode}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>MRP:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.productMRP}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Price:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.productPrice}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Quantity:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.quantity}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Discount:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.discount}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Status:<Box component='span' sx={{ marginLeft:"15px" }}>{(productDetails?.isActive)?.toString()?.toUpperCase()}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>createdDate:<Box component='span' sx={{ marginLeft:"15px" }}>{ (productDetails?.createdDate ? productDetails?.createdDate.split('T')[0] : 'N/A')}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>updatedDate:<Box component='span' sx={{ marginLeft:"15px" }}>{ (productDetails?.updatedDate ? productDetails?.updatedDate.split('T')[0] : 'N/A')}</Box></Typography>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>Description:<Box component='span' sx={{ marginLeft:"15px" }}>{productDetails?.productDescription}</Box></Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 440 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
    </Card>
    </>
  )
}

export default productDetails





