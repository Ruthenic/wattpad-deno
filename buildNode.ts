import { build, emptyDir } from "https://deno.land/x/dnt@0.33.1/mod.ts";

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
        version: Deno.args[0],
        description: "new air wyatts",
        license: "Unlicense",
    },
});

Deno.copyFileSync("README.md", "npm/README.md");
