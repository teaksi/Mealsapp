import React from 'react'
import { useGlobalContext } from '../context/context'
import SingleMeal from './SingleMeal';

const Meals = () => {
    const {meals, loading} = useGlobalContext();
    if(loading) {
        return <section className='section'>
            <h4>loading....</h4>
        </section>
    }

    if(meals.length < 1) {
        return <section className='section'>
            <h4>No meals matched your search term. Please try again.</h4>
        </section>
    }
    
    return <section className='section-center'>
        {meals.map((meal)=>{
            const {idMeal, strMeal: title, strMealThumb: image} = meal;
            return<SingleMeal idMeal={idMeal} image={image}  title={title}/>
            
        })} 
    </section>
}

export default Meals
