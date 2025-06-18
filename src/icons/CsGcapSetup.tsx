import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsGcapSetup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-gcap-setup_svg__a)" fill="currentColor">
      <path d="M11.25 11.25H4.5v1.5h6.75z" />
      <path
        clipRule="evenodd"
        d="M11.25 16.5H3c-.827 0-1.5-.673-1.5-1.5V9c0-.827.673-1.5 1.5-1.5h18c.827 0 1.5.673 1.5 1.5v1.5H21V9H3v6h8.25z"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="m17.23 20.242.006-1.594a3 3 0 0 1-.785-.332l-1.138 1.117-1.051-1.07 1.138-1.117a3 3 0 0 1-.31-.762l-1.595-.007.006-1.5 1.595.006q.111-.421.332-.786l-1.123-1.123 1.061-1.06 1.132 1.133c.236-.136.492-.242.762-.31l.007-1.595 1.5.007-.007 1.594q.422.111.786.332l1.137-1.118 1.052 1.07-1.138 1.118q.205.355.31.763l1.594.006-.006 1.5-1.594-.006a3 3 0 0 1-.305.739l1.132 1.133-1.06 1.06-1.123-1.123q-.375.226-.809.337l-.006 1.595zm.098-3.155a1.5 1.5 0 1 0 1.34-2.683 1.5 1.5 0 0 0-1.34 2.683"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cs-gcap-setup_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsGcapSetup);
export default Memo;
