import UserCard from '../../components/UserCard';

export default function ProfilePage() {
  const user = {
    name: 'Dhruv Vaidya',
    bio: 'Full-stack Developer',
  };

  return (
    <div>
      <h2>My Profile</h2>
      <UserCard user={user} />
    </div>
  );
}