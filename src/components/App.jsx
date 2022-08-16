import React from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
// import startContacts from '../contacts.json';

export default class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const listContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts: listContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
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
      this.setState(prevState => ({
        contacts: [{ ...contact, id: nanoid() }, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactToDelete => {
    console.log(contactToDelete);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactToDelete
      ),
    }));
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    return (
      <div
        style={{
          height: '100vh',
          padding: '20px',
          fontSize: 24,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2 style={{ margin: '20px' }}>Contacts</h2>
        <Filter onChange={this.filterContacts} />
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
