import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgView = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.205 11.745A12.52 12.52 0 0 0 12 3.75 12.52 12.52 0 0 0 .795 11.745a.75.75 0 0 0 0 .51A12.52 12.52 0 0 0 12 20.25a12.52 12.52 0 0 0 11.205-7.995.75.75 0 0 0 0-.51M12 18.75c-3.975 0-8.175-2.947-9.698-6.75C3.825 8.198 8.025 5.25 12 5.25s8.175 2.948 9.698 6.75c-1.523 3.803-5.723 6.75-9.698 6.75"
      fill="currentColor"
    />
    <path
      d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9m0 7.5a3 3 0 1 1 0-5.999A3 3 0 0 1 12 15"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgView);
export default Memo;
