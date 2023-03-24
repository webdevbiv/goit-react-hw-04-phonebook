import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid'

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? '',
  )
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleContactSubmit = ({ name, number }) => {
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      toast.warn(`🦄 ${name} is already in the contacts.`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      })
    }
    else {
      setContacts(prev => {
        return [{ id: nanoid(4), name, number }, ...prev]
      })
    }
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filteredContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()))
    return filteredContacts
  }

  const handleContactDelete = (id) => {
    setContacts((prev) => (prev.filter(item => item.id !== id)))
  }

  return (
    <div className={'container'}>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="light"
      />
      <h1 className={'title'}>Phonebook</h1>
      <ContactForm onSubmit={handleContactSubmit} />
      <h2 className={'title'}>Contacts</h2>
      <>
        <Filter onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts() !== '' ? filteredContacts() : contacts}
          onDelete={handleContactDelete}
        />
      </>
    </div>
  )
}

