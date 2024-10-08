import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
  ],
  assetsInclude: ["**/*.md"],
});
