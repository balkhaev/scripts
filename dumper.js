const fs = require('fs');

module.exports = ({ dumpFile } = {}) => {
  const dumpFilePath = __dirname + dumpFile;
  let dump = { data: {}, code: null, errno: null, message: null };

  if (fs.existsSync(dumpFilePath)) {
    try {
      dump = JSON.parse(fs.readFileSync(dumpFilePath));
    } catch(e) {
      console.error('Invalid dump file');
    } finally {
      fs.unlinkSync(dumpFilePath);
    }
  }

  process.on('uncaughtException', function (err) {
    const { code, errno, message } = err;
    dump.code = code;
    dump.errno = errno;
    dump.message = message;

    fs.writeFileSync(dumpFilePath, JSON.stringify(dump, null, 2));

    throw err;
  });

  return {
    isRecover: dump.code !== null,
    getDump() {
      return dump;
    },
    setDumpData(data) {
      dump.data = data;
    },
    getDumpData(key) {
      return key ? dump.data[key] : dump.data;
    }
  }
}
