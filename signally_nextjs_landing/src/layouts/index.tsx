import { ReactNode } from 'react';
import LayoutMain from './_layout_main/LayoutMain';

export type ILayoutProps = {
  children: ReactNode;
  variant?: 'landing' | 'logoOnly' | 'landing';
};

export default function Layout({ children, variant = 'landing' }: ILayoutProps) {
  if (variant === 'landing') return <LayoutMain>{children}</LayoutMain>;
  return <LayoutMain>{children}</LayoutMain>;
}
