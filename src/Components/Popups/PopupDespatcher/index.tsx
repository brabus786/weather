import React, { FC } from 'react';
import HeroDetailsModal from '../HeroDetailsModal';
import { PopupData, PopupType } from '@/types/type';
import { useAppSelector } from '@/store/hooks';


const PopupDespatcher: FC = () => {

    const { popupsData } = useAppSelector((state) => state.popupsSlice);

    const popup: {
        [key in PopupType]: React.ComponentType<PopupData>
    } = {
        hero_details: HeroDetailsModal
    }

    return (
        <>
            {popupsData.map((popupData, i) => {
                const PopupComponent = popup[popupData.name];
                return PopupComponent ? <PopupComponent key={popupData.name}  {...{ ...popupData, queue: i }} /> : null;
            })}
        </>
    )
}
export default PopupDespatcher;