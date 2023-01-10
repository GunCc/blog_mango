import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import WindiCSS from "vite-plugin-windicss"
import { getThemeVariables } from "ant-design-vue/dist/theme"
import path from "node:path";
const modifyVars = getThemeVariables();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    WindiCSS(),
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less", // 一定要开启这个配置项
        })
      ]
    })
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名，该配置同时解决ant-design-vue中单页递归生成导航菜单时会出现异常的问题
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `${modifyVars.hack} @import "${path.resolve('src/design/index.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
});
