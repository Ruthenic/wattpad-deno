import { build, emptyDir } from "https://deno.land/x/dnt@0.33.1/mod.ts";
import { VERSION } from "./mod.ts";

await emptyDir("./npm");

await build({
    testPattern: "index.ts",
    rootTestDir: "./tests",
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    scriptModule: false,
    shims: {
        deno: true,
        custom: [{
            package: {
                name: "node-fetch",
                version: "3.3.0",
            },
            globalNames: [{
                name: "fetch",
                exportName: "default",
            }, {
                name: "Headers",
            }, {
                name: "RequestInit",
                typeOnly: true,
            }, {
                name: "Request",
            }, {
                name: "RequestInfo",
                typeOnly: true,
            }, {
                name: "Response",
            }],
        }],
    },
    package: {
        name: "wattpad",
        version: VERSION,
        description: "unofficial Wattpad API wrapper",
        license: "Unlicense",
    },
});

Deno.copyFileSync("README.md", "npm/README.md");
Deno.copyFileSync("LICENSE", "npm/LICENSE");
