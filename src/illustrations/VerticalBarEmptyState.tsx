import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVerticalBarEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M123 181.02v-58.419h39.455v58.419z" fill="#F2F2F2" />
    <path d="M180.273 181.02V43.98h39.454v137.04z" fill="#F5F5F5" />
    <path d="M237.545 181.02V68.069H277V181.02z" fill="#E1E1E1" />
  </svg>
);
const Memo = memo(SvgVerticalBarEmptyState);
export default Memo;
