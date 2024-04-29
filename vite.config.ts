import { defineConfig,loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import { resolve } from "path";
// @ts-ignore
import Components from "unplugin-vue-components/vite";
// @ts-ignore
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  // 运行模式
  console.log('mode',mode)
  // 当前路径
  console.log('process.cwd()',process.cwd())
  // @ts-ignore
  const env=loadEnv(mode,process.cwd())
  console.log('env',env)
  const proxy={
    "^/api/": {
      target: env.VITE_APP_HOST,
      changeOrigin: true,
      ws: true,
      rewrite: (path: any) => path.replace(/^\/api/, ""),
    },
  };

  return {
    // 打包相对路径
    base: './',
    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        ...proxy
      },
    },
    "css": {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          patterns: [resolve(__dirname, "./src/style/main.less")],
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
  }
});

