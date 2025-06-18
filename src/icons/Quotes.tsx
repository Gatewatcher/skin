import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgQuotes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M6.813 8.605H3.59A4.92 4.92 0 0 1 5.72 5.247l.979-.656-.602-.908-.979.656a6.02 6.02 0 0 0-2.68 5.004v3.637a1.094 1.094 0 0 0 1.094 1.094h3.282a1.094 1.094 0 0 0 1.093-1.094V9.699a1.094 1.094 0 0 0-1.093-1.094M14.469 8.605h-3.221a4.92 4.92 0 0 1 2.127-3.358l.979-.656-.596-.908-.985.656a6.02 6.02 0 0 0-2.68 5.004v3.637a1.094 1.094 0 0 0 1.095 1.094h3.28a1.094 1.094 0 0 0 1.095-1.094V9.699a1.093 1.093 0 0 0-1.094-1.094" />
    </g>
  </svg>
);
const Memo = memo(SvgQuotes);
export default Memo;
