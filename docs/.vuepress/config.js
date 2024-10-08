import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { removeHtmlExtensionPlugin } from "vuepress-plugin-remove-html-extension";
import { oml2dPlugin } from "vuepress-plugin-oh-my-live2d";
import { defineConfig } from "vite";
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: defineConfig(),
  }),
  // 主题和它的配置
  theme: defaultTheme({
    logo: "/images/logo.jpg",
    repo: "https://github.com/YukiAoi/Front-end-note",
    navbar: [
      {
        text: "Vue",
        link: "/vue/vue",
      },
    ],
    // sidebar,
    sidebar: [
      {
        text: "Vue",
        prefix: "/vue/",
        link: "/vue/vue",
        children: [
          "vue",
          "spa",
          "if_show",
          "new_vue",
          "lifecycle",
          "if_for",
          "first_page_time",
          "data",
          "data_object_add_attrs",
          "components_plugin",
          "communication",
          "bind",
          "nextTicket",
          "mixin",
          "slot",
          "observable",
          "key",
          "keepalive",
          "modifier",
          "directive",
          "filter",
          "vnode",
          "diff",
          "axios",
          "ssr",
          "structure",
          "permission",
          "cors",
          "404",
          "error",
          "vue3_vue2",
        ],
      },
      {
        text: "Vue3",
        prefix: "/vue3/",
        link: "/vue3/goal",
        children: [
          "goal",
          "performance",
          "proxy",
          "composition",
          "treeShaking",
          "modal_component",
        ],
      },
      {
        text: "Es6",
        prefix: "/es6/",
        link: "/es6/var_let_const",
        children: [
          "var_let_const",
          "array",
          "object",
          "function",
          "set_map",
          "promise",
          "generator",
          "proxy",
          "module",
          "decorator",
          "plus",
        ],
      },
      {
        text: "Javascript",
        prefix: "/javascript/",
        link: "/javascript/data_type",
        children: [
          "data_type",
          "array_api",
          "string_api",
          "type_conversion",
          "equal",
          "copy",
          "closure",
          "scope",
          "prototype",
          "inherit",
          "this",
          "context_stack",
          "event_model",
          "typeof_instanceof",
          "event_agent",
          "new",
          "ajax",
          "bind_call_apply",
          "regexp",
          "event_loop",
          "dom",
          "bom",
          "recursion",
          "memory_leak",
          "cache",
          "functional_programming",
          "function_cache",
          "loss_accuracy",
          "debounce_throttle",
          "visible",
          "continue_to_upload",
          "pull_up_loading_pull_down_refresh",
          "single_sign_on",
          "security",
        ],
      },
      {
        text: "Css",
        prefix: "/css/",
        link: "/css/box",
        children: [
          "box",
          "selector",
          "em_px_rem_vh_vw",
          "dp_px_dpr_ppi",
          "hide_attributes",
          "bfc",
          "center",
          "column_layout",
          "flex",
          "grid",
          "css3_features",
          "animation",
          "layout_painting",
          "responsive_layout",
          "css_performance",
          "single_multi_line",
          "visual_scrolling",
          "triangle",
          "less_12px",
          "sass_less_stylus",
        ],
      },
      {
        text: "Html",
        prefix: "/html/",
        link: "/html/html5",
        children: [
          "html5",
          "http_https",
          "https",
          "udp_tcp",
          "osi",
          "tcp_ip",
          "dns",
          "cdn",
          "1.0_1.1_2.0",
          "status",
          "get_post",
          "headers",
          "after_url",
          "handshakes_waves",
          "websocket",
          "cache",
        ],
      },
      {
        text: "TypeScript",
        prefix: "/typescript/",
        link: "/typescript/typescript",
        children: [
          "typescript",
          "data_type",
          "interface",
          "class",
          "function",
          "generic",
          "high_type",
          "decorator",
          "namespace_module",
          "vue",
        ],
      },
      {
        text: "Webpack",
        prefix: "/webpack/",
        link: "/webpack/webpack",
        children: [
          "webpack",
          "build_process",
          "loader",
          "plugin",
          "loader_plugin",
          "hmr",
          "proxy",
          "performance",
          "improve_build",
          "similar_tools",
        ],
      },
    ],
    editLink: false,
    locales: {
      "/": {
        lastUpdatedText: "上次更新",
        contributorsText: "哪个哈板儿写的",
        notFound: ["哦豁，啥子都找不到的哇"],
        backToHome: "各回各家，各找各妈",
        prev: "捅楼上钩子",
        next: "朝楼下拉屎",
      },
    },
  }),
  // 站点配置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "舞鹤港给大和擦甲板的T头菇",
      description: "前端学习笔记",
      head: [["link", { rel: "icon", href: "/images/logo.jpg" }]],
    },
  },
  // 插件
  plugins: [
    // 生成没有html扩张名的干净url
    removeHtmlExtensionPlugin(),
    // 搜索框
    searchProPlugin({
      // 配置选项
      indexContent: true,
      autoSuggestions: true,
    }),
    oml2dPlugin({
      dockedPosition: "right",
      models: [
        {
          path: "https://model.oml2d.com/Kar98k-normal/model.json",
          position: [35, 5],
          scale: 0.085,
          stageStyle: {
            right: "60px",
          },
        },
      ],
      tips: {
        style: {
          top: "-80px",
        },
      },
    }),

    // myPlugin(__dirname, "./plugins/file-list-plugin"),
  ],
});
