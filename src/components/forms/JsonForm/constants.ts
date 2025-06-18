import OneOfControlRenderer, {
  oneOfControlTester,
} from './complex/OneOfControl';
import ArrayControlRenderer, {
  arrayControlTester,
} from './controls/ArrayControl';
import CheckboxControlRenderer, {
  checkboxControlTester,
} from './controls/CheckboxControl';
import FileArrayControlRenderer, {
  fileArrayControlTester,
} from './controls/FileArrayControl';
import FileControlRenderer, { fileControlTester } from './controls/FileControl';
import MultiSelectControlRenderer, {
  multiSelectControlTester,
} from './controls/MultiSelectControl';
import NumberControlRenderer, {
  numberControlTester,
} from './controls/NumberControl';
import RadioControlRenderer, {
  radioControlTester,
} from './controls/RadioControl';
import RangeControlRenderer, {
  rangeControlTester,
} from './controls/RangeControl';
import SelectControlRenderer, {
  selectControlTester,
} from './controls/SelectControl';
import SliderControlRenderer, {
  sliderControlTester,
} from './controls/SliderControl';
import StringArraySelectControlRenderer, {
  stringArraySelectControlTester,
} from './controls/StringArraySelectControl';
import SwitchControlRenderer, {
  switchControlTester,
} from './controls/SwitchControl';
import TextControlRenderer, { textControlTester } from './controls/TextControl';
import GroupLayoutRenderer, { groupLayoutTester } from './layout/GroupLayout';
import HorizontalLayoutRenderer, {
  horizontalLayoutRendererTester,
} from './layout/HorizontalLayout';
import VerticalLayoutRenderer, {
  verticalLayoutTester,
} from './layout/VerticalLayout';

export const UNUSED_DEFAULT_DATA = {};

export const RENDERERS = [
  {
    tester: textControlTester,
    renderer: TextControlRenderer,
  },
  {
    tester: numberControlTester,
    renderer: NumberControlRenderer,
  },
  {
    tester: sliderControlTester,
    renderer: SliderControlRenderer,
  },
  {
    tester: checkboxControlTester,
    renderer: CheckboxControlRenderer,
  },
  {
    tester: selectControlTester,
    renderer: SelectControlRenderer,
  },
  {
    tester: radioControlTester,
    renderer: RadioControlRenderer,
  },
  {
    tester: multiSelectControlTester,
    renderer: MultiSelectControlRenderer,
  },
  {
    tester: stringArraySelectControlTester,
    renderer: StringArraySelectControlRenderer,
  },
  {
    tester: arrayControlTester,
    renderer: ArrayControlRenderer,
  },
  {
    tester: switchControlTester,
    renderer: SwitchControlRenderer,
  },
  {
    tester: fileControlTester,
    renderer: FileControlRenderer,
  },
  {
    tester: fileArrayControlTester,
    renderer: FileArrayControlRenderer,
  },
  {
    tester: rangeControlTester,
    renderer: RangeControlRenderer,
  },
  // Complex
  {
    tester: oneOfControlTester,
    renderer: OneOfControlRenderer,
  },
  // Layout
  {
    tester: groupLayoutTester,
    renderer: GroupLayoutRenderer,
  },
  {
    tester: horizontalLayoutRendererTester,
    renderer: HorizontalLayoutRenderer,
  },
  {
    tester: verticalLayoutTester,
    renderer: VerticalLayoutRenderer,
  },
];
