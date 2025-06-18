import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgMagicWand = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#magic-wand_svg__a)" fill="currentColor">
      <path d="M29.414 24 12 6.586a2.05 2.05 0 0 0-2.828 0L6.586 9.172a2 2 0 0 0 0 2.828l17.413 17.414a2 2 0 0 0 2.828 0l2.587-2.586a2 2 0 0 0 0-2.828M8 10.586 10.586 8l5 5-2.587 2.587zM25.413 28l-11-10.999L17 14.414l11 11zM4 14l-2 2 2 2 2-2zM16 2l-2 2 2 2 2-2zM4 2 2 4l2 2 2-2z" />
    </g>
    <defs>
      <clipPath id="magic-wand_svg__a">
        <path d="M0 0h32v32H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgMagicWand);
export default Memo;
