import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgNotificationNew = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 12.44V10.5H18v2.25c0 .199.08.39.22.53l2.03 2.03v1.19H3.75v-1.19l2.03-2.03a.75.75 0 0 0 .22-.53v-3a5.989 5.989 0 0 1 9-5.188V2.884a7.4 7.4 0 0 0-2.25-.597V.75h-1.5v1.538A7.51 7.51 0 0 0 4.5 9.75v2.69l-2.03 2.03a.75.75 0 0 0-.22.53v2.25A.75.75 0 0 0 3 18h5.25v.75a3.75 3.75 0 1 0 7.5 0V18H21a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.22-.53zm-5.25 6.31a2.25 2.25 0 0 1-4.5 0V18h4.5z"
      fill="currentColor"
    />
    <path d="M19.5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgNotificationNew);
export default Memo;
