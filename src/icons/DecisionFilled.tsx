import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDecisionFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 28 29"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="currentColor" height={28} rx={14} width={28} y={0.5} />
    <path
      d="M19.625 15.625a2.25 2.25 0 0 0-2.17 1.688h-2.33a1.69 1.69 0 0 1-1.688-1.688v-2.25a2.8 2.8 0 0 0-.577-1.687h4.595a2.25 2.25 0 1 0 0-1.126h-6.91a2.25 2.25 0 1 0 0 1.126h.08a1.69 1.69 0 0 1 1.687 1.687v2.25a2.816 2.816 0 0 0 2.813 2.813h2.33a2.247 2.247 0 1 0 2.17-2.813m0-5.625a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25m-11.25 2.25a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25M19.625 19a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25"
      fill="#fff"
    />
  </svg>
);
const Memo = memo(SvgDecisionFilled);
export default Memo;
