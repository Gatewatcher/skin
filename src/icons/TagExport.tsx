import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTagExport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m23.25 14.464-4.5-4.5-1.06 1.06 2.689 2.69H12.75v1.5h7.629l-2.69 2.69 1.061 1.06zM7.5 11.464a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0-.003 3 1.5 1.5 0 0 0 .003-3"
      fill="currentColor"
    />
    <path
      d="m15.795 19.714-2.252 2.25L3 11.42V3.964h7.456l5.25 5.25 1.061-1.06-5.25-5.25a1.5 1.5 0 0 0-1.061-.44H3a1.5 1.5 0 0 0-1.5 1.5v7.456c0 .398.158.78.44 1.06l10.543 10.545a1.5 1.5 0 0 0 2.121 0l2.251-2.25z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTagExport);
export default Memo;
