import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m20.586 11.332-16.5-8.25a.75.75 0 0 0-.809.09.75.75 0 0 0-.246.75L5.25 12 3 20.055a.75.75 0 0 0 .75.945.7.7 0 0 0 .336-.082l16.5-8.25a.747.747 0 0 0 0-1.336m-15.672 7.5L6.57 12.75h6.93v-1.5H6.57L4.914 5.168 18.57 12Zm0 0"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgSend);
export default Memo;
