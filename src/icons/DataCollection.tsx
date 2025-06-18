import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgDataCollection = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#data-collection_svg__a)" fill="currentColor">
      <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M22.5 12.75v-1.5h-4.628l1.936-1.943L18.75 8.25 15 12l3.75 3.75 1.058-1.057-1.936-1.943zM11.25 17.873V22.5h1.5v-4.628l1.943 1.936 1.057-1.058L12 15l-3.75 3.75 1.057 1.058zM5.25 8.25 4.193 9.307l1.935 1.943H1.5v1.5h4.628l-1.936 1.943L5.25 15.75 9 12zM12.75 6.128V1.5h-1.5v4.628L9.307 4.192 8.25 5.25 12 9l3.75-3.75-1.057-1.057z" />
    </g>
    <defs>
      <clipPath id="data-collection_svg__a">
        <path d="M0 0h24v24H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgDataCollection);
export default Memo;
