"use client";

import { FC } from 'react';
import styles from './styles.module.scss';
import GoogleMapReact from 'google-map-react';

interface Props {
    lat?: number | string;
    lng?: number | string;
    markerText?: string; // если хотим текст внутри маркера
}

const Marker: FC<{ text?: string }> = ({ text }) => (
    <div className={styles.marker}>
        {text || ''}
    </div>
);

const Map: FC<Props> = ({ lat, lng, markerText }) => {
    // Приводим к числу, если придут строки или undefined
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


// "use client";

// import { FC } from 'react';
// import styles from './styles.module.scss';
// import GoogleMapReact from 'google-map-react';

// interface Props {
//     lat: number;
//     lng: number;
// }

// const Marker = () => <div className={styles.marker} />;

// const Map: FC<Props> = ({ lat, lng }) => {
//     const defaultProps = {
//         center: {
//             lat: lat || 28.6139,
//             lng: lng || 77.2090
//         },
//         zoom: 11
//     };

//     return (
//         <div className={styles.container}>
//             <GoogleMapReact
//                 //bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP || '' }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//                 yesIWantToUseGoogleMapApiInternals
//             >
//                 <Marker />
//             </GoogleMapReact>
//         </div>
//     );
// };

// export default Map;
