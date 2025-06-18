import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgUnpin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M1.114.212 17.77 16.905l-.885.883-5.542-5.555-1.294 1.53 1.069 1.068-.869.888L6.7 12.18 1.131 17.75l-.881-.887L5.819 11.3 2.28 7.75l.882-.869L4.238 7.95l1.535-1.3L.23 1.096zm5.544 7.326 3.8 3.808-1.295 1.529-4.038-4.037z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="m16.125 6.581-3.161 3.738-.884-.886 3.17-3.74-2.944-2.943-3.735 3.167-.884-.885 3.732-3.157-.738-.737L11.5.25l6.25 6.188-.881.88z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgUnpin);
export default Memo;
