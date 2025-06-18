import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgExternalLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.23 21H4.386A1.386 1.386 0 0 1 3 19.615V5.77a1.386 1.386 0 0 1 1.385-1.385h6.923V5.77H4.385v13.846H18.23v-6.923h1.384v6.923A1.386 1.386 0 0 1 18.231 21"
      fill="currentColor"
    />
    <path
      d="M14.077 3v1.385h4.56l-5.945 5.944.98.979 5.943-5.944v4.56H21V3z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgExternalLink);
export default Memo;
