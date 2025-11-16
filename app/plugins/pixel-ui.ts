import PixelUI from "@mmt817/pixel-ui";
import "@mmt817/pixel-ui/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PixelUI);
});
