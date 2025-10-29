import React, { FC } from 'react';
import { Skeleton } from '@mui/material';
import cx from 'classnames';
import styles from './styles.module.scss';

type Variant =
  | 'circular'
  | 'rectangular'
  | 'rounded'
  | 'text';

interface SkeletonLoaderProps {
  isLoading: boolean;
  children?: React.ReactNode | string | null | number;
  height: number | string;
  width: number | string;
  indent?: number;
  variant?: Variant;
  className?: string;
  count?: number;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  isLoading,
  children,
  height,
  width,
  indent,
  variant,
  className,
  count,
}) => {
  const newArr = new Array(count || 1).fill(0);
  return (
    <div
      className={cx(styles.container, className)}
      style={{ marginBottom: indent }}
    >
      {isLoading ? (
        <>
          {newArr.map((_, index) => (
            <Skeleton
              variant={variant}
              height={height}
              width={width}
              key={`skeleton-${index}`}
            />
          ))}
        </>
      ) : (
        children
      )}
    </div>
  );
};
export default SkeletonLoader;
