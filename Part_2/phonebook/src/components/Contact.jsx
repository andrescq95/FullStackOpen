const Contact = ({ contact, handleDeleteContact }) => {
    return (
      <li className='contact'>
        {contact.name} {contact.number}
        <button onClick={handleDeleteContact}>delete</button>
      </li>
    )
  }

  export default Contact