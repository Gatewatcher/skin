// Renamed from ../cronstrue-i18n.ts to keep the same import paths
import { ExpressionDescriptor } from '../expressionDescriptor';
import { allLocalesLoader } from './allLocalesLoader';

ExpressionDescriptor.initialize(new allLocalesLoader());
export default ExpressionDescriptor;

const toString = ExpressionDescriptor.toString;
export { toString };
