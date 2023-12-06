import React, { useEffect, useState } from 'react'
import { Stack, Rating } from "@mui/material"
function RatingComponent({ rating }) {
    const [ratingValue, setRatingValue] = useState(0);
    useEffect(() => {
        setRatingValue(Number(rating));
    }, [rating])
    return (
        <Stack spacing={2}>
            <Rating value={ratingValue} precision={0.5} readOnly size='medium'/>
        </Stack>
    )
}

export default RatingComponent
