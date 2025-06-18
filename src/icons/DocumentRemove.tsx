import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDocumentRemove = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M22.5 18.578H15v1.5h7.5z" fill="currentColor" />
    <path
      d="M12 21.578H6v-18h6v4.5a1.504 1.504 0 0 0 1.5 1.5H18v3h1.5v-4.5a.68.68 0 0 0-.225-.525l-5.25-5.25a.68.68 0 0 0-.525-.225H6a1.504 1.504 0 0 0-1.5 1.5v18a1.504 1.504 0 0 0 1.5 1.5h6zm1.5-17.7 4.2 4.2h-4.2z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgDocumentRemove);
export default Memo;
