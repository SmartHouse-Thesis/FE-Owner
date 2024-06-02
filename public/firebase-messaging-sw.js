// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyA7whJONp5a-D-Taxc5Hq3LqxO0RG0aDB0",
  authDomain: "smarthome-856d3.firebaseapp.com",
  projectId: "smarthome-856d3",
  storageBucket: "smarthome-856d3.appspot.com",
  messagingSenderId: "138230736587",
  appId: "1:138230736587:web:a78b467fb9d3d04aa25d4e",
  measurementId: "G-STRZ5HY3LB",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.title,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
