import { Skeleton } from '@mui/material';

export default function SkeletonUi({
  width,
  height,
  bgColor = 'grey.900',
}: {
  width: string | number;
  height: string | number;
  bgColor?: string;
}) {
  return (
    <Skeleton
      variant="rectangular"
      animation="pulse"
      sx={{
        bgcolor: bgColor,
        borderRadius: '3px',
      }}
      width={width}
      height={height}
    />
  );
}
