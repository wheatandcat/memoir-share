const glob = require("glob");
const config = require("./config.json");
const path = require("path");
const fs = require("fs-extra");

const rootPath = path.resolve();

glob(`./${config.baseUrl}/**/*`, (err, files) => {
  files.forEach((file) => {
    const path = file.replace(`./${config.baseUrl}/`, "");

    const hit = config.copyFiles.find((v) => {
      const regexp = new RegExp(v + "(.*?)", "g");

      return regexp.test(path);
    });

    if (hit) {
      const ignore = config.ignoreFiles.find((v) => {
        return file.includes(v);
      });

      if (!ignore) {
        const from = `${rootPath}/${file}`.replace("./", "");
        const copy = file.replace(`${config.baseUrl}/`, "");
        const to = `${rootPath}/${config.dir}/${copy}`.replace("./", "");
        const p = to.split("/");
        delete p[p.length - 1];
        const dir = p.join("/");

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.copyFileSync(from, to);

        fs.readFile(to, "utf8", (err, data) => {
          if (err) throw err;

          data = data
            .replace(/from 'lib/g, "from 'share/lib")
            .replace(/from 'config/g, "from 'share/config");

          fs.writeFile(to, data, (err) => {
            if (err) throw err;
            console.log(
              to.replace(`${rootPath}/${config.dir}/`, "") + " completed"
            );
          });
        });
      }
    }
  });
});
