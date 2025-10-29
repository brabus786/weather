import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';
import { useEffect } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  mainColor?: string;
  secondaryColor?: string;
}

export default function LinearProgressComponent({
  className,
  style,
  height,
  mainColor = '#1B1B1D',
  secondaryColor = '#e7e8ee',
}: Props) {

  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 40;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }} className={className} style={style}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          backgroundColor: secondaryColor,
          height,
          [`& span`]: {
            backgroundColor: mainColor,
          },
        }}
      />
    </Box>
  );
}
