import { faker } from '@faker-js/faker';
import { range } from '@gatewatcher/bistoury/utils-lang';
import type { Meta, StoryObj } from '@storybook/react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import type { Comment, PaginatedApiResponse } from '@/mocks/types';

import Comments from '.';
import Avatar from '../Avatar';
import Dropdown from '../floating/Dropdown';
import type { OnSubmitCallbacks } from './compounds/FormUpdate';
import ReplyAction from './compounds/ReplyAction';

type Story = StoryObj<typeof Comments>;

faker.seed(10);
faker.setDefaultRefDate(new Date('2024-01-01'));

export default {
  title: 'displays/Comments',
  component: Comments,
  decorators: [mockDateDecorator],
  parameters: {
    date: new Date('2024-01-01'),
  },
} as Meta<typeof Comments>;

export const Default: Story = {
  render: () => {
    const reply = async () => {
      const res = await fetch(`/comments-post`, {
        method: 'POST',
        body: JSON.stringify({
          message: 'message',
        }),
      });
      return res.json();
    };

    const mutation = useMutation({
      mutationFn: reply,
    });

    const comments: Comment[] = range({ stop: 4 }).map((nb: number) => ({
      id: nb.toString(),
      content: faker.lorem.paragraphs({ min: 1, max: 3 }),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.helpers.maybe(() => faker.date.recent().toISOString()),
      created_by: `user ${nb}`,
    }));

    return (
      <Comments>
        <Comments.Header>
          <Comments.Title count={comments.length}>Comments</Comments.Title>
        </Comments.Header>
        <Comments.Form
          name="message"
          onSubmit={() => mutation.mutateAsync()}
          placeholder="type message here"
          rules={[{ max: 200, type: 'string' }]}
        />
        <Comments.List
          data={comments}
          hasNextPage={false}
          loadMoreButton={<Comments.LoadMoreButton />}
          totalItemsCount={comments.length}
        >
          {item => {
            const repliesCount = faker.number.int({ min: 0, max: 3 });
            const replies: Comment[] = range({ stop: repliesCount }).map(
              () => ({
                content: faker.lorem.paragraph(),
                created_at: '',
                created_by: faker.person.fullName(),
                id: faker.string.uuid(),
                updated_at: '',
              }),
            );

            return (
              <Comments.Comment
                key={item.id}
                actions={
                  <Comments.Actions>
                    <Comments.EditAction />
                    <ReplyAction id={item.id} />
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
                footer={
                  <Comments.CommentFooter
                    users={
                      <Avatar.Stack>
                        {replies.map(comment => (
                          <Avatar
                            key={comment.created_by}
                            username={comment.created_by}
                          />
                        ))}
                      </Avatar.Stack>
                    }
                    id={item.id}
                    repliesCount={repliesCount}
                  />
                }
                replyForm={
                  <Comments.Reply
                    depth={repliesCount ? 1 : 0}
                    name="message"
                    onSubmit={() => mutation.mutate()}
                    placeholder="Write a reply"
                    username="John Doe"
                  />
                }
                thread={
                  <Comments.Thread
                    data={replies}
                    loadMoreButton={<Comments.LoadMoreButton />}
                  >
                    {comment => (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        depth={1}
                      />
                    )}
                  </Comments.Thread>
                }
                updateForm={
                  <Comments.FormUpdate
                    initialValue={item.content}
                    name="message"
                    onSubmit={() => mutation.mutateAsync()}
                  />
                }
                comment={item.content}
                createdAt={item.created_at}
                id={item.id}
                updatedAt={item.updated_at}
                username={item.created_by}
              />
            );
          }}
        </Comments.List>
      </Comments>
    );
  },
};

const Thread = () => {
  const fetchData = async (
    page = 1,
  ): Promise<PaginatedApiResponse<Comment>> => {
    const res = await fetch(`/comments?page=${page}&page_size=5`);
    return res.json();
  };

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PaginatedApiResponse<Comment>>({
      queryKey: ['comments'],
      queryFn: ({ pageParam }) => fetchData(pageParam),
      getNextPageParam: lastPage => lastPage.next,
    });

  return (
    <Comments.Thread
      loadMoreButton={({ isLoading }) => (
        <Comments.LoadMoreButton
          isLoading={isLoading}
          onClick={() => fetchNextPage()}
        />
      )}
      data={data?.pages.flatMap(item => item.results)}
      hasNextPage={hasNextPage}
      initialPerPage={5}
      isLoading={isLoading || isFetchingNextPage}
      totalItemsCount={data?.pages[0].count}
    >
      {item => <CommentItem key={item.id} comment={item} depth={1} />}
    </Comments.Thread>
  );
};

export type CommentItemProps = {
  comment: Comment;
  depth?: number;
  withThread?: boolean;
};
const CommentItem = ({
  comment,
  depth,
  withThread = false,
}: CommentItemProps) => {
  const handleUpdate = (
    message: string,
    { closeEditMode }: OnSubmitCallbacks,
  ) => {
    console.log(message);
    closeEditMode();
  };

  return (
    <Comments.Comment
      key={comment.id}
      actions={
        <Comments.Actions>
          <Comments.EditAction />
          <Comments.MoreActions
            actions={
              <>
                <ReplyAction id={comment.id} />
                <Dropdown.Button icon="Action" size="small">
                  Action
                </Dropdown.Button>
                <Dropdown.Button icon="Delete" size="small" type="danger">
                  Delete
                </Dropdown.Button>
              </>
            }
          />
        </Comments.Actions>
      }
      footer={
        !depth && (
          <Comments.CommentFooter
            users={
              <Avatar.Stack>
                <Avatar username="John Doe" />
                <Avatar username="Marty McFly" />
              </Avatar.Stack>
            }
            id={comment.id}
            repliesCount={2}
          />
        )
      }
      replyForm={
        <Comments.Reply
          depth={1}
          name="message"
          onSubmit={console.log}
          username="John Doe"
        />
      }
      updateForm={
        <Comments.FormUpdate
          initialValue={comment.content}
          name="message"
          onSubmit={handleUpdate}
        />
      }
      comment={comment.content}
      createdAt={comment.created_at}
      depth={depth}
      id={comment.id}
      thread={withThread ? <Thread /> : undefined}
      updatedAt={comment.updated_at}
      username={comment.created_by}
    />
  );
};

export const WithFetch = {
  render: () => {
    const fetchData = async (
      page = 1,
    ): Promise<PaginatedApiResponse<Comment>> => {
      const res = await fetch(`/comments?page=${page}&page_size=5`);
      return res.json();
    };

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
      useInfiniteQuery<PaginatedApiResponse<Comment>>({
        queryKey: ['comments'],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        getNextPageParam: lastPage => lastPage.next,
      });

    return (
      <Comments>
        <Comments.Header>
          <Comments.Title count={50}>Comments</Comments.Title>
        </Comments.Header>
        <Comments.Form
          name="message"
          onSubmit={console.log}
          placeholder="type message here"
          rules={[{ max: 200, type: 'string' }]}
        />
        <Comments.List
          loadMoreButton={({ isLoading }) => (
            <Comments.LoadMoreButton
              isLoading={isLoading}
              onClick={() => fetchNextPage()}
            />
          )}
          data={data?.pages.flatMap(item => item.results)}
          hasNextPage={hasNextPage}
          initialPerPage={5}
          isLoading={isLoading || isFetchingNextPage}
          totalItemsCount={data?.pages[0].count}
        >
          {item => <CommentItem key={item.id} comment={item} withThread />}
        </Comments.List>
      </Comments>
    );
  },
};
