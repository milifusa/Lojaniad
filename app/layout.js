import './globals.css';

export const metadata = {
  title: 'Lojanías | Café de altura de Loja',
  description: 'Descubre el café de altura de Lojanías, sus perfiles de tueste y sus métodos de preparación. Desde Loja, Ecuador.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
