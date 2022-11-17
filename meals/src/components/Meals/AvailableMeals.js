import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchMeals = async () => {
    const response = await fetch(
      "https://react-projects-37027-default-rtdb.firebaseio.com/meals.json"
    );

    if (!response.ok) {
      throw new Error("http error");
    }
    const responseData = await response.json();

    const loadedMeals = [];
    for (const key in responseData) {
      loadedMeals.push({
        id: key,
        description: responseData[key].description,
        name: responseData[key].name,
        price: responseData[key].price,
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
