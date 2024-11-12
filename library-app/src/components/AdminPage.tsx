import React, { useState, useEffect } from 'react';
import UserForm from './UserForm.tsx';
import UserList from './UserList.tsx';
import { Admin } from '@/classes/Admin.ts';
import { Library } from '@/classes/Library';
import { User } from '@/classes/User';
import { Reader } from '@/classes/Reader';

const libraryInstance = new Library(); // Předpokládá se, že máš základní instanci knihovny
const adminInstance = new Admin('Admin', libraryInstance);

export default function AdminPage() {
  const [readers, setReaders] = useState<Reader[]>(adminInstance.getUsers());

  const addUser = (name: string) => {
    adminInstance.createUser(name);
    setReaders([...adminInstance.getUsers()]); // Aktualizuje stav
  };

  const deleteUser = (user: User) => {
    adminInstance.deleteUser(user);
    setReaders([...adminInstance.getUsers()]); // Aktualizuje stav
  };

  return (
    <div>
      <h1>Správa uživatelských účtů</h1>
      <UserForm addUser={addUser} />
      <UserList readers={readers} deleteUser={deleteUser} />
    </div>
  );
}
