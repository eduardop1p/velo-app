import { Skeleton } from '@mui/material';

export default function SkeletonUi({
  width,
  height,
  bgColor = 'grey.900',
  variant = 'rectangular',
  borderRadius = '5px',
}: {
  width: string | number;
  height: string | number;
  bgColor?: string;
  variant?: 'rectangular' | 'circular';
  borderRadius?: string;
}) {
  return (
    <Skeleton
      variant={variant}
      animation="pulse"
      sx={{
        bgcolor: bgColor,
        borderRadius: borderRadius,
      }}
      width={width}
      height={height}
    />
  );
}
