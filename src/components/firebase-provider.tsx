'use client';

import { useEffect } from 'react';
import { app } from '@/lib/firebase';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Firebase app is initialized when the module is imported
    // Analytics is handled in the firebase.ts file
    if (app) {
      console.log('Firebase initialized successfully');
    }
  }, []);

  return <>{children}</>;
}
