export default async function postContact(name, email, message) {
  await new Promise((resolve) => setTimeout(resolve, 10000))
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })

  if (!response.ok) {
    throw new Error("Network response was not ok. Send help")
  }

  return response.json()
}

