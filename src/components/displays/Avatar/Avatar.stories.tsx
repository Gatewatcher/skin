import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { AvatarProps } from '.';
import Avatar from '.';
import type { AvatarStackProps } from './compounds/Stack';
import {
  AVATAR_SIZES,
  DEFAULT_SIZE,
  DEFAULT_STACK_MAX,
  DEFAULT_WITH_TOOLTIP,
} from './constants';

type Story<T = typeof Avatar> = StoryObj<T>;

const BASE_64_AVATAR =
  'data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFwAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAEAAAAADoAQAAQAAAEAAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDEwMDUA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAQABAAwEiAAIRAQMRAf/EABsAAAEFAQEAAAAAAAAAAAAAAAEAAgMEBgUH/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQIAAwT/2gAMAwEAAhADEAAAAe+ZFzGFyyCnmaXnLERKMvqMJlbzBbIvoFHRVHPizBm4ILLmlyFzPob+K/nXJFmr28+bBY0rNa6VpDVtwf/EACYQAAEDAwMCBwAAAAAAAAAAAAECAwQAERMQEiAFIRQkMjM0QUL/2gAIAQEAAQUCtztxvznTVBbLjl0908ZSPMxwkVE9Gm+t1Spi0qU6b5hfpz4Kd9bqD7Zp5wYFAX0R2Uh9GPxLVJZAqQgNxvrQ+00ErYxoFBwVLsY340c+PGcGJYvX/8QAGxEAAwACAwAAAAAAAAAAAAAAAAERAhASICL/2gAIAQMBAT8B6Qg15pCo5izZVta//8QAGhEAAwADAQAAAAAAAAAAAAAAAAERAhASIf/aAAgBAgEBPwGl3Sl9KciwHgjl7ev/xAApEAAABQEHAgcAAAAAAAAAAAAAAQIRIQMQEiAiMUFhE3EyM0BCUZGh/9oACAEBAAY/AvRnSpw2pi8SjcEeKpm32DGuPkgZ9S+l44w3Ke2pjUhM8kTBSTg3+7YWQXcXmaBq9qQk1Klh4h7go5fvgfkIUaHgeX+jQKZ8Ce4po3s//8QAIhAAAwEAAQQBBQAAAAAAAAAAAAERITEQQVFhcSCBodHw/9oACAEBAAE/IUIQhCE6IQnRI3KqhEIQnRnrTCOTNJHlH9wk8IT6NeWm7xSxr8p1FNZmcvVrsMYdQOyPnaYIXzBfcfYoogk8iXycuvgahAs69m+SISRsLzjE4J9Jo/omQppcRiJ+hiufCLUXRYmqslSB8qO9tByFyXka4xH+T4d+nBjiv6ju9w36UY5sib8OH//aAAwDAQACAAMAAAAQ3gLAOCBWfVxyhDtz/8QAGhEBAQEAAwEAAAAAAAAAAAAAAQARECExYf/aAAgBAwEBPxDILIIhdxwFfBI64QiPs+7f/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERECFBMf/aAAgBAgEBPxDCjeEno+qxQn1k1wrxvhZw/8QAIxABAAIDAAIBBAMAAAAAAAAAAQARITFBUWGREHGBoSCx0f/aAAgBAQABPxCBJWEEkk5fxiQJsByQXCD6hMTP1R6T0Hh+2Ko5qVpfv37+Jc6N5xaQgioy5UCzDobrezX4jJJTYr30deJitp1BsTm4Q1DyYdXGKrs1d+BcFQKBl5O/uiKK4P7TOvskvTERBFOQ+1XUeQs6lZkvK45jsENN9r3VxmEWgpfaVcmBNAXTNVMQwQs2PbqA3Ta3X+UyaA2qLlj+gNgKgtedwFxAko2svsyS9GZKIOKRFx8GIf8Az1peWACxy2v3Ko2sB0+gjOIdL1pzxmNVdrl/gg8iNL7kYKFAZ1t0H+/iUrXfrFR83Ka8ouV8z//Z';

export default {
  title: 'displays/Avatar',
  component: Avatar,
  argTypes: {
    ...addInlineRadio<AvatarProps>('size', AVATAR_SIZES),
  },
  args: {
    username: 'John Doe',
    size: DEFAULT_SIZE,
    withTooltip: DEFAULT_WITH_TOOLTIP,
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args: AvatarProps) => (
  <Avatar {...args} />
);

export const Default: Story = {
  render: Template,
};

export const Image: Story = {
  render: Template,
  args: {
    image:
      'https://fastly.picsum.photos/id/1005/64/64.jpg?hmac=GfOyTHJcxsTTn0EXugyviiROYAqGAdDtqvf3zLOzwfA',
    size: 'xLarge',
  },
};

export const AllColors: Story = {
  render: (props: Omit<AvatarProps, 'image'>) => {
    const names = ['aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj'];
    return (
      <Stack gap={9}>
        {names.map(name => (
          <Avatar key={name} {...props} username={name} />
        ))}
      </Stack>
    );
  },
  parameters: {
    controls: { exclude: ['image'] },
  },
};

export const AllSizes: Story = {
  render: (props: AvatarProps) => (
    <Stack alignItems="center" gap={9}>
      {AVATAR_SIZES.map(size => (
        <Avatar key={size} {...props} size={size} />
      ))}
    </Stack>
  ),
  parameters: {
    controls: { exclude: ['size'] },
  },
};

export const AllSizesWithImage: Story = {
  render: (props: AvatarProps) => (
    <Stack alignItems="center" gap={9}>
      {AVATAR_SIZES.map(size => (
        <Avatar key={size} {...props} size={size} />
      ))}
    </Stack>
  ),
  args: {
    image: BASE_64_AVATAR,
  },
  parameters: {
    controls: { exclude: ['size'] },
  },
};

export const WithStack: Story<AvatarStackProps> = {
  render: (props: AvatarStackProps) => {
    return (
      <Avatar.Stack {...props}>
        <Avatar username="John Doe" />
        <Avatar username="Joe Dalton" />
        <Avatar username="Han Solo" />
        <Avatar username="Gollum" />
        <Avatar image={BASE_64_AVATAR} />
        <Avatar username="Peter Parker" />
      </Avatar.Stack>
    );
  },
  args: {
    max: DEFAULT_STACK_MAX,
  },
  parameters: {
    controls: { exclude: ['children', 'image', 'username'] },
  },
  decorators: [
    Story => (
      <div onClick={console.log}>
        <Story />
      </div>
    ),
  ],
};

export const WithColorGenerator: Story = {
  render: () => {
    return (
      <Stack direction="column" gap={7}>
        <Avatar username="John Doe" />
        <Avatar colorGenerator="test" username="John Doe" />
      </Stack>
    );
  },
};
