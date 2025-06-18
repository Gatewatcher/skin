// Renamed from cronstrue.ts to keep the same import paths
import { ExpressionDescriptor } from './expressionDescriptor';
import { enLocaleLoader } from './i18n/enLocaleLoader';

ExpressionDescriptor.initialize(new enLocaleLoader());
export default ExpressionDescriptor;

const toString = ExpressionDescriptor.toString;
export { toString };

export type { Options } from './options';
