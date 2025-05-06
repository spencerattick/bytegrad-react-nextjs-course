export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
  daysAgo: number;
};

export type jobItemsExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  salary: string;
  duration: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
}

export type SortBy = "relevant" | "recent";

export type PageDirection = "next" | "previous";
