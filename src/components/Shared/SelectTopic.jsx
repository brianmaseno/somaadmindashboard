import PropTypes from "prop-types";

const SelectTopic = ({ value, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select Topic</option>
      {/* Populate topics dynamically based on the selected subject */}
      <option value="algebra">Algebra</option>
      <option value="geometry">Geometry</option>
      {/* Add more topics as needed */}
    </select>
  );
};

SelectTopic.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectTopic;
