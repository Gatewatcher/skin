import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LinkExternal } from '@/skin/actions';
import { Stack } from '@/skin/layout';
import { addInlineRadio } from '@/storybook';

import type { AvatarUsernameProps } from '.';
import AvatarUsername from '.';
import {
  AVATAR_USERNAME_SIZES,
  DEFAULT_AVATAR_USERNAME_SIZE,
} from './constants';

type Story = StoryObj<typeof AvatarUsername>;

const BASE_64_AVATAR =
  'data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFwAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAEAAAAADoAQAAQAAAEAAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDEwMDUA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgAQABAAwEiAAIRAQMRAf/EABsAAAEFAQEAAAAAAAAAAAAAAAEAAgMEBgUH/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQIAAwT/2gAMAwEAAhADEAAAAe+ZFzGFyyCnmaXnLERKMvqMJlbzBbIvoFHRVHPizBm4ILLmlyFzPob+K/nXJFmr28+bBY0rNa6VpDVtwf/EACYQAAEDAwMCBwAAAAAAAAAAAAECAwQAERMQEiAFIRQkMjM0QUL/2gAIAQEAAQUCtztxvznTVBbLjl0908ZSPMxwkVE9Gm+t1Spi0qU6b5hfpz4Kd9bqD7Zp5wYFAX0R2Uh9GPxLVJZAqQgNxvrQ+00ErYxoFBwVLsY340c+PGcGJYvX/8QAGxEAAwACAwAAAAAAAAAAAAAAAAERAhASICL/2gAIAQMBAT8B6Qg15pCo5izZVta//8QAGhEAAwADAQAAAAAAAAAAAAAAAAERAhASIf/aAAgBAgEBPwGl3Sl9KciwHgjl7ev/xAApEAAABQEHAgcAAAAAAAAAAAAAAQIRIQMQEiAiMUFhE3EyM0BCUZGh/9oACAEBAAY/AvRnSpw2pi8SjcEeKpm32DGuPkgZ9S+l44w3Ke2pjUhM8kTBSTg3+7YWQXcXmaBq9qQk1Klh4h7go5fvgfkIUaHgeX+jQKZ8Ce4po3s//8QAIhAAAwEAAQQBBQAAAAAAAAAAAAERITEQQVFhcSCBodHw/9oACAEBAAE/IUIQhCE6IQnRI3KqhEIQnRnrTCOTNJHlH9wk8IT6NeWm7xSxr8p1FNZmcvVrsMYdQOyPnaYIXzBfcfYoogk8iXycuvgahAs69m+SISRsLzjE4J9Jo/omQppcRiJ+hiufCLUXRYmqslSB8qO9tByFyXka4xH+T4d+nBjiv6ju9w36UY5sib8OH//aAAwDAQACAAMAAAAQ3gLAOCBWfVxyhDtz/8QAGhEBAQEAAwEAAAAAAAAAAAAAAQARECExYf/aAAgBAwEBPxDILIIhdxwFfBI64QiPs+7f/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERECFBMf/aAAgBAgEBPxDCjeEno+qxQn1k1wrxvhZw/8QAIxABAAIDAAIBBAMAAAAAAAAAAQARITFBUWGREHGBoSCx0f/aAAgBAQABPxCBJWEEkk5fxiQJsByQXCD6hMTP1R6T0Hh+2Ko5qVpfv37+Jc6N5xaQgioy5UCzDobrezX4jJJTYr30deJitp1BsTm4Q1DyYdXGKrs1d+BcFQKBl5O/uiKK4P7TOvskvTERBFOQ+1XUeQs6lZkvK45jsENN9r3VxmEWgpfaVcmBNAXTNVMQwQs2PbqA3Ta3X+UyaA2qLlj+gNgKgtedwFxAko2svsyS9GZKIOKRFx8GIf8Az1peWACxy2v3Ko2sB0+gjOIdL1pzxmNVdrl/gg8iNL7kYKFAZ1t0H+/iUrXfrFR83Ka8ouV8z//Z';

export default {
  title: 'displays/AvatarUsername',
  component: AvatarUsername,
  argTypes: {
    ...addInlineRadio<AvatarUsernameProps>('size', AVATAR_USERNAME_SIZES),
  },
  args: {
    username: 'John Doe',
    size: DEFAULT_AVATAR_USERNAME_SIZE,
  },
  parameters: {
    controls: { exclude: ['usernameElement'] },
  },
} as Meta<typeof AvatarUsername>;

const Template: StoryFn<typeof AvatarUsername> = (
  args: AvatarUsernameProps,
) => <AvatarUsername {...args} />;

export const Default: Story = {
  render: Template,
};

export const Image: Story = {
  render: Template,
  args: {
    image: BASE_64_AVATAR,
  },
};

export const CustomUsernameElement: Story = {
  render: Template,
  args: {
    usernameElement: (username: string) => (
      <LinkExternal to="https://www.google.com" withIcon={false}>
        {username}
      </LinkExternal>
    ),
  },
};

export const AllSizes: Story = {
  render: (props: AvatarUsernameProps) => (
    <Stack direction="column" gap={9}>
      {AVATAR_USERNAME_SIZES.map(size => (
        <AvatarUsername key={size} {...props} size={size} />
      ))}
    </Stack>
  ),
  parameters: {
    controls: { exclude: ['size'] },
  },
};
