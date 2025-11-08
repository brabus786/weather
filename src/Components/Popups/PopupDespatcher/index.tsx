import React, { FC } from "react";
import PersonDetailsModal from "../PersonDetailsModal";
import { PopupData, PopupType } from "@/types/type";
import { useAppSelector } from "@/store/hooks";

const PopupDespatcher: FC = () => {
  const { popupsData } = useAppSelector((state) => state.popupsSlice);

  const popup: {
    [key in PopupType]: React.ComponentType<PopupData>;
  } = {
    person_details: PersonDetailsModal,
  };

  return (
    <>
      {popupsData.map((popupData, i) => {
        const PopupComponent = popup[popupData.name];
        return PopupComponent ? (
          <PopupComponent
            key={popupData.name}
            {...{ ...popupData, queue: i }}
          />
        ) : null;
      })}
    </>
  );
};
export default PopupDespatcher;
