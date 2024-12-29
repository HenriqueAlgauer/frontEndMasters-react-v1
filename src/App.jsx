import { createRoot } from "react-dom"
import Pizza from "./Pizza"

const App = () => {
  return (
    <div>
      <h1>Padre Gino's - Order Now</h1>
      <Pizza name="Pepperoni" description="pepperoni, cheese" />
      <Pizza name="Cheese" description="cheese" />
      <Pizza name="Chicken" description="chicker, cheese" />
    </div>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)