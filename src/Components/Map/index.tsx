"use client";

import { FC } from 'react';
import styles from './styles.module.scss';
import GoogleMapReact from 'google-map-react';

interface Props {
    lat: number;
    lng: number;
}

const Marker = () => <div className={styles.marker} />;

const Map: FC<Props> = ({ lat, lng }) => {
    const defaultProps = {
        center: {
            lat: lat || 28.6139,
            lng: lng || 77.2090
        },
        zoom: 11
    };

    return (
        <div className={styles.container}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP || '' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
            >
                <Marker />
            </GoogleMapReact>
        </div>
    );
};

export default Map;
