const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const ts = require("typescript");

// Compile project modules in isolation while retaining real package dependencies.
// Overrides let component tests replace UI boundaries without a DOM dependency.
module.exports = function createLoader(overrides = {}) {
  const cache = new Map();
  function load(filename) {
    filename = path.resolve(__dirname, "..", filename);
    if (cache.has(filename)) return cache.get(filename).exports;
    const mod = { exports: {} };
    cache.set(filename, mod);
    const nativeRequire = createRequire(filename);
    const requireModule = (specifier) => {
      if (Object.hasOwn(overrides, specifier)) return overrides[specifier];
      if (specifier.startsWith(".")) {
        const target = path.resolve(path.dirname(filename), specifier);
        for (const extension of [".ts", ".tsx"]) {
          if (fs.existsSync(target + extension)) return load(target + extension);
        }
      }
      return nativeRequire(specifier);
    };
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        target: ts.ScriptTarget.ES2020,
      },
      fileName: filename,
    });
    vm.runInThisContext(
      `(function(require, module, exports) { ${outputText}\n})`,
      { filename },
    )(requireModule, mod, mod.exports);
    return mod.exports;
  }
  return load;
};
