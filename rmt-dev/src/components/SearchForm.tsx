import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {

  const {searchText, handleChangeSearchText} = useSearchTextContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.target.value);
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
