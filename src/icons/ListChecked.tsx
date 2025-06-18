import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgListChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.5 16.749H12v1.5h10.5zM10.5 14.799l-1.05-1.05-4.95 4.95-1.95-1.95-1.05 1.05 3 3zM22.5 6.249H12v1.5h10.5zM10.5 4.299l-1.05-1.05-4.95 4.95-1.95-1.95-1.05 1.05 3 3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgListChecked);
export default Memo;
