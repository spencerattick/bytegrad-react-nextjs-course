import HashTagItem from "./HashTagItem";

type HashTagListProps = {
  companyList: string[];
  handleCompanyClick: (company: string) => void;
};

export default function HashtagList({ companyList, handleCompanyClick }: HashTagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem key={company} company={company} handleCompanyClick={handleCompanyClick} />
      ))}
    </ul>
  );
}
