import Link from 'next/link';
import { AdminLogin, AdminPanel } from '@/components/AdminPanel';
import { hasAdminSession } from '@/lib/admin-session';
import { applyEdits, readEdits } from '@/lib/published-content';
import { logout } from './actions';
import './editor.css';

export const metadata = {
  title: 'Administración | Lojanías',
  robots: { index: false, follow: false }
};

export default async function AdminPage() {
  const authenticated = await hasAdminSession();
  let content;
  if (authenticated) {
    try {
      content = applyEdits((await readEdits()).edits);
    } catch (error) {
      console.error('No se pudo abrir el editor:', error.name);
    }
  }

  return (
    <main className={`editor${authenticated ? '' : ' editor-locked'}`}>
      <header className="editor-header">
        <div>
          <p className="editor-kicker">Lojanías · Administración</p>
          <h1>{authenticated ? 'Editar la tienda' : 'Acceso privado'}</h1>
        </div>
        <div className="editor-nav">
          <Link href="/">Ver tienda</Link>
          {authenticated && <form action={logout}><button type="submit" className="editor-quiet">Cerrar sesión</button></form>}
        </div>
      </header>
      {!authenticated ? <AdminLogin /> : content ? <AdminPanel content={content} /> : (
        <p role="alert" className="editor-notice">El contenido no está disponible. Vuelve a cargar la página para intentarlo de nuevo.</p>
      )}
    </main>
  );
}
