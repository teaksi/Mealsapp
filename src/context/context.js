import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {
    const getFavFromLocalStorage = () => {
        let favorites = localStorage.getItem('favorites');
        if (favorites) {
            favorites = JSON.parse(localStorage.getItem('favorites'))
        }
        else {
            favorites = []
        }
        return favorites;
    }
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavFromLocalStorage());

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            // console.log(data.meals);
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        }
        else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true);
    }

    const closeModal = (idMeal) => {
        setShowModal(false);
    }

    const addToFavorites = (idMeal) => {
        const alreadyFav = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFav) return;
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const updateFav = [...favorites, meal];
        setFavorites(updateFav);
        localStorage.setItem("favorites", JSON.stringify(updateFav));
    }

    const removeFromFavorites = (idMeal) => {
        const updateFav = favorites.filter((meal) => meal.idMeal !== idMeal)
        setFavorites(updateFav);
        localStorage.setItem("favorites", JSON.stringify(updateFav));
    }

    useEffect(() => {
        fetchMeals(allMealsUrl);
    }, []);

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    }, [searchTerm]);

    return <AppContext.Provider value={{ meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites }} >
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider } 