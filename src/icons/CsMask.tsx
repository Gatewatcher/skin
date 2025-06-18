import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsMask = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#cs-mask_svg__a)" fill="currentColor">
      <path d="M10.5 9H6.75v1.5h3.75zM17.25 9H13.5v1.5h3.75zM14.55 14.25c-.6.75-1.575 1.2-2.55 1.2s-1.95-.45-2.55-1.2l-1.2.9c.9 1.05 2.25 1.8 3.75 1.8s2.85-.675 3.75-1.8z" />
      <path
        clipRule="evenodd"
        d="M19.89 2.48A.75.75 0 0 1 21 3.14v9.638l-.083.746a8.41 8.41 0 0 1-4.185 6.373L12 22.599l-4.732-2.703a8.41 8.41 0 0 1-4.185-6.373L3 12.777V3.14a.75.75 0 0 1 1.11-.659A16.4 16.4 0 0 0 12 4.486c2.86 0 5.547-.727 7.89-2.006M4.5 4.353v8.341l.074.664a6.91 6.91 0 0 0 3.439 5.235L12 20.872l3.987-2.279a6.91 6.91 0 0 0 3.44-5.235l.073-.664v-8.34A17.9 17.9 0 0 1 12 5.985c-2.675 0-5.216-.585-7.5-1.633"
        fillRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cs-mask_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgCsMask);
export default Memo;
