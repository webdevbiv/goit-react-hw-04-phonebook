import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { nanoid } from 'nanoid'

export const App = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  // useEffect(() => {
  //   const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  // }, [filter])

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
    console.log(contacts);
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
// export default class App extends Component {
//   state = {
//     contacts: [],
//     filter: ''
//   }


//   handleContactSubmit = ({ name, number }) => {
//     const contacts = this.state.contacts
//     if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
//       // alert(`${name} is already in the contacts.`);
//       toast.warn(`🦄 ${name} is already in the contacts.`, {
//         position: "top-center",
//         autoClose: false,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: false,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//     else {
//       const newContact = { name, number, id: nanoid(5) }
//       this.setState((prev) => ({ contacts: [newContact, ...prev.contacts] }))
//     }
//   }

//   componentDidMount() {
//     const localContacts = JSON.parse(localStorage.getItem('contacts'))
//     if (localContacts) {
//       this.setState({ contacts: localContacts })
//     }
//   }

//   componentDidUpdate(prevP, prevS) {
//     if (this.state.contacts !== prevS.contact) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   handleContactDelete = (id) => {
//     this.setState((prev) => ({ contacts: prev.contacts.filter(item => item.id !== id) }))
//   }

//   handleFilterChange = (e) => {
//     const { name, value } = e.target
//     this.setState({ [name]: value })
//   }

//   filteredContacts = () => {
//     const { contacts, filter } = this.state
//     return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
//   }

//   render() {
//     const { filter, contacts } = this.state
//     console.log('this', contacts.length);
//     return (
//       <div className={'container'}>
//         <ToastContainer
//           position="top-center"
//           autoClose={false}
//           newestOnTop
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable={false}
//           theme="light"
//         />
//         <h1 className={'title'}>Phonebook</h1>
//         <ContactForm onSubmit={this.handleContactSubmit} />
//         <h2 className={'title'}>Contacts</h2>
//         <>
//           <Filter onChange={this.handleFilterChange} />
//           <ContactList
//             contacts={filter.length > 0 ? contacts : this.filteredContacts()}
//             onDelete={this.handleContactDelete}
//           />
//         </>
//       </div>
//     )
//   }
// }
