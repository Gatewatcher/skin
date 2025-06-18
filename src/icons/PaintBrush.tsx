import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgPaintBrush = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 19"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m17.019 13.956-3.644-3.65V7.6a.63.63 0 0 0-.181-.444L6.944.906a.625.625 0 0 0-.888 0L.431 6.53a.625.625 0 0 0 0 .887l6.25 6.25a.62.62 0 0 0 .444.182h2.712l3.644 3.65a2.501 2.501 0 0 0 3.538-3.538zM2.75 5.98l1.431 1.437.888-.887L3.63 5.1l.994-.994 2.681 2.687.888-.887-2.688-2.681.994-.994 4.119 4.119-4.744 4.743-4.119-4.118zm13.381 10.625a1.25 1.25 0 0 1-1.762 0l-3.831-3.825a1.1 1.1 0 0 0-.444-.181H7.38l-.625-.625L11.5 7.23l.625.625v2.712c0 .164.066.322.181.438l3.825 3.837a1.25 1.25 0 0 1 0 1.763"
      fill="currentColor"
    />
  </svg>
);
const Memo = memo(SvgPaintBrush);
export default Memo;
