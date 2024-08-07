import React, { useState } from 'react';

function Settings() {
  const [reminderTime, setReminderTime] = useState('');
  const [reminderDayBefore, setReminderDayBefore] = useState(false);

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch('backend/update_settings.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 1, reminderTime, reminderDayBefore }), // Replace with dynamic user ID
    });
    const data = await response.json();
    if (data.success) {
      // Handle successful settings update
    } else {
      // Handle settings update error
    }
  };

  return (
    <div className="container">
      <h1>Settings</h1>
      <form onSubmit={handleSettingsUpdate}>
        <label>Reminder Time</label>
        <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
        <label>
          <input type="checkbox" checked={reminderDayBefore} onChange={(e) => setReminderDayBefore(e.target.checked)} />
          Remind me one day before
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default Settings;
