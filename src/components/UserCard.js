export default function UserCard({ user }) {
  return (
    <div style={{ border: '1px solid #aaa', padding: '10px' }}>
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}
