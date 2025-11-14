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
        <li>Hair Color: {person?.hairColor}</li>
        <li>Skin Color: {person?.skinColor}</li>
        <li>Eye Color: {person?.eyeColor}</li>
        <li>Birth Year: {person?.birthYear}</li>
        <li>Gender: {person?.gender}</li>
      </ul>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

export default memo(HeroNode);
