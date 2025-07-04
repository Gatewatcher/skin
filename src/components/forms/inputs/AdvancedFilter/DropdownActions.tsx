import { ButtonActions } from '@/skin/actions';

import { TEST_IDS } from './constants';

export type DropdownActionsProps = {
  onEditFilter: () => void;
  onDelete: () => void;
  onDisabled?: () => void;
  onExcluded?: () => void;
  excluded?: boolean;
};

const DropdownActions = ({
  excluded,
  onEditFilter,
  onExcluded,
  onDelete,
  onDisabled,
}: DropdownActionsProps) => {
  return (
    <ButtonActions.Actions>
      <ButtonActions.Button
        data-testid={TEST_IDS.dropdownActionEdit}
        icon="Edit"
        onClick={onEditFilter}
      >
        Edit
      </ButtonActions.Button>
      {onExcluded && (
        <ButtonActions.Button
          data-testid={TEST_IDS.dropdownActionExclude}
          icon={excluded ? 'Add' : 'TextHorizontalRule'}
          onClick={onExcluded}
        >
          {excluded ? 'Include results' : 'Exclude results'}
        </ButtonActions.Button>
      )}
      {onDisabled && (
        <ButtonActions.Button
          data-testid={TEST_IDS.dropdownActionDisable}
          icon="ViewOff"
          onClick={onDisabled}
        >
          Disabled
        </ButtonActions.Button>
      )}
      <ButtonActions.Button
        data-testid={TEST_IDS.dropdownActionDelete}
        icon="Delete"
        onClick={onDelete}
        type="danger"
      >
        Delete
      </ButtonActions.Button>
    </ButtonActions.Actions>
  );
};

export default DropdownActions;
