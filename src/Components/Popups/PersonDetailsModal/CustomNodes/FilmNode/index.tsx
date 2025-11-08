// src/components/FilmNode.tsx
import React, { FC, memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import styles from "./styles.module.scss";
import { Film } from "@/types/type";
import cx from "classnames";

const FilmNode: FC<NodeProps<{ film: Film; isStarship: boolean }>> = ({
  data: { film, isStarship },
}) => {
  return (
    <div className={cx(styles.container)}>
      <Handle type="target" position={Position.Left} id="a" />

      <div className={styles.container__label}>Movie: {film.title}</div>
      <ul className={styles.details}>
        <li>Director: {film.director}</li>
        <li>Producer: {film.producer}</li>
        <li>Release Date: {film.release_date}</li>
      </ul>
      {isStarship && <Handle type="source" position={Position.Right} id="b" />}
    </div>
  );
};

export default memo(FilmNode);
