import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgAttachment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.075 14.175 9.825 2.925C7.95.975 4.875.975 2.925 2.85s-1.95 5.025 0 6.9L3 9.825 5.1 12l1.05-1.05-2.175-2.175C2.7 7.5 2.7 5.325 3.975 4.05S7.425 2.7 8.7 3.975l.075.075L19.95 15.225c1.35 1.275 1.35 3.45.075 4.725-1.275 1.35-3.45 1.35-4.725.075l-.075-.075-5.55-5.55c-.75-.75-.675-1.95 0-2.625a1.954 1.954 0 0 1 2.625 0l3.075 3.075 1.05-1.05-3.15-3.15a3.33 3.33 0 0 0-4.725.15c-1.2 1.275-1.2 3.3 0 4.65l5.625 5.625c1.875 1.95 4.95 1.95 6.9.075s1.95-5.025 0-6.975c0 .075 0 0 0 0"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgAttachment);
export default Memo;
