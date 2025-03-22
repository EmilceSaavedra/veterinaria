import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await login(username, password);
        console.log("Respuesta después de login:", response);
    
        if (response && response.user) {
          const role = response.user.rol; // Cambiar a "rol" en lugar de "role"
    
          toast.success("¡Inicio de sesión exitoso!", {
            position: "top-right",
            autoClose: 1500,
          });
    
          // Redirección basada en rol
          if (role === "admin") {
            navigate("/veterinarios/admin", { replace: true });
          } else if (role === "miembro") {
            navigate("/veterinarios/lista", { replace: true });
          } else {
            navigate("/inicio", { replace: true }); // Ruta por defecto
          }
        }
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message || "Error al iniciar sesión");
        toast.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      }
    };
    return (
      <div className="login-container">
          <div className="login-box">
              <div className="login-header">
                  <img src="/logo.png" alt="Logo" className="login-logo" />
                  <h2>Bienvenido</h2>
                  <p>Ingrese sus credenciales para continuar</p>
              </div>
              
              <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                      <div className="input-group">
                          <span className="input-icon">
                              <FaUser />
                          </span>
                          <input
                              type="text"
                              placeholder="Usuario"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                          />
                      </div>
                  </div>

                  <div className="form-group">
                      <div className="input-group">
                          <span className="input-icon">
                              <FaLock />
                          </span>
                          <input
                              type="password"
                              placeholder="Contraseña"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                      </div>
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button type="submit" className="login-button">
                      <FaSignInAlt className="me-2" />
                      Iniciar Sesión
                  </button>
              </form>
          </div>
          <ToastContainer />
      </div>
  );
}

export default Login;