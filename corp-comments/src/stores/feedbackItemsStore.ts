import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
    feedbackItems: TFeedbackItem[];
    isLoading: boolean;
    errorMessage: string;
    selectedCompany: string;
    getCompanyList: () => string[];
    getFilteredFeedbackItems: () => TFeedbackItem[];
    addItemToList: (text: string) => Promise<void>;
    selectCompany: (company: string) => void;
    fetchFeedbackItems: () => Promise<void>;
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter((item) => item.company === state.selectedCompany)
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.startsWith("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      badgeLetter: companyName?.substring(0, 1).toUpperCase(),
      company: companyName,
      daysAgo: 0,
      text,
      upvoteCount: 0,
    };

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  },
  selectCompany: (company: string) => {
    // setSelectedCompany(company);
    set(() => ({ selectedCompany: company }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }
    set(() => ({
      isLoading: false,
    }));
  },
}));
