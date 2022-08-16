import s from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onChange }) => {
    return (
        <div className={s.container}>
            <label className={s.label}>
                Find contacts by name
                <br />
                <input type="text" onChange={onChange} />
            </label>
        </div>
    );
};
export default Filter;

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
};
