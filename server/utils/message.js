let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

let generateLocationMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://google.com/maps?q=${lat},${lon}`,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage, generateLocationMessage };