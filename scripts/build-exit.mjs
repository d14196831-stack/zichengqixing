if (process.platform === 'win32') {
  const exit = process.exit.bind(process);
  process.exit = (code) => {
    if (code === 0 || code === undefined) {
      setTimeout(() => exit(code), 1000);
    } else {
      exit(code);
    }
  };
}
