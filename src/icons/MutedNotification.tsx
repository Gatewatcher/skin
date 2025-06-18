import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMutedNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 12.44V9.75c0-1.174-.28-2.331-.812-3.377L22.5 2.561 21.44 1.5 1.5 21.44l1.06 1.06 4.5-4.5h1.19v.75a3.75 3.75 0 1 0 7.5 0V18H21a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.22-.53zm-5.25 6.31a2.25 2.25 0 0 1-4.5 0V18h4.5zm6-2.25H8.56l8.999-8.998c.29.714.44 1.477.441 2.248v3c0 .199.08.39.22.53l2.03 2.03zM5.78 13.28a.75.75 0 0 0 .22-.53v-3a6.007 6.007 0 0 1 6-6c1.361 0 2.682.469 3.74 1.326l1.07-1.07a7.45 7.45 0 0 0-4.06-1.718V.75h-1.5v1.538A7.51 7.51 0 0 0 4.5 9.75v2.69l-2.25 2.25 1.06 1.06z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgMutedNotification);
export default Memo;
