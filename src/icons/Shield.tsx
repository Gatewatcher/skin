import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 33 33"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.5 30.706-6.176-3.293A10.98 10.98 0 0 1 4.5 17.706v-13a2 2 0 0 1 2-2h12.036v.01h2.92a1 1 0 0 1 .715 1.699l-6.43 6.583 2.693 4.03a1 1 0 0 1-.193 1.326l-5.093 4.22-1.276-1.54 4.398-3.644-2.642-3.955a1 1 0 0 1 .116-1.254l5.337-5.465h-5.66v-.01H6.5v13a8.99 8.99 0 0 0 4.766 7.942L16.5 28.44l5.234-2.79a8.99 8.99 0 0 0 4.766-7.943V5.68h2v12.025a10.98 10.98 0 0 1-5.824 9.707z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgShield);
export default Memo;
