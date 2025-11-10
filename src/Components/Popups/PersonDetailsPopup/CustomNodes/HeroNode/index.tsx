import { FC, memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "./styles.module.scss";
import { Person } from "@/types/type";
import cx from "classnames";

const HeroNode: FC<NodeProps<Person>> = ({ data: person }) => {
  return (
    <div className={cx(styles.container)}>
      <div className={styles.container__label}>Character: {person?.name}</div>
      <ul className={styles.details}>
        <li>Height: {person?.height} cm</li>
        <li>Mass: {person?.mass} Kg</li>
        <li>Hair Color: {person?.hair_color}</li>
        <li>Skin Color: {person?.skin_color}</li>
        <li>Eye Color: {person?.eye_color}</li>
        <li>Birth Year: {person?.birth_year}</li>
        <li>Gender: {person?.gender}</li>
      </ul>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

export default memo(HeroNode);
