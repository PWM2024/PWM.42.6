import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8iJ_8QJ6C_DsAR5jSo_2HikX8PtlIbq4',
  authDomain: 'fitbyte-pwm-42-6.firebaseapp.com',
  projectId: 'fitbyte-pwm-42-6',
  storageBucket: 'fitbyte-pwm-42-6.appspot.com',
  messagingSenderId: '719921702961',
  appId: '1:719921702961:web:fc15b796309834bc014d10',
  measurementId: 'G-D9525ZZHSL',
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
