import { useFeedbackItemsContext } from "../lib/hooks";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const { companyList, handleCompanyClick } = useFeedbackItemsContext();
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          handleCompanyClick={handleCompanyClick}
        />
      ))}
    </ul>
  );
}
