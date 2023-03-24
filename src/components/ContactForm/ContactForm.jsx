import { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export const ContactForm = (props) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'number':
                setNumber(value)
                break
            default:
                return
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSubmit({ name, number })
        setName('')
        setNumber('')
        e.currentTarget.reset()
    }

    return (
        <Form id="contact" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label> Name </Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label> Number </Form.Label>
                <Form.Control
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}





// const INITIAL_STATE = {
//     name: '',
//     number: ''
// }
// export default class ContactForm extends Component {
//     static propTypes = {
//         onSubmit: PropTypes.func.isRequired,
//     }

//     state = { ...INITIAL_STATE }

//     handleChange = (e) => {
//         const { name, value } = e.target
//         this.setState({ [name]: value })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         const contact = this.state
//         this.props.onSubmit(contact)
//         this.reset(e)
//     }

//     reset = (e) => {
//         this.setState({
//             ...INITIAL_STATE
//         })
//         e.currentTarget.reset()
//     }

//     render() {
//         return (
//             <Form id="contact" onSubmit={this.handleSubmit}>
//                 <Form.Group className="mb-3" >
//                     <Form.Label> Name </Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                         required
//                         onChange={this.handleChange}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" >
//                     <Form.Label> Number </Form.Label>
//                     <Form.Control
//                         type="tel"
//                         name="number"
//                         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                         required
//                         onChange={this.handleChange}
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">Submit</Button>
//             </Form>
//         )
//     }
// }
