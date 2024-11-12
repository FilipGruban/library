import React from 'react';
import { User } from '@/classes/User';
import { Reader } from '@/classes/Reader';

interface UserListProps {
  readers: Reader[];
  deleteUser: (user: User) => void;
}

export default function UserList({ readers, deleteUser }: UserListProps) {
  return (
    <div>
      <h2>Seznam uživatelských účtů</h2>
      <ul>
        {readers.map((reader) => (
          <li key={reader.name}>
            <strong>{reader.name}</strong>
            <button onClick={() => deleteUser(reader)}>Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
