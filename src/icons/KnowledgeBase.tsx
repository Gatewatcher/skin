import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgKnowledgeBase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#knowledge-base_svg__a)" fill="currentColor">
      <path d="m17.25 20.4-1.95-1.95-1.05 1.05 3 3 5.25-5.25-1.05-1.05zM15 13.5H9V15h6zM15 9.75H9v1.5h6zM15 6H9v1.5h6z" />
      <path d="M12 21H4.5v-3H6v-1.5H4.5v-3.75H6v-1.5H4.5V7.5H6V6H4.5V3H18v12h1.5V3c0-.825-.675-1.5-1.5-1.5H4.5C3.675 1.5 3 2.175 3 3v3H1.5v1.5H3v3.75H1.5v1.5H3v3.75H1.5V18H3v3c0 .825.675 1.5 1.5 1.5H12z" />
    </g>
    <defs>
      <clipPath id="knowledge-base_svg__a">
        <path d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgKnowledgeBase);
export default Memo;
