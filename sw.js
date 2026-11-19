// Keeps the demo available offline. Cache-first; anything new (e.g. the Poppins font) is kept after the first online use.
const CACHE = "lost-elements-demo-demo-offline-2";
const FILES = [
 "./",
 "./index.html",
 "./demo-data.enc.js?v=demo-offline-2",
 "./styles.css?v=demo-offline-2",
 "./favicon.svg",
 "./Bonus%20star.png",
 "./Collaboration_Final.jpg",
 "./Cover_Page_Blank.jpg",
 "./Cover_Page_Logo_Element%20Icons.jpg",
 "./Earth%20Element.png",
 "./Earth%20Grove%20Station_No%20Text.jpg",
 "./Earth%20element%20page.jpg",
 "./Final%20Nexus%20Icon.png",
 "./Fire%20Element%20Background.jpg",
 "./Fire%20Element.png",
 "./Fire%20Peak%20Station_No%20Text.jpg",
 "./Metal%20Cavern%20Station_No%20Text.jpg",
 "./Metal%20Element%20Background.jpg",
 "./Metal%20Element.png",
 "./Reflection%20Background.png",
 "./Select%20First%20Station.jpg",
 "./The%20Final%20Nexus%20Bright.jpg",
 "./The%20Final%20Nexus%20Dark.jpg",
 "./The%20Lost%20Elements%20Quest%20Banner.png",
 "./Water%20Cove%20Station_No%20Text.jpg",
 "./Water%20Element%20Background%202.jpg",
 "./Water%20Element.png",
 "./icon_lightbulb.png",
 "./icon_lock.png",
 "./icon_safe.png",
 "./icon_scroll.png"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: false }).then((hit) => hit || fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
