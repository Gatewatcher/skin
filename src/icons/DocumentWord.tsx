import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDocumentWord = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#document-word_svg__a)" fill="currentColor">
      <path d="m19.28 6.97-5.25-5.25a.75.75 0 0 0-.53-.22H6A1.5 1.5 0 0 0 4.5 3v18A1.5 1.5 0 0 0 6 22.5h6V21H6V3h6v4.5A1.5 1.5 0 0 0 13.5 9H18v3h1.5V7.5a.75.75 0 0 0-.22-.53M13.5 3.31l4.19 4.19H13.5z" />
      <path d="m21.226 15.006-.682 6.452-1.041-6.452h-1.5l-1.04 6.452-.683-6.452h-1.274l1.02 7.494h1.708l1.02-6.272 1.018 6.272h1.709l1.019-7.494z" />
      <path
        d="M21.226 14.956h-.045l-.005.045-.642 6.08-.982-6.083-.007-.042h-1.584l-.007.042-.982 6.083L16.33 15l-.005-.045H14.95l.008.057 1.019 7.494.006.043h1.794l.007-.042.97-5.968.97 5.968.007.042h1.794l.006-.043 1.02-7.494.007-.057h-1.331Z"
        stroke="currentColor"
        strokeWidth={0.1}
      />
    </g>
    <defs>
      <clipPath id="document-word_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDocumentWord);
export default Memo;
