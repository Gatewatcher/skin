import { suffixTestId } from '@gatewatcher/bistoury/utils-tests';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';

import { ButtonIcon } from '@/skin/actions';
import { Stack } from '@/skin/layout';

import { useSwitchListingContext } from '../context';

export type SwitchListingActionsProps = DataTestId;

const SwitchListingActions = ({
  'data-testid': testId = 'switch-listing-actions',
}: SwitchListingActionsProps) => {
  const { currentView, setCurrentView } = useSwitchListingContext();

  return (
    <Stack data-testid={testId} gap={4}>
      <ButtonIcon
        data-testid={suffixTestId(testId, 'table')}
        icon="BurgerMenu"
        onClick={() => setCurrentView('table')}
        type="neutral"
        variant={currentView !== 'table' ? 'ghosted' : undefined}
      />
      <ButtonIcon
        data-testid={suffixTestId(testId, 'list')}
        icon="GridMenu"
        onClick={() => setCurrentView('list')}
        type="neutral"
        variant={currentView !== 'list' ? 'ghosted' : undefined}
      />
    </Stack>
  );
};

export default SwitchListingActions;
