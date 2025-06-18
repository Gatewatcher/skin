import type { SVGProps } from 'react';
import { memo } from 'react';

const SvgEmpty = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  />
);
const Memo = memo(SvgEmpty);
export default Memo;
