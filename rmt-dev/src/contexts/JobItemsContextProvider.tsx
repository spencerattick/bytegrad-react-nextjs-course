import { createContext, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemsContext = {
    jobItems: JobItem[] | undefined;
    jobItemsSortedAndSliced: JobItem[];
    isLoading: boolean;
    totalNumberOfResults: number;
    totalNumberOfPages: number;
    currentPage: number;
    sortBy: SortBy;
    handlePageChange: (direction: PageDirection) => void;
    handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const {debouncedSearchText} = useSearchTextContext()
    const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortBy>("relevant");
  
    const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      }
      if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }
      return 0;
    });
    const jobItemsSortedAndSliced = jobItemsSorted.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    );
    const totalNumberOfResults = jobItems?.length || 0;
    const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  
    const handlePageChange = (direction: PageDirection) => {
      if (direction === "next") {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "previous") {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    };
  
    const handleChangeSortBy = (newSortBy: SortBy) => {
      setCurrentPage(1);
      setSortBy(newSortBy);
    };
  

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        jobItemsSortedAndSliced,
        isLoading,
        totalNumberOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handlePageChange,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
