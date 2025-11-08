import cx from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import useOnclickOutside from "react-cool-onclickoutside";

interface PopupPropsWrapper {
  onClick: () => void;
  children: React.ReactNode;
  queue?: number;
}

const PopupWrapper: FC<PopupPropsWrapper> = ({ children, onClick, queue }) => {
  const ref = useOnclickOutside(() => {
    onClick();
  });

  return (
    <div
      className={cx(styles.container, {
        [styles.container_isFocused]: queue === 0,
      })}
    >
      <div ref={ref} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default PopupWrapper;
