const fs = require('fs');

module.exports = ({ filename } = {}) => {
  const filepath = __dirname + filename;

  let dump = { data: {}, code: null, errno: null, message: null };

  if (fs.existsSync(filepath)) {
    try {
      dump = JSON.parse(fs.readFileSync(filepath));
    } catch(e) {
      console.error('Invalid dump file');
    } finally {
      fs.unlinkSync(filepath);
    }
  }

  process.on('uncaughtException', function (err) {
    const { code, errno, message } = err;

    dump.code = code;
    dump.errno = errno;
    dump.message = message;

    fs.writeFileSync(filepath, JSON.stringify(dump, null, 2));

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
