import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPhone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.5 21.75h-.128C4.635 20.902 2.543 8.468 2.25 4.673A2.25 2.25 0 0 1 4.32 2.25h4.133a1.5 1.5 0 0 1 1.395.945L10.988 6a1.5 1.5 0 0 1-.33 1.62L9.06 9.232a7.03 7.03 0 0 0 5.685 5.7l1.627-1.612A1.5 1.5 0 0 1 18 13.012l2.828 1.133a1.5 1.5 0 0 1 .922 1.395v3.96a2.25 2.25 0 0 1-2.25 2.25m-15-18a.75.75 0 0 0-.75.75v.06C4.095 9 6.308 19.5 19.455 20.25a.75.75 0 0 0 .795-.705V15.54l-2.828-1.132-2.152 2.137-.36-.045C8.385 15.682 7.5 9.158 7.5 9.09l-.045-.36 2.13-2.153L8.46 3.75z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPhone);
export default Memo;
