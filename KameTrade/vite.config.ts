import * as path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "KameTrade",
    plugins: [react()],
    resolve: {
        alias: [{ find: "src", replacement: path.resolve(__dirname, "src") }],
    },
});
