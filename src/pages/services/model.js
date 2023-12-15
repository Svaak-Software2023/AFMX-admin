import React, { useState } from 'react'

const FormComponent = () => {
  const [isFormVisible, setFormVisible] = useState(false)

  const handleButtonClick = () => {
    setFormVisible(true)
  }

  const handleFormSubmit = event => {
    // Handle form submission logic here
    event.preventDefault()

    // Hide the form after submission
    setFormVisible(false)
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Open Form</button>
      {isFormVisible && (
        <div>
          <form onSubmit={handleFormSubmit}>
            {/* Your form fields go here */}
            <label>
              Name:
              <input type='text' name='name' />
            </label>
            <br />
            <label>
              Email:
              <input type='email' name='email' />
            </label>
            <br />
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default FormComponent
