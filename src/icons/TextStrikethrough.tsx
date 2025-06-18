import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTextStrikethrough = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21 11.497h-7.533c-.34-.093-.678-.174-1.004-.251-2.105-.498-3.297-.863-3.297-2.568a2.15 2.15 0 0 1 .59-1.608 3.6 3.6 0 0 1 2.26-.818c2.123-.052 3.102.667 3.902 1.763l1.21-.885a5.6 5.6 0 0 0-5.122-2.378 5.08 5.08 0 0 0-3.3 1.246 3.62 3.62 0 0 0-1.04 2.68 3.28 3.28 0 0 0 1.302 2.82H3v1.5h10.239c1.475.427 2.357.983 2.38 2.518a2.34 2.34 0 0 1-.647 1.794 4.37 4.37 0 0 1-2.79.937 4.97 4.97 0 0 1-3.859-2.018l-1.15.963a6.4 6.4 0 0 0 4.986 2.555h.075a5.75 5.75 0 0 0 3.786-1.364 3.8 3.8 0 0 0 1.098-2.89 3.7 3.7 0 0 0-.862-2.496H21z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTextStrikethrough);
export default Memo;
