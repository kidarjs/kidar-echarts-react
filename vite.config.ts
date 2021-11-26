// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from "less-vars-to-js";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { ViteAliases } from "vite-aliases";
import Inspect from "vite-plugin-inspect";
import reactJsx from "vite-react-jsx";
import { resolve } from "path";
import fs from "fs";

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver("./config/variables.less"), "utf8")
);

const external = ['react', 'react-dom', 'echarts', 'nkxrb-tools', 'kidar-echarts-plugins']
const globals = {
  'echarts': 'echarts',
  'react': 'React',
  'react-dom': 'ReactDom',
  'nkxrb-tools': 'NkxrbTools',
  'kidar-echarts-plugins': 'KidarEchartsPlugins',
}

export default defineConfig({
  base: "./",
  plugins: [
    Inspect(),
    ViteAliases({}),
    reactJsx(),
    reactRefresh()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  build: {
    minify: true,
    outDir: 'lib',
    lib: {
      entry: './src/index.tsx',
      fileName: 'kidar-echarts-react',
      name: 'KIDAR_ECHARTS'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: external,
      output: [
        {
          format: "es",
          esModule: true,
          exports: "named",
          globals: globals
        },
        {
          format: 'umd',
          inlineDynamicImports: true,
          interop: "esModule",
          exports: "named",
          globals: globals
        }
      ]
    }
  }
});
