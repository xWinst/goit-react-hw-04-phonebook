import React from 'react';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

export default class ContactForm extends React.Component {
    state = {
        name: '',
        number: '',
    };

    submitData = event => {
        event.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
        this.reset();
    };

    saveData = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    reset = () => {
        this.setState({ name: '', number: '' });
    };

    render() {
        return (
            <form className={s.form} onSubmit={this.submitData}>
                <label className={s.label}>
                    <span className={s.label__text}>Name</span>
                    <input
                        className={s.input}
                        type="text"
                        value={this.state.name}
                        onChange={this.saveData}
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
                        value={this.state.number}
                        onChange={this.saveData}
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
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
