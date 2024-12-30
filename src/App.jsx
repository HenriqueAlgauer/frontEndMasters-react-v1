import { createRoot } from "react-dom"
import Pizza from "./Pizza"

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza name="Pepperoni" description="pepperoni, cheese" image={"/public/pizzas/pepperoni.webp"} />
      <Pizza name="Cheese" description="cheese" image={"/public/pizzas/hawaiian.webp"} />
      <Pizza name="Chicken" description="chicker, cheese" image={"/public/pizzas/big_meat.webp"} />
    </div>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)