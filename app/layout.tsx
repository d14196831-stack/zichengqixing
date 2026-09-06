import type { Metadata } from 'next';
import './globals.css';
import './design-v2.css';
import './literature.css';
export const metadata: Metadata = {
  title: '自成其形 · 交互读本',
  icons: { icon: './favicon.svg' },
  description: '从哲学底座、五部作品的阅读互照、六扇门的体系地图与完整原文，阅读、理解《自成其形》。',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
