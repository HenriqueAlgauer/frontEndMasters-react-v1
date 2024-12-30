import { useState, useEffect, useContext } from "react";
import Pizza from "./Pizza";
import Cart from "./Cart"
import { CartContext } from "./contexts";

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})

export default function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState("pepperoni")
  const [pizzaSize, setPizzaSize] = useState("M")
  const [cart, setCart] = useContext(CartContext)
  const [loading, setLoading] = useState(true)

  async function checkout() {
    setLoading(true)

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart })
    })

    setCart([])
    setLoading(false)
  }

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
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={(event) => {
          event.preventDefault();
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
        }}>
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
          </div>
          {
            loading ? (
              <h1>Loading pizza lol</h1>
            ) : (
              <div className="order-pizza">
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </div>
            )
          }
        </form >
      </div >
      {
        loading ? <h2>Loading ...</h2> : <Cart checkout={checkout} cart={cart} />
      }
    </div>
  )
}