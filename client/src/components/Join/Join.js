import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const onChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'room':
        setRoom(e.target.value);
        break;
      default:
        break;
    }
  };

  const onLinkClick = e => {
    if (!name || !room) {
      e.preventDefault();
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chat</h1>
        <div>
          <input
            name="name"
            placeholder="Name"
            className="joinInput"
            onChange={onChange}
          />
          <input
            name="room"
            placeholder="Room"
            className="joinInput mt-20"
            onChange={onChange}
          />
          <Link onClick={onLinkClick} to={`/chat?name=${name}&room=${room}`}>
            <button className="button mt-20" type="submit">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
