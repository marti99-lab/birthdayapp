import React, { useState, useEffect } from 'react';
import './calendar.css';

function CalendarView() {
  const [friends, setFriends] = useState([]);

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

  const getCategoryClass = (category) => {
    switch (category) {
      case 'family':
        return 'family';
      case 'friends':
        return 'friends';
      case 'arbeitskollegen':
        return 'arbeitskollegen';
      default:
        return '';
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date().getDaysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayFriends = friends.filter(friend => new Date(friend.friendDob).getDate() === i);
      days.push(
        <div key={i} className={`calendar-day ${dayFriends.map(friend => getCategoryClass(friend.category)).join(' ')}`}>
          {i}
          {dayFriends.length > 0 && (
            <div className="tooltip">
              {dayFriends.map(friend => (
                <p key={friend.friendName}>{friend.friendName}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="container">
      <h1>Calendar View</h1>
      <div className="calendar">
        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default CalendarView;
