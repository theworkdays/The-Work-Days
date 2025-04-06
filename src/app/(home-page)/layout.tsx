import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 0.9,
}
  export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }