/**
 * Custom hook for handling infinite loading in virtualized lists.
 * 
 * @param data - The query data
 * @param displayCount - The current count of displayed items
 * @param setDisplayCount - Setter for updating the display count
 * @param hasNextPage - Whether there is another page to fetch
 * @param isFetchingNextPage - Loading state for next page
 * @param fetchNextPage - Function to fetch next page
 * @returns A handler function to be called onItemsRendered
 */

import type { Dispatch, SetStateAction } from "react";

type UseInfiniteVirtualLoaderProps = {
  data: any;
  displayCount: number;
  setDisplayCount: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  itemsPerPage: number;
};

export const useInfiniteVirtualLoader = ({
  data,
  displayCount,
  setDisplayCount,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  itemsPerPage,
}: UseInfiniteVirtualLoaderProps) => {
  return (visibleStopIndex: number, totalItems: number) => {
    
    if (visibleStopIndex < totalItems - 1) return;

    if (!data?.results) return;

    const moreItemsInCache = displayCount < data.results.length;
    const noMoreItemsInCache = displayCount >= data.results.length;

    if (moreItemsInCache) {
      setDisplayCount((prev) => prev + itemsPerPage);
    } else if (noMoreItemsInCache && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
};