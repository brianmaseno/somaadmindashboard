import PropTypes from "prop-types";

const SelectGrade = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Grade</option>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((grade) => (
        <option key={grade} value={grade}>
          Grade {grade}
        </option>
      ))}
    </select>
  );
};

SelectGrade.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectGrade;
