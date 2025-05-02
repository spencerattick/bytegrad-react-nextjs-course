import { useEffect, useState } from "react";
import { JobItem } from "../lib/types";
import { BASE_API_URL } from "./constants";

export function useJobItem(id: number | null) {
     const [jobItem, setJobItem] = useState(null);
    
      useEffect(() => {
        const fetchData = async () => {
          if (!id) return;
          const response = await fetch(`${BASE_API_URL}/${id}`);
          const data = await response.json();
          setJobItem(data.jobItem);
        }
        fetchData();

       
      }, [id]);
        return jobItem;
}

export function useActiveId() {
    const [activeId, setActiveId] = useState<number | null>(null);
    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };
        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);
    return activeId;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_API_URL}?search=${searchText}`
      );
      const data = await res.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);
  return [ jobItemsSliced, isLoading ] as const;
}
