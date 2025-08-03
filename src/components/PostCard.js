export default function PostCard({ post }) {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
      <h4>{post.user}</h4>
      <p>{post.content}</p>
    </div>
  );
}