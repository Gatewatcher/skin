import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgHorizontalBarEmptyState = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 400 225"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M122.968 47.772h122.24v33.166h-122.24z" fill="#F2F2F2" />
    <path d="M122.968 95.917h154.064v33.166H122.968z" fill="#F5F5F5" />
    <path d="M122.968 144.062h94.95v33.166h-94.95z" fill="#E1E1E1" />
  </svg>
);
const Memo = memo(SvgHorizontalBarEmptyState);
export default Memo;
