import { FC, useContext } from 'react';
import styles from './styles.module.scss';
import { StarWarsContext } from '@/pages/star-wars';
import { Pagination, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { addPopup } from '@/store/popups/popupsSlice';
import SkeletonLoader from '@/Components/SceletonLoader';
import { useProcessWatcher } from '@/hooks/useProcessWatcher';

const StarWarsTemplate: FC = () => {

    const dispatch = useAppDispatch();
    const isLoading = useProcessWatcher('get_persons');

    const context = useContext(StarWarsContext);
    if (!context) return null;

    const { persons, pagination, query, paginationHandler } = context;

    const count = pagination ? Math.ceil(pagination.count / 10) : 0;

    return (
        <div className={styles.container} >
            <Typography variant="h5" >
                Star Wars Characters
            </Typography>
            <div className={styles.container__list}>
                {persons.map((person) => (
                    <div
                        onClick={() => dispatch(addPopup({
                            name: 'hero_details',
                            popupData: person,
                        }))}
                        className={styles.person} key={person.id}>
                        <SkeletonLoader isLoading={isLoading} height={24} width={'100%'} variant='text' >
                            <Typography variant="body1" >{person.name}</Typography>
                        </SkeletonLoader>
                    </div>
                ))}
            </div>

            <Pagination
                count={count}
                page={query.page ? Number(query.page) : 1}
                onChange={(_e, page) => { paginationHandler(page) }}
                color="primary"
            />
        </div>
    )
}
export default StarWarsTemplate;