import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPersonsOperation } from "@/store/starWars/starWarsOperations";
import StarWarsTemplate from "@/Templates/StarWarsTemplate";
import { Person, StarWarsPagination } from "@/types/type";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useMemo } from "react";

interface StarWarsContextProps {
  persons: Person[];
  pagination: StarWarsPagination | null;
  paginationHandler: (page: number) => void;
  query: QueryParams;
}

interface QueryParams {
  page?: string;
}

interface PageProps {
  query: QueryParams;
}

// Context to share Star Wars data and handlers
export const StarWarsContext = createContext<StarWarsContextProps | null>(null);

const StarWars: NextPage<PageProps> = ({ query }) => {
  // Select persons and pagination from Redux store
  const { persons, pagination } = useAppSelector(
    (state) => state.starWarsSlice
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  // Change page in URL, optionally replace history entry
  const paginationHandler = useCallback(
    (page: number, isReplace?: boolean) => {
      router[isReplace ? "replace" : "push"]({
        pathname: router.pathname,
        query: { page: String(page) },
      });
    },
    [router]
  );

  // Memoize context value to avoid unnecessary renders
  const value = useMemo(
    () => ({
      query,
      persons,
      pagination,
      paginationHandler,
    }),
    [query, persons, pagination, paginationHandler]
  );

  // Load persons data when page changes
  useEffect(() => {
    if (!query.page) {
      paginationHandler(1, true);
      return;
    }
    dispatch(getPersonsOperation(Number(query.page)));
  }, [dispatch, query, router, paginationHandler]);

  return (
    <StarWarsContext.Provider value={value}>
      <StarWarsTemplate />
    </StarWarsContext.Provider>
  );
};

// Pass query params from server side to props
export const getServerSideProps = async ({ query }: PageProps) => {
  return {
    props: {
      query,
    },
  };
};

export default StarWars;
