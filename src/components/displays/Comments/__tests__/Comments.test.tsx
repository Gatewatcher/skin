import { range } from '@gatewatcher/bistoury/utils-lang';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { CommentsProps } from '..';
import Comments from '..';
import Dropdown from '../../floating/Dropdown';

describe('Comments', () => {
  const TEST_ID: TestId = 'comments';

  const messages = range({ stop: 50 }).map(number => ({
    id: number.toString(),
    content: `content ${number}`,
    created_at: '2024-04-30T04:56:13.186Z',
    updated_at: '2024-07-30T04:56:13.186Z',
    created_by: `user ${number}`,
  }));

  const user = userEvent.setup();

  const renderComponent = ({ ...props }: Partial<CommentsProps> = {}) =>
    render(
      <Comments data-testid={TEST_ID} {...props}>
        <Comments.Header>
          <Comments.Title count={2}>Comments</Comments.Title>
        </Comments.Header>
        <Comments.Form name="message" onSubmit={console.log} />
        <Comments.List
          data={messages}
          hasNextPage={true}
          initialPerPage={5}
          loadMoreButton={<Comments.LoadMoreButton />}
          totalItemsCount={messages.length}
        >
          {item => (
            <Comments.Comment
              key={item.id}
              actions={
                <Comments.Actions>
                  <Comments.EditAction />
                  <Comments.MoreActions
                    actions={
                      <>
                        <Dropdown.Button icon="Action" size="small">
                          Action
                        </Dropdown.Button>
                        <Dropdown.Button
                          icon="Delete"
                          size="small"
                          type="danger"
                        >
                          Delete
                        </Dropdown.Button>
                      </>
                    }
                  />
                </Comments.Actions>
              }
              updateForm={
                <Comments.FormUpdate
                  initialValue={item.content}
                  name="message"
                  onSubmit={console.log}
                />
              }
              comment={item.content}
              createdAt={item.created_at}
              id={item.id}
              updatedAt={item.updated_at}
              username={item.created_by}
            />
          )}
        </Comments.List>
      </Comments>,
    );

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument('comments');
    await expectToBeVisibleInTheDocument('comments-header');
    await expectToBeVisibleInTheDocument('comments-title');
  });

  it('should call on submit', async () => {
    const onSubmit = vi.fn();

    render(
      <Comments>
        <Comments.Form
          name="message"
          onSubmit={onSubmit}
          placeholder="placeholder"
        />
      </Comments>,
    );

    await user.type(
      await screen.findByPlaceholderText('placeholder'),
      'message',
    );
    await user.click(await screen.findByText('Submit'));
    expect(onSubmit).toHaveBeenNthCalledWith(1, 'message');
  });

  it('should have form update', async () => {
    const onSubmit = vi.fn();

    render(
      <Comments>
        <Comments.List data={messages} loadMoreButton={<div>button</div>}>
          {item => (
            <Comments.Comment
              key={item.id}
              actions={
                <Comments.Actions>
                  <Comments.EditAction />
                </Comments.Actions>
              }
              updateForm={
                <Comments.FormUpdate
                  name="message"
                  onSubmit={onSubmit}
                  placeholder="placeholder"
                />
              }
              comment={item.content}
              id={item.id}
              username={item.created_by}
            />
          )}
        </Comments.List>
      </Comments>,
    );

    const editActions = await screen.findAllByTestId('comments-edit-action');
    await user.click(editActions[0]);

    const input = await screen.findByPlaceholderText('placeholder');
    await user.clear(input);
    await user.type(input, 'new');

    await user.click(await screen.findByText('Update'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should have reply form', async () => {
    const onReply = vi.fn();

    render(
      <Comments>
        <Comments.List data={messages} loadMoreButton={<div>button</div>}>
          {comment => (
            <Comments.Comment
              key={comment.id}
              actions={
                <Comments.Actions>
                  <Comments.ReplyAction id={comment.id} />
                </Comments.Actions>
              }
              replyForm={
                <Comments.Reply
                  name="message"
                  onSubmit={onReply}
                  placeholder="placeholder"
                  username="jo"
                />
              }
              comment={comment.content}
              id={comment.id}
              username={comment.created_by}
            />
          )}
        </Comments.List>
      </Comments>,
    );

    const replyActions = await screen.findAllByTestId('comments-reply-action');
    await user.click(replyActions[0]);

    const input = await screen.findByPlaceholderText('placeholder');
    await user.type(input, 'reply');

    await user.click(await screen.findByText('Reply'));

    expect(onReply).toHaveBeenCalledWith('reply');
  });
});
