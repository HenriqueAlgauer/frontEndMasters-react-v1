import { createLazyFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import postContact from '../api/postContact'

export const Route = createLazyFileRoute('/contact')({
  component: ContactRoute
})

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (event) {
      event.preventDefault();
      const formData = new FormData(event.target)
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message")
      )
    }
  })

  if (mutation.isError) {
    return <h1>lol no</h1>
  }

  return (
    <div className='contact'>
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted</h3>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input type="text" name='name' placeholder='Name' />
          <input type="email" name='email' placeholder='Email' />
          <textarea name='message' placeholder='Message'></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  )
}