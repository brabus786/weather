import { Task } from "@/types/type";
import { Typography } from "@mui/material";
import cx from "classnames";
import Router from "next/router";
import { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  tasks: Task[];
}

const HomeTemplate: FC<Props> = ({ tasks }) => {
  return (
    <div className={cx("container", styles.container)}>
      <h1>Welcome to the Tasks Page</h1>
      <div className={styles.content}>
        {tasks.map((task) => (
          <div
            onClick={() => Router.push(task.url)}
            className={styles.task}
            key={task.url}
          >
            <Typography variant="h5" component="h2">
              {task.title}
            </Typography>
            <Typography variant="body1">{task.description}</Typography>
            <Typography variant="body2">
              Finished at: {task.finishedAt}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeTemplate;
