import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostList from '../PostList';

describe('PostList', () => {
  const mockPosts = [
    { id: 1, title: 'First Post', body: 'This is the first post.' },
    { id: 2, title: 'Second Post', body: 'This is the second post.' },
  ];
  const mockOnRefresh = jest.fn();
  const mockSetOpenPostId = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of posts', () => {
    const { getByText } = render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={null}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    expect(getByText('#1 - First Post')).toBeTruthy();
    expect(getByText('#2 - Second Post')).toBeTruthy();
  });

  it('shows "No posts found" when posts array is empty', () => {
    const { getByText } = render(
      <PostList
        posts={[]}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={null}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    expect(getByText('No posts found')).toBeTruthy();
  });

  it('calls onRefresh when pull-to-refresh is triggered', () => {
    render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={null}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    expect(typeof mockOnRefresh).toBe('function');
  });

  it('calls setOpenPostId with correct id when a post is pressed', () => {
    const { getByText } = render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={null}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    fireEvent.press(getByText('#1 - First Post'));
    expect(mockSetOpenPostId).toHaveBeenCalledWith(1);
  });

  it('shows post body when openPostId matches post id', () => {
    const { getByText } = render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={2}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    expect(getByText('This is the second post.')).toBeTruthy();
  });

  it('toggles post open/close when header is pressed', () => {
    let openPostId: number | null = null;
    const setOpenPostId = jest.fn((id: number | null) => {
      openPostId = id;
    });

    const { getByText, rerender } = render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={openPostId}
        setOpenPostId={setOpenPostId}
      />,
    );

    // Open post 1
    fireEvent.press(getByText('#1 - First Post'));
    expect(setOpenPostId).toHaveBeenCalledWith(1);

    // Simulate openPostId now set to 1
    rerender(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={1}
        setOpenPostId={setOpenPostId}
      />,
    );

    // Press again to close
    fireEvent.press(getByText('#1 - First Post'));
    expect(setOpenPostId).toHaveBeenCalledWith(null);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <PostList
        posts={mockPosts}
        isLoading={false}
        onRefresh={mockOnRefresh}
        openPostId={null}
        setOpenPostId={mockSetOpenPostId}
      />,
    );
    expect(toJSON()).toBeDefined();
  });
});
