import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgLineEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="m228.404 75.517 51.524 51.524-11.314 11.314-40.21-40.21-51.338 51.338-56.994-56.995 11.314-11.314 45.68 45.681z"
      fill="#F5F5F5"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgLineEmptyState);
export default Memo;
