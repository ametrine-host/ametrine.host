// entry point file that gets started with the start script
// NOTE: to run with args, use `npm run start -- --arg`
// imports
import path from "path";
import cp from "child_process";
import { readdirSync, writeFile } from "fs";

// files
import util from "./util";
import config from "./config.json";
import { Module } from "./types/module";

// variables
const modules: Map<string, cp.ChildProcess> = new Map();

const moduleList: Array<Module> = readdirSync(
  path.join(__dirname, config.modules),
  { encoding: "utf8" }
).map((module) => {
  return require(path.join(__dirname, config.modules, module, "module.json"));
});

for (const file of moduleList) {
  const mPath = path.join(__dirname, config.modules, file.file),
    isBin = file.kind === "bin";

  modules.set(
    file.name,
    cp.spawn(
      // this is really dirty
      isBin ? "command" : "node",
      [isBin ? `./${mPath}` : mPath],
      {
        stdio: ["ignore", "pipe", "pipe", "ipc"],
      }
    )
  );

  const m = modules.get(file.name);

  // handle module stdout
  m.stdout.setEncoding("utf8");
  m.stdout.on("data", (d) => {
    console.log(`\u001b[38;5;${file.color}m[${file.name}] ${d.toString()}`);
  });

  // handle module stderr
  m.stderr.setEncoding("utf8");
  m.stderr.on("data", (d) => {
    console.error(`!!! [${file.name}] ${d.toString()}`);
  });
}

writeFile(
  path.join(__dirname, "modules", "modules.json"),
  JSON.stringify(moduleList),
  { encoding: "utf8" },
  (err) => {
    if(err) util.error("Error writing to modules.json");
  }
);

util.log(util.sreplace("%0% modules started", [modules.size]));

process.once("SIGINT", () => {
  modules.forEach((m) => m.kill());
  console.log("\u001b[0m\n"); // reset color
  process.exit(0);
});
