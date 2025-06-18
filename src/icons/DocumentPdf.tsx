import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDocumentPdf = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#document-pdf_svg__a)" fill="currentColor">
      <path d="M22.5 13.5V12H18v7.5h1.5v-3h2.25V15H19.5v-1.5zM14.25 19.5h-3V12h3a2.253 2.253 0 0 1 2.25 2.25v3a2.253 2.253 0 0 1-2.25 2.25m-1.5-1.5h1.5a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75h-1.5zM8.25 12H4.5v7.5H6v-2.25h2.25a1.5 1.5 0 0 0 1.5-1.5V13.5a1.5 1.5 0 0 0-1.5-1.5M6 15.75V13.5h2.25v2.25z" />
      <path d="M16.5 10.5v-3a.68.68 0 0 0-.225-.525l-5.25-5.25A.68.68 0 0 0 10.5 1.5H3A1.504 1.504 0 0 0 1.5 3v18A1.5 1.5 0 0 0 3 22.5h12V21H3V3h6v4.5A1.504 1.504 0 0 0 10.5 9H15v1.5zm-6-3V3.3l4.2 4.2z" />
    </g>
    <defs>
      <clipPath id="document-pdf_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDocumentPdf);
export default Memo;
