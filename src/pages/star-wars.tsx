import {
  StarWarsContext,
  StarWarsQueryParams,
} from "@/contexts/StarWarsContext";
import { useAppDispatch } from "@/store/hooks";
import { getPersonsOperation } from "@/store/starWars/starWarsOperations";
import StarWarsTemplate from "@/Templates/StarWarsTemplate";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";

interface PageProps {
  query: StarWarsQueryParams;
}

const StarWars: NextPage<PageProps> = ({ query }) => {
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
      paginationHandler,
    }),
    [query, paginationHandler]
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
