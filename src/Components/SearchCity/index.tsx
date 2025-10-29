import React, { FC } from 'react';
import styles from './styles.module.scss';
import PlacesAutocomplete from '../UI/PlacesAutocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { CityForm } from '@/pages';

interface Props {
    onSubmit: (data: CityForm) => void;
    city: string | undefined;
    isLoading: boolean;
}

const SearchCity: FC<Props> = ({ onSubmit, city, isLoading }) => {

    const { control, handleSubmit, watch } = useFormContext<CityForm>();

    const form = watch();

    return (
        <div className={styles.container} >
            <Controller
                name="city"
                control={control}
                render={({ field: { onChange } }) => (
                    <PlacesAutocomplete
                        defaultValue={city}
                        onSelectCity={(city) => {
                            onChange(city);
                        }}
                    />
                )}
            />

            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
                className={styles.button}
                disabled={!form.city || isLoading}
            >
                Weather for {form.city || '...'}
            </Button>
        </div>
    )
}
export default SearchCity;