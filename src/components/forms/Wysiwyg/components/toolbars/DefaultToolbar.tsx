// import { AlignmentCommand } from '../commands/alignments/AlignmentCommand';
import { HeadingCommand } from '../commands/headings/HeadingCommand';
import { RedoCommand } from '../commands/history/RedoCommand';
import { UndoCommand } from '../commands/history/UndoCommand';
import { OrderedListCommand } from '../commands/lists/OrderedListCommand';
import { UnorderedListCommand } from '../commands/lists/UnorderedListCommand';
import { BoldCommandButton } from '../commands/marks/BoldCommandButton';
import { CodeCommandButton } from '../commands/marks/CodeCommandButton';
import { ItalicCommandButton } from '../commands/marks/ItalicCommandButton';
import { StrikeThroughCommandButton } from '../commands/marks/StrikeThroughCommandButton';
import { UnderlineCommandButton } from '../commands/marks/UnderlineCommandButton';
import { BlockCodeCommand } from '../commands/nodes/BlockCodeCommand';
import { DividerCommand } from '../commands/nodes/DividerCommand';
import { ImageCommand } from '../commands/nodes/ImageCommand';
import { LinkCommand } from '../commands/nodes/LinkCommand';
import { QuoteCommand } from '../commands/nodes/QuoteCommand';
import { ToggleMarkdownCommand } from '../commands/nodes/ToggleMarkdownCommand';
import { Toolbar } from './Toolbar';
import { ToolbarGroup } from './ToolbarGroup';

export const DefaultToolbar = () => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <UndoCommand />
        <RedoCommand />
      </ToolbarGroup>
      <ToolbarGroup>
        <BoldCommandButton />
        <ItalicCommandButton />
        <UnderlineCommandButton />
        <StrikeThroughCommandButton />
        <HeadingCommand />
      </ToolbarGroup>
      <ToolbarGroup>
        <DividerCommand />
        <LinkCommand />
        <QuoteCommand />
        <CodeCommandButton />
        <BlockCodeCommand />
        <ImageCommand />
      </ToolbarGroup>
      <ToolbarGroup>
        <UnorderedListCommand />
        <OrderedListCommand />
        {/* <CheckedListCommand /> */}
        {/* <AlignmentCommand /> */}
      </ToolbarGroup>
      <ToolbarGroup withDivider={false}>
        <ToggleMarkdownCommand />
      </ToolbarGroup>
    </Toolbar>
  );
};
