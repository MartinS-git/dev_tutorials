import "./search-box.styles.css";

function SearchBox({ placeholder, onChange }) {
  return (
    <input
      className='search-box'
      type='search'
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default SearchBox;
