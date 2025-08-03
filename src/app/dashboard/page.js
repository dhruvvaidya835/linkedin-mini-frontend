'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setUser(data);

        // Load posts (dummy for now)
        setPosts([
          { id: 1, author: data.name, content: 'Excited to join this new platform!' },
          { id: 2, author: data.name, content: 'Just updated my profile.' },
        ]);
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = { id: Date.now(), author: user.name, content: newPost };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  if (!user) return <div style={styles.loading}>Loading your professional space...</div>;

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.email}>{user.email}</p>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Your Dashboard</h1>

        {/* About Section */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>About You</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || 'Not provided yet'}</p>
        </div>

        {/* Post Section */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>Create a Post</h3>
          <textarea
            style={styles.textarea}
            placeholder="Share what's on your mind..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button onClick={handlePost} style={styles.postButton}>Post</button>
        </div>

        {posts.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.subheading}>Your Posts</h3>
            {posts.map(post => (
              <div key={post.id} style={styles.postItem}>
                <strong>{post.author}</strong>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions Section */}
        <div style={styles.card}>
          <h3 style={styles.subheading}>Suggested Connections</h3>
          <ul style={styles.suggestions}>
            <li style={styles.suggestionItem}>
              <strong>Anya Tiwari</strong> – Frontend Engineer
              <button style={styles.connectButton}>Connect</button>
            </li>
            <li style={styles.suggestionItem}>
              <strong>Ravi Sharma</strong> – Data Analyst
              <button style={styles.connectButton}>Connect</button>
            </li>
            <li style={styles.suggestionItem}>
              <strong>Fatima Khan</strong> – UI/UX Designer
              <button style={styles.connectButton}>Connect</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f6f8',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    margin: '0 auto 1rem',
    backgroundColor: '#0073b1',
    color: 'white',
    fontSize: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
    color: '#333',
  },
  email: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '1.5rem',
  },
  logout: {
    backgroundColor: '#e53935',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  card: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  },
  subheading: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'none',
    marginBottom: '1rem',
    fontFamily: 'inherit',
  },
  postButton: {
    backgroundColor: '#0073b1',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    border: '1px solid #e0e0e0',
  },
  loading: {
    fontSize: '1.2rem',
    paddingTop: '4rem',
    textAlign: 'center',
    color: '#555',
  },
  suggestions: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  suggestionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  connectButton: {
    backgroundColor: '#0073b1',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};
