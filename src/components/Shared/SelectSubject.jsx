import PropTypes from "prop-types";

const SelectSubject = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Subject</option>
      <option value="maths">Maths</option>
      <option value="science">Science</option>
      {/* Add more subjects as needed */}
    </select>
  );
};

SelectSubject.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectSubject;
