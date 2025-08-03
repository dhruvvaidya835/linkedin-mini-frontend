import PostCard from '../../components/PostCard';

export default function FeedPage() {
  const dummyPosts = [
    { id: 1, user: 'Alice', content: 'Hello, LinkedIn Mini!' },
    { id: 2, user: 'Bob', content: 'Just posted something new.' },
  ];

  return (
    <div>
      <h2>Feed</h2>
      {dummyPosts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}