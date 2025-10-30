"use client";

import { FC } from 'react';
import styles from './styles.module.scss';
import GoogleMapReact from 'google-map-react';

interface Props {
    lat?: number | string;
    lng?: number | string;
    markerText?: string;
}

const Marker: FC<{ text?: string }> = ({ text }) => (
    <div className={styles.marker}>
        {text || ''}
    </div>
);

const Map: FC<Props> = ({ lat, lng, markerText }) => {
    const centerLat = Number(lat) || 28.6139;
    const centerLng = Number(lng) || 77.2090;

    const defaultProps = {
        center: {
            lat: centerLat,
            lng: centerLng
        },
        zoom: 11
    };

    return (
        <div className={styles.container}>
            <GoogleMapReact
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
            >
                <Marker text={markerText} />
            </GoogleMapReact>
        </div>
    );
};

export default Map;