import React, { useState } from 'react';

interface UserFormProps {
  addUser: (name: string) => void;
}

export default function UserForm({ addUser }: UserFormProps) {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return; // Kontrola vyplnění
    addUser(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Přidat uživatelský účet</h2>
      <label>
        Jméno:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Přidat uživatele</button>
    </form>
  );
}
