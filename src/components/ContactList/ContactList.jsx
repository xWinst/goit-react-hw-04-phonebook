import { RiDeleteBin5Line } from 'react-icons/ri';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDelete }) => {
    return contacts.length > 0 ? (
        <ul className={s.list}>
            {contacts.map(({ name, number, id }) => (
                <li className={s.item} key={id}>
                    <p>
                        {name} : {number}
                    </p>
                    <button
                        className={s.button}
                        type="button"
                        title="delete contact"
                        onClick={() => onDelete(id)}
                    >
                        <RiDeleteBin5Line size="25" />
                    </button>
                </li>
            ))}
        </ul>
    ) : (
        <div className={s.list}>You haven't contacts yet</div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactList;
