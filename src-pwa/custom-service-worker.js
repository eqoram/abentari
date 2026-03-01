/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config file > pwa > workboxMode is set to "InjectManifest"
 */

import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';

self.skipWaiting();
clientsClaim();

// Disable precaching (clear the precache manifest)
// prettier-ignore
self.__WB_MANIFEST; // No files will be precached
precacheAndRoute([]);

// Prevent caching of any requests by always fetching from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)); // Always fetch from the network (no cache)
});
