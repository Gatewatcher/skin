import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12 4.89 2.07 4.185.345.75.75.113 4.62.667L16.5 13.83l-.562.547.135.75.787 4.598-4.132-2.168L12 17.25l-.697.367-4.133 2.138.75-4.597.135-.75-.555-.578-3.315-3.262 4.62-.668.75-.113.345-.75zm0-3.39L8.588 8.415.96 9.518l5.52 5.384L5.175 22.5 12 18.915l6.825 3.585-1.305-7.597 5.52-5.378-7.627-1.11z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgStar);
export default Memo;
