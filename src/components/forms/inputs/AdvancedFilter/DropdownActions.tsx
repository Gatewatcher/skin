import { ButtonActions } from '@/skin/actions';

import { TEST_IDS } from './constants';

export type DropdownActionsProps = {
  onEditFilter: () => void;
  onDelete: () => void;
  onDisabled?: () => void;
};

const DropdownActions = ({
  onEditFilter,
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
      <ButtonActions.Button icon="TextHorizontalRule">
        Exclude results
      </ButtonActions.Button>
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
