const Contact = ({ contact, handleDeleteContact }) => {
    return (
      <li>
        {contact.name} {contact.number}
        <button onClick={handleDeleteContact}>delete</button>
      </li>
    )
  }

  export default Contact