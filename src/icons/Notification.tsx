import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m21.53 14.47-2.03-2.03V9.75a7.51 7.51 0 0 0-6.75-7.462V.75h-1.5v1.538A7.51 7.51 0 0 0 4.5 9.75v2.69l-2.03 2.03a.75.75 0 0 0-.22.53v2.25A.75.75 0 0 0 3 18h5.25v.583a3.864 3.864 0 0 0 3.375 3.899 3.754 3.754 0 0 0 4.125-3.732V18H21a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.22-.53m-7.28 4.28a2.25 2.25 0 0 1-4.5 0V18h4.5zm6-2.25H3.75v-1.19l2.03-2.03a.75.75 0 0 0 .22-.53v-3a6 6 0 1 1 12 0v3c0 .199.08.39.22.53l2.03 2.03z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgNotification);
export default Memo;
