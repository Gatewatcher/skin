import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgCsRemoveAttachment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M22.42 2.833 2.442 23.531l-1.058-1.108L21.362 1.725z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="m17.135 10.84 3.94 4.104c1.95 2.031 1.95 5.312 0 7.265-1.95 1.954-5.025 1.954-6.9-.078l-3.96-4.124 1.091-1.13 3.994 4.16a3.235 3.235 0 0 0 4.725-.078c1.275-1.328 1.275-3.593-.075-4.921l-3.906-4.069zM15.749 9.395l-5.924-6.17c-1.875-2.031-4.95-2.031-6.9-.078s-1.95 5.234 0 7.187l.075.079 2.1 2.265 1.05-1.094L3.975 9.32C2.7 7.99 2.7 5.725 3.975 4.397S7.425 2.99 8.7 4.319l5.958 6.206z"
      fill="currentColor"
    />
    <path
      d="m13.605 11.616-.33-.344c-1.35-1.328-3.45-1.25-4.725.156-1.2 1.328-1.2 3.438 0 4.844l.28.291 1.09-1.13-.245-.255c-.75-.781-.675-2.031 0-2.734a1.897 1.897 0 0 1 2.625 0l.252.263zM13.939 14.15l1.436 1.497 1.05-1.094-1.434-1.493z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgCsRemoveAttachment);
export default Memo;
