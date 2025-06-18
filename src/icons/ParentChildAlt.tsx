import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgParentChildAlt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 23"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#parent-child-alt_svg__a)">
      <path
        d="M20.772 8.554a1.426 1.426 0 0 0 1.426-1.425V2.852a1.426 1.426 0 0 0-1.426-1.426H3.663a1.426 1.426 0 0 0-1.425 1.426v4.277a1.426 1.426 0 0 0 1.425 1.425h7.842v2.852H7.228a1.426 1.426 0 0 0-1.426 1.426v2.851H3.663a1.426 1.426 0 0 0-1.425 1.426v2.851a1.426 1.426 0 0 0 1.425 1.426h5.703a1.425 1.425 0 0 0 1.426-1.426V17.11a1.426 1.426 0 0 0-1.426-1.426H7.228v-2.851h9.98v2.851h-2.139a1.426 1.426 0 0 0-1.425 1.426v2.851a1.426 1.426 0 0 0 1.425 1.426h5.703a1.426 1.426 0 0 0 1.426-1.426V17.11a1.426 1.426 0 0 0-1.426-1.426h-2.138v-2.851a1.425 1.425 0 0 0-1.426-1.426h-4.277V8.554zM9.366 19.96H3.663V17.11h5.703zm11.406 0H15.07V17.11h5.703zM3.663 2.852h17.11v4.277H3.662z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="parent-child-alt_svg__a">
        <path d="M.812 0h22.812v22.812H.812z" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgParentChildAlt);
export default Memo;
