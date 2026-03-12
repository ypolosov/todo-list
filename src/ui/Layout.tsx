import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="layout">
      <header className="header">
        <h1>Todo List</h1>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
