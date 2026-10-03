export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return

  // On Hostinger's Node.js hosting, reading `process.stdin` throws `open EEXIST`.
  // Node 22 reads it while building the ESM facade for `node:process`, which
  // happens when the Prisma runtime loads — so every DB-backed page 500s.
  // Nothing here uses stdin, so fall back to undefined instead of crashing.
  const stdin = Object.getOwnPropertyDescriptor(process, "stdin")
  if (!stdin?.get || !stdin.configurable) return

  const get = stdin.get
  Object.defineProperty(process, "stdin", {
    configurable: true,
    enumerable: stdin.enumerable,
    get() {
      try {
        return get.call(process)
      } catch {
        return undefined
      }
    },
  })
}
