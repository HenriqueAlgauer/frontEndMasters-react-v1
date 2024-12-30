import { useState, useEffect } from "react";
import Pizza from "./Pizza";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState("pepperoni")
  const [pizzaSize, setPizzaSize] = useState("M")
  const [loading, setLoading] = useState(true)

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }

  async function fetchPizzaTypes() {
    const pizzaRes = await fetch("/api/pizzas")
    const pizzaJson = await pizzaRes.json()
    setPizzaTypes(pizzaJson)
    setLoading(false)
  }

  useEffect(() => {
    fetchPizzaTypes(pizzaSize)
  }, [])

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form action="">
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(event) => setPizzaType(event.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div

          >
            <label htmlFor="pizza-size">Pizza size</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(event) => setPizzaSize(event.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
          <div className="order-pizza">
            {
              loading ? <h1>Loading pizza lol</h1> : (
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
              )
            }
            <p>{price}</p>
          </div>
        </div>
      </form>
    </div>
  )
}