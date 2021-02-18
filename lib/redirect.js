export default function redirect(res, url) {
  res.writeHead(302, {
    Location: url,
  })
  res.end()
}
