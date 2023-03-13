import React from 'react'
import { BsHandThumbsUp } from 'react-icons/bs'
import { useGlobalContext } from '../context/context';

const SingleMeal = (props) => {
    const { selectMeal, addToFavorites } = useGlobalContext();
    let { idMeal, image, title } = props;
    return (
        <article className='simgle-meal'>
            <img src={image} alt="" className='img' onClick={() => selectMeal(idMeal)} />
            <footer>
                <h5>{title}</h5>
                <button className='like-btn' onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
            </footer>
        </article>
    )
}

export default SingleMeal
