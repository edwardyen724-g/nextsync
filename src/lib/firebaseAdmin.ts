import admin from 'firebase-admin';

admin.initializeApp();

export const adminInstance = admin;

export const admin = adminInstance;
