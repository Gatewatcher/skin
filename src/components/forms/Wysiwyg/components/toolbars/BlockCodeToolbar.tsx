// import { AlignmentCommand } from '../commands/alignments/AlignmentCommand';
import { RedoCommand } from '../commands/history/RedoCommand';
import { UndoCommand } from '../commands/history/UndoCommand';
import { SelectLanguageCommand } from '../commands/nodes/SelectLanguageCommand';
import { ToggleMarkdownCommand } from '../commands/nodes/ToggleMarkdownCommand';
import { Toolbar } from './Toolbar';
import { ToolbarGroup } from './ToolbarGroup';

export const BlockCodeToolbar = () => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <UndoCommand />
        <RedoCommand />
      </ToolbarGroup>
      <ToolbarGroup>
        <SelectLanguageCommand />
      </ToolbarGroup>
      {/* <ToolbarGroup>
        <AlignmentCommand />
      </ToolbarGroup> */}
      <ToolbarGroup withDivider={false}>
        <ToggleMarkdownCommand />
      </ToolbarGroup>
    </Toolbar>
  );
};
