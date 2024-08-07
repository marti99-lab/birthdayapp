import React, { useState, useEffect } from 'react';

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');
  const [friendDob, setFriendDob] = useState('');
  const [category, setCategory] = useState('friends');

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch('backend/get_friends.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1 }), // Replace with dynamic user ID
      });
      const data = await response.json();
      setFriends(data);
    };
    fetchFriends();
  }, []);

  const handleAddFriend = async (e) => {
    e.preventDefault();
    const response = await fetch('backend/add_friend.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 1, friendName, friendDob, category }), // Replace with dynamic user ID
    });
    const data = await response.json();
    if (data.success) {
      setFriends([...friends, { friendName, friendDob, category }]);
    } else {
      // Handle error
    }
  };

  return (
    <div className="container">
      <h1>Friend List</h1>
      <form onSubmit={handleAddFriend}>
        <label>Friend's Name</label>
        <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />
        <label>Friend's Date of Birth</label>
        <input type="date" value={friendDob} onChange={(e) => setFriendDob(e.target.value)} />
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="arbeitskollegen">Arbeitskollegen</option>
        </select>
        <button type="submit">Add Friend</button>
      </form>
      <div className="friend-list">
        {friends.map((friend, index) => (
          <div key={index} className="friend-item">
            <p>{friend.friendName} ({friend.friendDob}) - {friend.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendList;
