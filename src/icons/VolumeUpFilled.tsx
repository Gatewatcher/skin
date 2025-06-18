import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVolumeUpFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m20.37 6.31-1.148.967a7.5 7.5 0 0 1-.217 9.922l1.103 1.05a9 9 0 0 0 .262-11.91z"
      fill="currentColor"
    />
    <path
      d="M16.185 9.249a4.5 4.5 0 0 1-.135 5.955l1.102 1.02a6 6 0 0 0 .173-7.943zM13.5 22.749a.75.75 0 0 1-.533-.225l-5.714-5.775H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h5.003l5.714-5.775a.75.75 0 0 1 1.058 0 .75.75 0 0 1 .225.525v19.5a.75.75 0 0 1-.75.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgVolumeUpFilled);
export default Memo;
