import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTagNone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#tag-none_svg__a)" fill="currentColor">
      <path d="m17.319 7.741 5.181-5.18L21.44 1.5 1.5 21.44l1.06 1.06 5.181-5.18 4.742 4.741a1.5 1.5 0 0 0 2.121 0l7.457-7.457a1.5 1.5 0 0 0 0-2.121zM13.543 21l-4.74-4.742 7.456-7.456L21 13.543zM7.5 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0-.003 3A1.5 1.5 0 0 0 7.5 6" />
      <path d="m5.62 15.197 1.06-1.06L3 10.456V3h7.456l3.68 3.68 1.061-1.06-3.68-3.68a1.5 1.5 0 0 0-1.061-.44H3A1.5 1.5 0 0 0 1.5 3v7.456c0 .398.158.78.44 1.06z" />
    </g>
    <defs>
      <clipPath id="tag-none_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgTagNone);
export default Memo;
