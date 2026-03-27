import './globals.css';

export const metadata = {
  title: 'Lojanias | Cafe de altura',
  description: 'Landing ecommerce premium para Lojanias, cafe de altura de Loja, Ecuador.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
