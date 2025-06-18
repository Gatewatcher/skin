import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgVolumeMuteFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m23.25 9.557-1.058-1.058-2.692 2.692L16.808 8.5 15.75 9.557l2.692 2.692-2.692 2.692L16.808 16l2.692-2.693L22.192 16l1.058-1.058-2.692-2.692zM13.5 22.749a.75.75 0 0 1-.533-.225l-5.714-5.775H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h5.003l5.714-5.775a.75.75 0 0 1 1.058 0 .75.75 0 0 1 .225.525v19.5a.75.75 0 0 1-.75.75"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgVolumeMuteFilled);
export default Memo;
