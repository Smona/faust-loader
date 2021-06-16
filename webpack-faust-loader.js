const { getOptions, interpolateName } = require("loader-utils");
const { exec } = require("child_process");
const fs = require("fs");
const tmp = require("tmp");

module.exports = async function (source) {
  const options = getOptions(this);

  tmp.file((err, path, fd) => {
    if (err) throw err;

    fs.write(fd, source, (err) => {
      if (err) throw err;

      exec(`faust2wasm -worklet ${path}`, (err, stdout, stderr) => {
        if (err) throw err;
        console.log(stderr);

        const segments = path.split("/");
        const fileName = segments[segments.length - 1];
        fs.rename(
          `${fileName}.wasm`,
          `${interpolateName(this, "[name].wasm", {})}`,
          (err) => {
            if (err) throw err;
          }
        );
        fs.rename(
          `${fileName}-processor.js`,
          `${interpolateName(this, "[name]-processor.js", {})}`,
          (err) => {
            if (err) throw err;
          }
        );
        fs.unlink(`${fileName}.js`, (err) => {
          if (err) throw err;
        });
      });
    });
  });
};
