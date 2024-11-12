import React, { useState, useEffect } from 'react';
import {useAdmin} from "@/lib/hooks/useAdmin.ts";

export default function AdminPage() {
 const user = useAdmin();
  return (
    <div>
      <h1>Správa uživatelských účtů</h1>

    </div>
  );
}
