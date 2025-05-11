// Importación de hooks y librerías necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Importación de estilos y recursos visuales
import './css/index.css';
import './css/general.css';
import logoAI from './imagenes/LogoAI.png';
import logoMF from './imagenes/LogoMF.png';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

  // Realiza la petición POST al backend con los datos del usuario
    try {
      const response = await axios.post('http://localhost:3001/login', {
        user: username,
        pass: password
      });

      // Si el login fue exitoso
      console.log('Usuario autenticado:', response.data.user);
      setError('');
      navigate('/menu'); // Redirige al menú principal
    } catch (err) {
      // Si ocurre un error en la autenticación
      if (err.response && err.response.status === 401) {
        setError('Usuario o contraseña incorrectos');
      } else {
        setError('Error en el servidor o en la conexión');
      }
    }
  };

  return (
    <div className="auth-container login-page">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className="error">{error}</p>}

      <button onClick={() => alert('Aquí podrías redirigir al registro')}>
        ¿No tienes cuenta? Regístrate aquí
      </button>

      <div id="Logo_AI">
        <img src={logoAI} alt="Logo Empresa" width="150" height="150" />
      </div>
      <div id="Logo_MF">
        <img src={logoMF} alt="Logo" width="150" height="150" />
      </div>
    </div>
  );
}

export default App;


