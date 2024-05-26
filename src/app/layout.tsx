import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import TopNavBar from '@src/components/Navbar';
import { AppContextProvider } from '@src/context';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import theme from '../theme';
// import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tourism Recomendations',
  description: 'One stop search for your next travel'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className} style={{ margin: 0 }}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>
            <AppContextProvider>
              <TopNavBar>{children}</TopNavBar>
            </AppContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
