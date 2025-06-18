import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 26"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m21.02 5.489-2.7-2.782c-.6-.619-1.5-.619-2.1 0l-7.09 7.316L4.97 14.3 2 17.361v4.947h4.8l2.97-3.061 3.11-3.195 1.05-1.082 7.09-7.317c.6-.618.6-1.546 0-2.164m-8.14 8.399-1.06 1.082-5.62 5.792H3.5v-2.783l5.62-5.791 1.06-1.083 3.79-3.916 2.7 2.783zm4.84-4.998-2.7-2.783 2.25-2.318 2.7 2.782z"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgEdit);
export default Memo;
