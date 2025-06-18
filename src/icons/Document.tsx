import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDocument = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#document_svg__a)" fill="currentColor">
      <path d="m19.275 7.604-5.25-5.25a.68.68 0 0 0-.525-.225H6c-.825 0-1.5.675-1.5 1.5v18c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-13.5a.68.68 0 0 0-.225-.525M13.5 3.929l4.2 4.2h-4.2zm4.5 17.7H6v-18h6v4.5c0 .825.675 1.5 1.5 1.5H18z" />
      <path d="M16.5 17.129h-9v1.5h9zM16.5 12.629h-9v1.5h9z" />
    </g>
    <defs>
      <clipPath id="document_svg__a">
        <path d="M0 .629h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDocument);
export default Memo;
