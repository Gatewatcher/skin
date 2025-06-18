import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgGroup = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.106 14.84 17.76 12.5l4.345-2.34a.75.75 0 0 0 0-1.32l-9.75-5.25a.75.75 0 0 0-.71 0l-9.75 5.25a.75.75 0 0 0 0 1.32l4.344 2.34-4.345 2.34a.75.75 0 0 0 0 1.32l9.75 5.25a.75.75 0 0 0 .711 0l9.75-5.25a.75.75 0 0 0 0-1.32M12 5.102 20.168 9.5 12 13.898 3.832 9.5zm0 14.796L3.832 15.5l3.99-2.148 3.822 2.058a.75.75 0 0 0 .711 0l3.823-2.058 3.99 2.148z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgGroup);
export default Memo;
