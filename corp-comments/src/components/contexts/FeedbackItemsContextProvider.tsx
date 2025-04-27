import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../../lib/types";
import { useFeedbackItems } from "../../lib/hooks";

type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddFeedback: (text: string) => void;
  handleCompanyClick: (company: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();
  const [selectedCompany, setSelectedCompany] = useState("");

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedbackItems]
  );
  //     .split(" ")
  //     .find((word) => word.startsWith("#"))!
  //     .substring(1);

  //   const newItem: TFeedbackItem = {
  //     id: new Date().getTime(),
  //     badgeLetter: companyName?.substring(0, 1).toUpperCase(),
  //     company: companyName,
  //     daysAgo: 0,
  //     text,
  //     upvoteCount: 0,
  //   };
  //   setFeedbackItems([...feedbackItems, newItem]);
  //   await fetch(
  //     "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(newItem),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  // };

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter((item) => item.company === selectedCompany)
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        handleCompanyClick,
        isLoading,
        errorMessage,
        companyList,
        handleAddFeedback,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
