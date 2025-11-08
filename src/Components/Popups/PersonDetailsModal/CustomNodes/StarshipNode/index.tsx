import React, { FC, memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "./styles.module.scss";
import { Starship } from "@/types/type";
import cx from "classnames";

const StarshipNode: FC<NodeProps<Starship>> = ({ data }) => {
  return (
    <div className={cx(styles.container)}>
      <Handle type="target" position={Position.Left} />

      <div className={styles.container__label}>Starship: {data.name}</div>
      <ul className={styles.details}>
        <li>Model: {data.model}</li>
        <li>Manufacturer: {data.manufacturer}</li>
        <li>Cost: {data.cost_in_credits} credits</li>
      </ul>
    </div>
  );
};

export default memo(StarshipNode);
