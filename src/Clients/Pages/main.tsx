import React, { useEffect } from "react";
import {useState}  from 'react';
import { supabaseClient } from "../../supabaseClient";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<any[] | null>();

  useEffect(() => {
    supabaseClient
      .from("usuarios")
      .select("*")
      .then((response) => setUsuarios(response.data));
      
  });

  return (
    <div>
      {usuarios && (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.nombres}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
