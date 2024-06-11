import { defineClientConfig } from "@vuepress/client";
let sidebar = [];
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    const modules = import.meta.glob("../vue/*.md");
    const sidebarObj = [
      {
        prefix: "/vue/",
        link: "/vue/",
        text: "Vue部分",
        children: [],
      },
    ];
    for (const [key, value] of Object.entries(modules)) {
      let s = sidebarObj.find((i) => key.indexOf(i.link) >= 0);
      s.children.push(key.split(s.link)[1].split(".md")[0]);
    }
    sidebarObj.forEach((i) => {
      sidebar.push(i);
    });
  },
  setup() {},
  rootComponents: [],
});
