import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center p-24 w-full bg-secondary min-h-screen">
      {children}
    </div>
  );
}
