import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgAction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M16.244 1.973a.75.75 0 0 1 .37.821l-1.31 5.801h3.607a.75.75 0 0 1 .595 1.207L9.703 22.577a.75.75 0 0 1-1.337-.571l1.377-8.887H6.089a.75.75 0 0 1-.53-1.282l9.794-9.74a.75.75 0 0 1 .891-.124m-8.338 9.646h3.587l-1.196 7.72 7.093-9.244h-3.962l1.155-5.116z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgAction);
export default Memo;
