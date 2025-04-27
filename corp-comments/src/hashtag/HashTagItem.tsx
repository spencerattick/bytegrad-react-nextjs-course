type HashTagItemProps = {
    company: string;
    handleCompanyClick: (company: string) => void;
}

export default function HashTagItem({ company, handleCompanyClick }: HashTagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => {handleCompanyClick(company)}}>#{company}</button>
    </li>
  );
}
