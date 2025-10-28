import React, { FC } from 'react';
import styles from './styles.module.scss';
import PlacesAutocomplete from '../UI/PlacesAutocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { CityForm } from '@/pages';

interface Props {
    onSubmit: (data: CityForm) => void;
    city: string | undefined;
}

const SearchCity: FC<Props> = ({ onSubmit, city }) => {

    const { control, handleSubmit } = useFormContext<CityForm>();

    return (
        <div className={styles.container} >
            <Controller
                name="coord"
                control={control}
                render={({ field: { onChange } }) => (
                    <PlacesAutocomplete
                        defaultValue={city}
                        onSelectCityCoordinates={(lat, lng) => {
                            onChange({ lat, lon: lng });
                        }}
                    />
                )}
            />

            <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
                className={styles.button}
            >
                Search
            </Button>
        </div>
    )
}
export default SearchCity;