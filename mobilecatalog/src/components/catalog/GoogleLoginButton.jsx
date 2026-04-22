import { useEffect, useRef, useState } from 'react';
import { loginWithGoogle } from '../../services/authApi';

const GOOGLE_SCRIPT_ID = 'google-identity-services';

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_SCRIPT_ID;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

export const GoogleLoginButton = ({ onSuccess }) => {
  const buttonRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setStatus('missing-client-id');
      return;
    }

    let mounted = true;

    loadGoogleScript()
      .then(() => {
        if (!mounted || !buttonRef.current || !window.google?.accounts?.id) {
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              setStatus('loading');
              setLoginErrorMessage('');
              const user = await loginWithGoogle(response.credential);
              onSuccess(user);
              setStatus('ready');
            } catch (error) {
              console.error('Erro ao validar login com o backend:', error);
              setLoginErrorMessage(
                error.response?.data?.message || 'Login negado. Verifique se este e-mail esta liberado no backend e tente novamente.'
              );
              setStatus('login-error');
            }
          }
        });

        buttonRef.current.innerHTML = '';

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'signin_with',
          width: 320
        });

        setStatus('ready');
      })
      .catch((error) => {
        console.error('Erro ao carregar o Google Identity Services:', error);
        if (mounted) {
          setStatus('error');
        }
      });

    return () => {
      mounted = false;
    };
  }, [onSuccess]);

  if (status === 'missing-client-id') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Defina `REACT_APP_GOOGLE_CLIENT_ID` no ambiente para habilitar o login com Google.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Nao foi possivel carregar o login do Google. Verifique sua conexao e tente novamente.
      </div>
    );
  }

  if (status === 'login-error') {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {loginErrorMessage || 'Login negado. Verifique se este e-mail esta liberado no backend e tente novamente.'}
        </div>
        <div className="flex justify-center">
          <div ref={buttonRef} className="min-h-11" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        ref={buttonRef}
        className={`min-h-11 ${status === 'loading' ? 'pointer-events-none opacity-60' : ''}`}
      />
    </div>
  );
};
