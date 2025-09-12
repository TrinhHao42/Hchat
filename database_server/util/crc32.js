const MAX_VALUE = 1000000

const table = (() => {
  const t = []
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    t.push(c >>> 0)
  }
  return t
})()

const crc32 = (str) => {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i)
    crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xFF]
  }
  return ((crc ^ 0xFFFFFFFF) >>> 0) % MAX_VALUE
}

module.exports = crc32