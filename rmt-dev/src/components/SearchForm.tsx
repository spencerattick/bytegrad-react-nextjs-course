type SearchFormProps = {
  searchText: string; 
  setSearchText: (searchText: string) => void;
}

export default function SearchForm({searchText, setSearchText}: SearchFormProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <form action="#" className="search" onSubmit={(e) => e.preventDefault()}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleInputChange}
        value={searchText}
      />
    </form>
  );
}
