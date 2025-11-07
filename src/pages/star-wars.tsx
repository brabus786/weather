import { getPersonsOperation } from '@/store/starWars/starWarsOperations';
import StarWarsTemplate from '@/Templates/StarWarsTemplate';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Person, StarWarsPagination } from '@/types/type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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
    query: QueryParams
}

export const StarWarsContext = createContext<StarWarsContextProps | null>(null);

const StarWars: NextPage<PageProps> = ({ query }) => {

    const { persons, pagination } = useAppSelector((state) => state.starWarsSlice);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const paginationHandler = useCallback((page: number) => {
        router.push({
            pathname: router.pathname,
            query: { page: String(page) },
        });
    }, [router]);

    const value = useMemo(() => ({
        query, persons, pagination, paginationHandler
    }), [query, persons, pagination, paginationHandler]);

    useEffect(() => {
        if (!query.page) {
            paginationHandler(1);
            return;
        };
        dispatch(getPersonsOperation(Number(query.page)));
    }, [dispatch, query, router, paginationHandler]);

    return (
        <StarWarsContext.Provider value={value}>
            <StarWarsTemplate />
        </StarWarsContext.Provider>
    )
}

export const getServerSideProps = async ({ query }: PageProps) => {
    return {
        props: {
            query
        },
    };
};

export default StarWars;