import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPassword = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.213 3a5.784 5.784 0 0 0-5.535 7.465L3 17.143V21h3.857l6.677-6.678a5.784 5.784 0 0 0 6.06-9.316A5.79 5.79 0 0 0 15.215 3m0 10.286c-.442 0-.882-.066-1.306-.194l-.737-.224-2.59 2.59-.886-.887-.909.91.887.886-1.02 1.02-.886-.887-.91.909.887.887-1.418 1.418h-2.04v-2.039l6.847-6.846-.224-.737a4.5 4.5 0 1 1 4.305 3.194"
      fill="currentColor"
    />
    <path d="M16 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" fill="currentColor" />
  </svg>
);
const Memo = memo(SvgPassword);
export default Memo;
