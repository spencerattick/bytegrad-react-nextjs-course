import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";
import HashTagItem from "./HashTagItem";

export default function HashtagList() {
  const getCompanyList = useFeedbackItemsStore(store => store.getCompanyList());
  const selectCompany = useFeedbackItemsStore(store => store.selectCompany);
  return (
    <ul className="hashtags">
      {getCompanyList.map((company) => (
        <HashTagItem
          key={company}
          company={company}
          handleCompanyClick={selectCompany}
        />
      ))}
    </ul>
  );
}
