import type { SVGProps } from 'react';
import { memo } from 'react';

const Svg3D = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.25 1.5H1.5v6.75H3V3h5.25zM1.5 15.75v6.75h6.75V21H3v-5.25zM22.5 8.25V1.5h-6.75V3H21v5.25zM15.75 22.5h6.75v-6.75H21V21h-5.25zM19.118 7.598l-6.75-3.75a.75.75 0 0 0-.75 0l-6.75 3.75a.75.75 0 0 0-.368.652v7.5a.75.75 0 0 0 .383.652l6.75 3.75a.75.75 0 0 0 .75 0l6.75-3.75a.75.75 0 0 0 .367-.652v-7.5a.75.75 0 0 0-.383-.652M12 5.355l5.205 2.895L12 11.145 6.795 8.25zm-6 4.17 5.25 2.918v5.782L6 15.307zm6.75 8.7v-5.783L18 9.526v5.782z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(Svg3D);
export default Memo;
