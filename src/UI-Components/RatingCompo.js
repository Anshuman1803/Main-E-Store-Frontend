import React, { memo } from 'react'
function RatingCompo({ rating }) {

    const ratingStar = Array.from({ length: 5 }, (ele, index) => {
        let number = index + 0.5;
        return (
            <React.Fragment key={index}>
                {
                    rating >= index + 1
                        ? <i className="fa-solid fa-star ratingICON"></i>
                        :
                        rating >= number
                            ? <i className="fa-solid fa-star-half-stroke ratingICON"></i>

                            : <i className="fa-regular fa-star ratingICON"></i>
                }
            </React.Fragment>
        )
    })
    return <div className='item_ratingContainer'>{ratingStar}</div>

}

export default memo(RatingCompo)
