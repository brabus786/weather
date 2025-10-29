import React, { FC, useEffect } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { List, ListItem, TextField } from "@mui/material";
import styles from "./styles.module.scss";

interface Props {
    onSelectCity?: (city: string) => void;
    onSelectCityCoordinates?: (lat: number, lng: number) => void;
    defaultValue?: string;
}

const PlacesAutocomplete: FC<Props> = ({ onSelectCity, onSelectCityCoordinates, defaultValue }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            types: ["(cities)"],
            language: "en",
        },
        debounce: 300,
    });

    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (!e.target.value) {
            if (onSelectCity) {
                onSelectCity('');
            }
            if (onSelectCityCoordinates) {
                onSelectCityCoordinates(0, 0);
            }
        }
    };

    const handleSelect = (suggestion: { description: string }) => async () => {
        const { description } = suggestion;

        try {
            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);
            const addressComponents = results[0].address_components;
            const city =
                addressComponents.find((c: {
                    types: string[];
                }) => c.types.includes("locality"))?.long_name ||
                addressComponents.find((c: {
                    types: string[];
                }) =>
                    c.types.includes("administrative_area_level_2")
                )?.long_name ||
                addressComponents.find((c: {
                    types: string[];
                }) =>
                    c.types.includes("administrative_area_level_1")
                )?.long_name ||
                description;

            setValue(city, false);
            if (onSelectCity) {
                onSelectCity(city);
            }
            if (onSelectCityCoordinates) {
                onSelectCityCoordinates(lat, lng);
            }
            clearSuggestions();

            console.log("📍 Coordinates:", { lat, lng });
            console.log("🏙️ City:", city);
        } catch (error) {
            console.error("😱 Error:", error);
        }
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text },
            } = suggestion;

            return (
                <ListItem
                    className={styles.suggestion}
                    key={place_id}
                    onClick={handleSelect(suggestion)}
                >
                    <strong>{main_text}</strong>
                </ListItem>
            );
        });

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue, false);
        }
    }, [defaultValue, setValue]);

    return (
        <div ref={ref} className={styles.container}>
            <TextField
                label="Search city"
                value={value}
                onChange={handleInput}
                disabled={!ready}
                fullWidth
                className={styles.textField}
            />

            {status === "OK" && <List className={styles.suggestions}>{renderSuggestions()}</List>}
        </div>
    );
};

export default PlacesAutocomplete;
