import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgTagEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m22.28 5.907-2.25-2.25a.75.75 0 0 0-1.06 0L12 10.627v3.31h3.31l6.97-6.97a.75.75 0 0 0 0-1.06m-7.59 6.53H13.5v-1.189l3.75-3.75 1.19 1.19zm4.81-4.81-1.19-1.19 1.19-1.189 1.19 1.19zM7.5 10.938a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-4.5a1.5 1.5 0 1 0-.003 3 1.5 1.5 0 0 0 .003-3"
      fill="currentColor"
    />
    <path
      d="m20.254 11.114-1.06 1.06L21 13.982l-7.457 7.457L3 10.894V3.438h7.456l3.305 3.305 1.06-1.061-3.304-3.305a1.5 1.5 0 0 0-1.061-.44H3a1.5 1.5 0 0 0-1.5 1.5v7.457c0 .397.158.779.44 1.06L12.482 22.5a1.5 1.5 0 0 0 2.121 0l7.457-7.457a1.5 1.5 0 0 0 0-2.122z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgTagEdit);
export default Memo;
