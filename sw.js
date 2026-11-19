// Keeps the demo available offline. Cache-first; anything new (e.g. the Poppins font) is kept after the first online use.
const CACHE = "lost-elements-demo-demo-offline-2";
const FILES = [
 "./",
 "./index.html",
 "./demo-data.enc.js?v=demo-offline-2",
 "./styles.css?v=demo-offline-2",
 "./favicon.svg",
 "./Graphics/2.%20Element%20Icon%20Graphics%20(11%20May)/Metal%20Element.png",
 "./Graphics/2.%20Element%20Icon%20Graphics%20(11%20May)/Fire%20Element.png",
 "./Graphics/2.%20Element%20Icon%20Graphics%20(11%20May)/Water%20Element.png",
 "./Graphics/2.%20Element%20Icon%20Graphics%20(11%20May)/Earth%20Element.png",
 "./Graphics/2.%20Element%20Icon%20Graphics%20(11%20May)/Final%20Nexus%20Icon.png",
 "./Graphics/3.%20Blank%20Pages%20Background/Cover_Page_Logo_Element%20Icons.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Collaboration_Final.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Reflection%20Background.png",
 "./Graphics/3.%20Blank%20Pages%20Background/Fire%20Element%20Background.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/The%20Final%20Nexus%20Dark.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Water%20Element%20Background%202.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/The%20Lost%20Elements%20Quest%20Banner.png",
 "./Graphics/3.%20Blank%20Pages%20Background/The%20Final%20Nexus%20Bright.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Cover_Page_Blank.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Earth%20element%20page.jpg",
 "./Graphics/3.%20Blank%20Pages%20Background/Metal%20Element%20Background.jpg",
 "./Graphics/Element%20Quest%20Pages%20(Done)/Select%20First%20Station.jpg",
 "./Graphics/Element%20Quest%20Pages%20(Done)/Water%20Cove%20Station_No%20Text.jpg",
 "./Graphics/Element%20Quest%20Pages%20(Done)/Fire%20Peak%20Station_No%20Text.jpg",
 "./Graphics/Element%20Quest%20Pages%20(Done)/Earth%20Grove%20Station_No%20Text.jpg",
 "./Graphics/Element%20Quest%20Pages%20(Done)/Metal%20Cavern%20Station_No%20Text.jpg",
 "./Graphics/1.%20Icons_General%20Page%20(18June)/Bonus%20star.png",
 "./Graphics/1.%20Icons_General%20Page%20(18June)/icon_lightbulb.png",
 "./Graphics/1.%20Icons_General%20Page%20(18June)/icon_safe.png",
 "./Graphics/1.%20Icons_General%20Page%20(18June)/icon_scroll.png",
 "./Graphics/1.%20Icons_General%20Page%20(18June)/icon_lock.png"
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
