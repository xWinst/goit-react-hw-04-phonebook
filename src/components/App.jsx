import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import initialContacts from '../contacts.json';

const App = () => {
    const [contacts, setContacts] = useState(
        () => JSON.parse(localStorage.getItem('contacts')) || initialContacts
    );
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = contact => {
        if (contacts.find(({ name }) => name === contact.name)) {
            Report.warning(
                `${contact.name} is already in contacts`,
                '',
                'I understand',
                {
                    width: '350px',
                    svgSize: '100px',
                    titleFontSize: '20px',
                    buttonFontSize: '20px',
                    borderRadius: '10px',
                }
            );
        } else {
            setContacts(state => [{ ...contact, id: nanoid() }, ...contacts]);
        }
    };

    const deleteContact = contactToDelete => {
        setContacts(state =>
            state.filter(contact => contact.id !== contactToDelete)
        );
    };

    const filterContacts = event => {
        setFilter(event.currentTarget.value.toLowerCase());
    };

    const visibleContacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter)
    );

    return (
        <div className="app">
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <h2 style={{ margin: '20px' }}>Contacts</h2>
            <Filter onChange={filterContacts} />
            <ContactList contacts={visibleContacts} onDelete={deleteContact} />
        </div>
    );
};

export default App;
