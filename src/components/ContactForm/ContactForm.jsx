import { useState } from 'react';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit }) => {
    const [contact, setContact] = useState({ name: '', number: '' });

    const submitData = event => {
        event.preventDefault();
        onSubmit(contact);
        setContact({ name: '', number: '' });
    };

    const saveData = event => {
        const { name, value } = event.target;
        setContact(state => ({ ...state, [name]: value }));
    };

    return (
        <form className={s.form} onSubmit={submitData}>
            <label className={s.label}>
                <span className={s.label__text}>Name</span>
                <input
                    className={s.input}
                    type="text"
                    value={contact.name}
                    onChange={saveData}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                <FaUser className={s.icon} size="15" />
            </label>
            <label className={s.label}>
                <span className={s.label__text}>Number</span>
                <input
                    className={s.input}
                    type="tel"
                    value={contact.number}
                    onChange={saveData}
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <FaPhoneAlt className={s.icon} size="15" />
            </label>
            <button className={s.button} type="submit">
                Add contact
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
