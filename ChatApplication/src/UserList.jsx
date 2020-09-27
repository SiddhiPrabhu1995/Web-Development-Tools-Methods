import React from 'react';

const UserList = ({ userList }) => {
  return (
    <div className="users">
      <p>Users Online....</p>  
      <ul>
        {userList.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
