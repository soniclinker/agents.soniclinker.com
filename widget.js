/* eslint-disable @typescript-eslint/no-unused-expressions */
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.SonicWidget = t())
        : (e.SonicWidget = t());
})(self, () =>
  (() => {
    var e = {
        24: (e, t) => {
          'use strict';
          function n(e, t, n, o) {
            switch (e) {
              case 0:
                return (t & n) ^ (~t & o);
              case 1:
              case 3:
                return t ^ n ^ o;
              case 2:
                return (t & n) ^ (t & o) ^ (n & o);
            }
          }
          function o(e, t) {
            return (e << t) | (e >>> (32 - t));
          }
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          t.default = function (e) {
            const t = [1518500249, 1859775393, 2400959708, 3395469782],
              r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ('string' == typeof e) {
              const t = unescape(encodeURIComponent(e));
              e = [];
              for (let n = 0; n < t.length; ++n) e.push(t.charCodeAt(n));
            } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
            e.push(128);
            const i = e.length / 4 + 2,
              s = Math.ceil(i / 16),
              l = new Array(s);
            for (let t = 0; t < s; ++t) {
              const n = new Uint32Array(16);
              for (let o = 0; o < 16; ++o)
                n[o] =
                  (e[64 * t + 4 * o] << 24) |
                  (e[64 * t + 4 * o + 1] << 16) |
                  (e[64 * t + 4 * o + 2] << 8) |
                  e[64 * t + 4 * o + 3];
              l[t] = n;
            }
            (l[s - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
              (l[s - 1][14] = Math.floor(l[s - 1][14])),
              (l[s - 1][15] = (8 * (e.length - 1)) & 4294967295);
            for (let e = 0; e < s; ++e) {
              const i = new Uint32Array(80);
              for (let t = 0; t < 16; ++t) i[t] = l[e][t];
              for (let e = 16; e < 80; ++e)
                i[e] = o(i[e - 3] ^ i[e - 8] ^ i[e - 14] ^ i[e - 16], 1);
              let s = r[0],
                a = r[1],
                d = r[2],
                u = r[3],
                c = r[4];
              for (let e = 0; e < 80; ++e) {
                const r = Math.floor(e / 20),
                  l = (o(s, 5) + n(r, a, d, u) + c + t[r] + i[e]) >>> 0;
                (c = u), (u = d), (d = o(a, 30) >>> 0), (a = s), (s = l);
              }
              (r[0] = (r[0] + s) >>> 0),
                (r[1] = (r[1] + a) >>> 0),
                (r[2] = (r[2] + d) >>> 0),
                (r[3] = (r[3] + u) >>> 0),
                (r[4] = (r[4] + c) >>> 0);
            }
            return [
              (r[0] >> 24) & 255,
              (r[0] >> 16) & 255,
              (r[0] >> 8) & 255,
              255 & r[0],
              (r[1] >> 24) & 255,
              (r[1] >> 16) & 255,
              (r[1] >> 8) & 255,
              255 & r[1],
              (r[2] >> 24) & 255,
              (r[2] >> 16) & 255,
              (r[2] >> 8) & 255,
              255 & r[2],
              (r[3] >> 24) & 255,
              (r[3] >> 16) & 255,
              (r[3] >> 8) & 255,
              255 & r[3],
              (r[4] >> 24) & 255,
              (r[4] >> 16) & 255,
              (r[4] >> 8) & 255,
              255 & r[4],
            ];
          };
        },
        180: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o,
            r = (o = n(268)) && o.__esModule ? o : { default: o },
            i = n(896);
          let s,
            l,
            a = 0,
            d = 0;
          t.default = function (e, t, n) {
            let o = (t && n) || 0;
            const u = t || new Array(16);
            let c = (e = e || {}).node || s,
              f = void 0 !== e.clockseq ? e.clockseq : l;
            if (null == c || null == f) {
              const t = e.random || (e.rng || r.default)();
              null == c && (c = s = [1 | t[0], t[1], t[2], t[3], t[4], t[5]]),
                null == f && (f = l = 16383 & ((t[6] << 8) | t[7]));
            }
            let p = void 0 !== e.msecs ? e.msecs : Date.now(),
              h = void 0 !== e.nsecs ? e.nsecs : d + 1;
            const g = p - a + (h - d) / 1e4;
            if (
              (g < 0 && void 0 === e.clockseq && (f = (f + 1) & 16383),
              (g < 0 || p > a) && void 0 === e.nsecs && (h = 0),
              h >= 1e4)
            )
              throw new Error(
                "uuid.v1(): Can't create more than 10M uuids/sec"
              );
            (a = p), (d = h), (l = f), (p += 122192928e5);
            const y = (1e4 * (268435455 & p) + h) % 4294967296;
            (u[o++] = (y >>> 24) & 255),
              (u[o++] = (y >>> 16) & 255),
              (u[o++] = (y >>> 8) & 255),
              (u[o++] = 255 & y);
            const b = ((p / 4294967296) * 1e4) & 268435455;
            (u[o++] = (b >>> 8) & 255),
              (u[o++] = 255 & b),
              (u[o++] = ((b >>> 24) & 15) | 16),
              (u[o++] = (b >>> 16) & 255),
              (u[o++] = (f >>> 8) | 128),
              (u[o++] = 255 & f);
            for (let e = 0; e < 6; ++e) u[o + e] = c[e];
            return t || (0, i.unsafeStringify)(u);
          };
        },
        190: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o,
            r = (o = n(451)) && o.__esModule ? o : { default: o };
          t.default = function (e) {
            if (!(0, r.default)(e)) throw TypeError('Invalid UUID');
            let t;
            const n = new Uint8Array(16);
            return (
              (n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
              (n[1] = (t >>> 16) & 255),
              (n[2] = (t >>> 8) & 255),
              (n[3] = 255 & t),
              (n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
              (n[5] = 255 & t),
              (n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
              (n[7] = 255 & t),
              (n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
              (n[9] = 255 & t),
              (n[10] =
                ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
              (n[11] = (t / 4294967296) & 255),
              (n[12] = (t >>> 24) & 255),
              (n[13] = (t >>> 16) & 255),
              (n[14] = (t >>> 8) & 255),
              (n[15] = 255 & t),
              n
            );
          };
        },
        205: (e, t) => {
          'use strict';
          function n(e) {
            return 14 + (((e + 64) >>> 9) << 4) + 1;
          }
          function o(e, t) {
            const n = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
          }
          function r(e, t, n, r, i, s) {
            return o(
              ((l = o(o(t, e), o(r, s))) << (a = i)) | (l >>> (32 - a)),
              n
            );
            var l, a;
          }
          function i(e, t, n, o, i, s, l) {
            return r((t & n) | (~t & o), e, t, i, s, l);
          }
          function s(e, t, n, o, i, s, l) {
            return r((t & o) | (n & ~o), e, t, i, s, l);
          }
          function l(e, t, n, o, i, s, l) {
            return r(t ^ n ^ o, e, t, i, s, l);
          }
          function a(e, t, n, o, i, s, l) {
            return r(n ^ (t | ~o), e, t, i, s, l);
          }
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          t.default = function (e) {
            if ('string' == typeof e) {
              const t = unescape(encodeURIComponent(e));
              e = new Uint8Array(t.length);
              for (let n = 0; n < t.length; ++n) e[n] = t.charCodeAt(n);
            }
            return (function (e) {
              const t = [],
                n = 32 * e.length,
                o = '0123456789abcdef';
              for (let r = 0; r < n; r += 8) {
                const n = (e[r >> 5] >>> r % 32) & 255,
                  i = parseInt(o.charAt((n >>> 4) & 15) + o.charAt(15 & n), 16);
                t.push(i);
              }
              return t;
            })(
              (function (e, t) {
                (e[t >> 5] |= 128 << t % 32), (e[n(t) - 1] = t);
                let r = 1732584193,
                  d = -271733879,
                  u = -1732584194,
                  c = 271733878;
                for (let t = 0; t < e.length; t += 16) {
                  const n = r,
                    f = d,
                    p = u,
                    h = c;
                  (r = i(r, d, u, c, e[t], 7, -680876936)),
                    (c = i(c, r, d, u, e[t + 1], 12, -389564586)),
                    (u = i(u, c, r, d, e[t + 2], 17, 606105819)),
                    (d = i(d, u, c, r, e[t + 3], 22, -1044525330)),
                    (r = i(r, d, u, c, e[t + 4], 7, -176418897)),
                    (c = i(c, r, d, u, e[t + 5], 12, 1200080426)),
                    (u = i(u, c, r, d, e[t + 6], 17, -1473231341)),
                    (d = i(d, u, c, r, e[t + 7], 22, -45705983)),
                    (r = i(r, d, u, c, e[t + 8], 7, 1770035416)),
                    (c = i(c, r, d, u, e[t + 9], 12, -1958414417)),
                    (u = i(u, c, r, d, e[t + 10], 17, -42063)),
                    (d = i(d, u, c, r, e[t + 11], 22, -1990404162)),
                    (r = i(r, d, u, c, e[t + 12], 7, 1804603682)),
                    (c = i(c, r, d, u, e[t + 13], 12, -40341101)),
                    (u = i(u, c, r, d, e[t + 14], 17, -1502002290)),
                    (d = i(d, u, c, r, e[t + 15], 22, 1236535329)),
                    (r = s(r, d, u, c, e[t + 1], 5, -165796510)),
                    (c = s(c, r, d, u, e[t + 6], 9, -1069501632)),
                    (u = s(u, c, r, d, e[t + 11], 14, 643717713)),
                    (d = s(d, u, c, r, e[t], 20, -373897302)),
                    (r = s(r, d, u, c, e[t + 5], 5, -701558691)),
                    (c = s(c, r, d, u, e[t + 10], 9, 38016083)),
                    (u = s(u, c, r, d, e[t + 15], 14, -660478335)),
                    (d = s(d, u, c, r, e[t + 4], 20, -405537848)),
                    (r = s(r, d, u, c, e[t + 9], 5, 568446438)),
                    (c = s(c, r, d, u, e[t + 14], 9, -1019803690)),
                    (u = s(u, c, r, d, e[t + 3], 14, -187363961)),
                    (d = s(d, u, c, r, e[t + 8], 20, 1163531501)),
                    (r = s(r, d, u, c, e[t + 13], 5, -1444681467)),
                    (c = s(c, r, d, u, e[t + 2], 9, -51403784)),
                    (u = s(u, c, r, d, e[t + 7], 14, 1735328473)),
                    (d = s(d, u, c, r, e[t + 12], 20, -1926607734)),
                    (r = l(r, d, u, c, e[t + 5], 4, -378558)),
                    (c = l(c, r, d, u, e[t + 8], 11, -2022574463)),
                    (u = l(u, c, r, d, e[t + 11], 16, 1839030562)),
                    (d = l(d, u, c, r, e[t + 14], 23, -35309556)),
                    (r = l(r, d, u, c, e[t + 1], 4, -1530992060)),
                    (c = l(c, r, d, u, e[t + 4], 11, 1272893353)),
                    (u = l(u, c, r, d, e[t + 7], 16, -155497632)),
                    (d = l(d, u, c, r, e[t + 10], 23, -1094730640)),
                    (r = l(r, d, u, c, e[t + 13], 4, 681279174)),
                    (c = l(c, r, d, u, e[t], 11, -358537222)),
                    (u = l(u, c, r, d, e[t + 3], 16, -722521979)),
                    (d = l(d, u, c, r, e[t + 6], 23, 76029189)),
                    (r = l(r, d, u, c, e[t + 9], 4, -640364487)),
                    (c = l(c, r, d, u, e[t + 12], 11, -421815835)),
                    (u = l(u, c, r, d, e[t + 15], 16, 530742520)),
                    (d = l(d, u, c, r, e[t + 2], 23, -995338651)),
                    (r = a(r, d, u, c, e[t], 6, -198630844)),
                    (c = a(c, r, d, u, e[t + 7], 10, 1126891415)),
                    (u = a(u, c, r, d, e[t + 14], 15, -1416354905)),
                    (d = a(d, u, c, r, e[t + 5], 21, -57434055)),
                    (r = a(r, d, u, c, e[t + 12], 6, 1700485571)),
                    (c = a(c, r, d, u, e[t + 3], 10, -1894986606)),
                    (u = a(u, c, r, d, e[t + 10], 15, -1051523)),
                    (d = a(d, u, c, r, e[t + 1], 21, -2054922799)),
                    (r = a(r, d, u, c, e[t + 8], 6, 1873313359)),
                    (c = a(c, r, d, u, e[t + 15], 10, -30611744)),
                    (u = a(u, c, r, d, e[t + 6], 15, -1560198380)),
                    (d = a(d, u, c, r, e[t + 13], 21, 1309151649)),
                    (r = a(r, d, u, c, e[t + 4], 6, -145523070)),
                    (c = a(c, r, d, u, e[t + 11], 10, -1120210379)),
                    (u = a(u, c, r, d, e[t + 2], 15, 718787259)),
                    (d = a(d, u, c, r, e[t + 9], 21, -343485551)),
                    (r = o(r, n)),
                    (d = o(d, f)),
                    (u = o(u, p)),
                    (c = o(c, h));
                }
                return [r, d, u, c];
              })(
                (function (e) {
                  if (0 === e.length) return [];
                  const t = 8 * e.length,
                    o = new Uint32Array(n(t));
                  for (let n = 0; n < t; n += 8)
                    o[n >> 5] |= (255 & e[n / 8]) << n % 32;
                  return o;
                })(e),
                8 * e.length
              )
            );
          };
        },
        264: (e) => {
          'use strict';
          function t(e, t) {
            if (!(e && t && e.length && t.length))
              throw new Error('Bad alphabet');
            (this.srcAlphabet = e), (this.dstAlphabet = t);
          }
          (t.prototype.convert = function (e) {
            var t,
              n,
              o,
              r = {},
              i = this.srcAlphabet.length,
              s = this.dstAlphabet.length,
              l = e.length,
              a = 'string' == typeof e ? '' : [];
            if (!this.isValid(e))
              throw new Error(
                'Number "' +
                  e +
                  '" contains of non-alphabetic digits (' +
                  this.srcAlphabet +
                  ')'
              );
            if (this.srcAlphabet === this.dstAlphabet) return e;
            for (t = 0; t < l; t++) r[t] = this.srcAlphabet.indexOf(e[t]);
            do {
              for (n = 0, o = 0, t = 0; t < l; t++)
                (n = n * i + r[t]) >= s
                  ? ((r[o++] = parseInt(n / s, 10)), (n %= s))
                  : o > 0 && (r[o++] = 0);
              (l = o), (a = this.dstAlphabet.slice(n, n + 1).concat(a));
            } while (0 !== o);
            return a;
          }),
            (t.prototype.isValid = function (e) {
              for (var t = 0; t < e.length; ++t)
                if (-1 === this.srcAlphabet.indexOf(e[t])) return !1;
              return !0;
            }),
            (e.exports = t);
        },
        268: (e, t) => {
          'use strict';
          let n;
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = function () {
              if (
                !n &&
                ((n =
                  'undefined' != typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto)),
                !n)
              )
                throw new Error(
                  'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
                );
              return n(o);
            });
          const o = new Uint8Array(16);
        },
        407: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.URL = t.DNS = void 0),
            (t.default = function (e, t, n) {
              function o(e, o, s, l) {
                var a;
                if (
                  ('string' == typeof e &&
                    (e = (function (e) {
                      e = unescape(encodeURIComponent(e));
                      const t = [];
                      for (let n = 0; n < e.length; ++n)
                        t.push(e.charCodeAt(n));
                      return t;
                    })(e)),
                  'string' == typeof o && (o = (0, i.default)(o)),
                  16 !== (null === (a = o) || void 0 === a ? void 0 : a.length))
                )
                  throw TypeError(
                    'Namespace must be array-like (16 iterable integer values, 0-255)'
                  );
                let d = new Uint8Array(16 + e.length);
                if (
                  (d.set(o),
                  d.set(e, o.length),
                  (d = n(d)),
                  (d[6] = (15 & d[6]) | t),
                  (d[8] = (63 & d[8]) | 128),
                  s)
                ) {
                  l = l || 0;
                  for (let e = 0; e < 16; ++e) s[l + e] = d[e];
                  return s;
                }
                return (0, r.unsafeStringify)(d);
              }
              try {
                o.name = e;
              } catch (e) {}
              return (o.DNS = s), (o.URL = l), o;
            });
          var o,
            r = n(896),
            i = (o = n(190)) && o.__esModule ? o : { default: o };
          const s = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
          t.DNS = s;
          const l = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
          t.URL = l;
        },
        451: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o,
            r = (o = n(558)) && o.__esModule ? o : { default: o };
          t.default = function (e) {
            return 'string' == typeof e && r.default.test(e);
          };
        },
        493: (e, t, n) => {
          var o = n(264);
          function r(e, t) {
            var n = new o(e, t);
            return function (e) {
              return n.convert(e);
            };
          }
          (r.BIN = '01'),
            (r.OCT = '01234567'),
            (r.DEC = '0123456789'),
            (r.HEX = '0123456789abcdef'),
            (e.exports = r);
        },
        521: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o,
            r = (o = n(451)) && o.__esModule ? o : { default: o };
          t.default = function (e) {
            if (!(0, r.default)(e)) throw TypeError('Invalid UUID');
            return parseInt(e.slice(14, 15), 16);
          };
        },
        558: (e, t) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0),
            (t.default =
              /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
        },
        574: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o = i(n(407)),
            r = i(n(205));
          function i(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var s = (0, o.default)('v3', 48, r.default);
          t.default = s;
        },
        674: (e, t) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0),
            (t.default = '00000000-0000-0000-0000-000000000000');
        },
        678: (e, t) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var n = {
            randomUUID:
              'undefined' != typeof crypto &&
              crypto.randomUUID &&
              crypto.randomUUID.bind(crypto),
          };
          t.default = n;
        },
        800: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o = i(n(407)),
            r = i(n(24));
          function i(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var s = (0, o.default)('v5', 80, r.default);
          t.default = s;
        },
        896: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0),
            (t.unsafeStringify = s);
          var o,
            r = (o = n(451)) && o.__esModule ? o : { default: o };
          const i = [];
          for (let e = 0; e < 256; ++e) i.push((e + 256).toString(16).slice(1));
          function s(e, t = 0) {
            return (
              i[e[t + 0]] +
              i[e[t + 1]] +
              i[e[t + 2]] +
              i[e[t + 3]] +
              '-' +
              i[e[t + 4]] +
              i[e[t + 5]] +
              '-' +
              i[e[t + 6]] +
              i[e[t + 7]] +
              '-' +
              i[e[t + 8]] +
              i[e[t + 9]] +
              '-' +
              i[e[t + 10]] +
              i[e[t + 11]] +
              i[e[t + 12]] +
              i[e[t + 13]] +
              i[e[t + 14]] +
              i[e[t + 15]]
            );
          }
          t.default = function (e, t = 0) {
            const n = s(e, t);
            if (!(0, r.default)(n))
              throw TypeError('Stringified UUID is invalid');
            return n;
          };
        },
        897: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            Object.defineProperty(t, 'NIL', {
              enumerable: !0,
              get: function () {
                return l.default;
              },
            }),
            Object.defineProperty(t, 'parse', {
              enumerable: !0,
              get: function () {
                return c.default;
              },
            }),
            Object.defineProperty(t, 'stringify', {
              enumerable: !0,
              get: function () {
                return u.default;
              },
            }),
            Object.defineProperty(t, 'v1', {
              enumerable: !0,
              get: function () {
                return o.default;
              },
            }),
            Object.defineProperty(t, 'v3', {
              enumerable: !0,
              get: function () {
                return r.default;
              },
            }),
            Object.defineProperty(t, 'v4', {
              enumerable: !0,
              get: function () {
                return i.default;
              },
            }),
            Object.defineProperty(t, 'v5', {
              enumerable: !0,
              get: function () {
                return s.default;
              },
            }),
            Object.defineProperty(t, 'validate', {
              enumerable: !0,
              get: function () {
                return d.default;
              },
            }),
            Object.defineProperty(t, 'version', {
              enumerable: !0,
              get: function () {
                return a.default;
              },
            });
          var o = f(n(180)),
            r = f(n(574)),
            i = f(n(959)),
            s = f(n(800)),
            l = f(n(674)),
            a = f(n(521)),
            d = f(n(451)),
            u = f(n(896)),
            c = f(n(190));
          function f(e) {
            return e && e.__esModule ? e : { default: e };
          }
        },
        943: (e, t, n) => {
          const { v4: o, validate: r } = n(897),
            i = n(493),
            s = {
              cookieBase90:
                "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~",
              flickrBase58:
                '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
              uuid25Base36: '0123456789abcdefghijklmnopqrstuvwxyz',
            },
            l = { consistentLength: !0 };
          let a;
          const d = (e, t, n) => {
              const o = t(e.toLowerCase().replace(/-/g, ''));
              return n && n.consistentLength
                ? o.padStart(n.shortIdLength, n.paddingChar)
                : o;
            },
            u = (e, t) => {
              const n = t(e)
                .padStart(32, '0')
                .match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);
              return [n[1], n[2], n[3], n[4], n[5]].join('-');
            };
          e.exports = (() => {
            const e = (e, t) => {
              const n = e || s.flickrBase58,
                a = { ...l, ...t };
              if ([...new Set(Array.from(n))].length !== n.length)
                throw new Error(
                  'The provided Alphabet has duplicate characters resulting in unreliable results'
                );
              const c =
                ((f = n.length), Math.ceil(Math.log(2 ** 128) / Math.log(f)));
              var f;
              const p = {
                  shortIdLength: c,
                  consistentLength: a.consistentLength,
                  paddingChar: n[0],
                },
                h = i(i.HEX, n),
                g = i(n, i.HEX),
                y = () => d(o(), h, p),
                b = {
                  alphabet: n,
                  fromUUID: (e) => d(e, h, p),
                  maxLength: c,
                  generate: y,
                  new: y,
                  toUUID: (e) => u(e, g),
                  uuid: o,
                  validate: (e, t = !1) => {
                    if (!e || 'string' != typeof e) return !1;
                    const o = a.consistentLength
                        ? e.length === c
                        : e.length <= c,
                      i = e.split('').every((e) => n.includes(e));
                    return !1 === t ? o && i : o && i && r(u(e, g));
                  },
                };
              return Object.freeze(b), b;
            };
            return (
              (e.constants = s),
              (e.uuid = o),
              (e.generate = () => (a || (a = e(s.flickrBase58).generate), a())),
              e
            );
          })();
        },
        959: (e, t, n) => {
          'use strict';
          Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.default = void 0);
          var o = s(n(678)),
            r = s(n(268)),
            i = n(896);
          function s(e) {
            return e && e.__esModule ? e : { default: e };
          }
          t.default = function (e, t, n) {
            if (o.default.randomUUID && !t && !e) return o.default.randomUUID();
            const s = (e = e || {}).random || (e.rng || r.default)();
            if (((s[6] = (15 & s[6]) | 64), (s[8] = (63 & s[8]) | 128), t)) {
              n = n || 0;
              for (let e = 0; e < 16; ++e) t[n + e] = s[e];
              return t;
            }
            return (0, i.unsafeStringify)(s);
          };
        },
      },
      t = {};
    function n(o) {
      var r = t[o];
      if (void 0 !== r) return r.exports;
      var i = (t[o] = { exports: {} });
      return e[o](i, i.exports, n), i.exports;
    }
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
      (n.d = (e, t) => {
        for (var o in t)
          n.o(t, o) &&
            !n.o(e, o) &&
            Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      }),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      });
    var o = {};
    return (
      (() => {
        'use strict';
        n.r(o);
        var e = n(943),
          t = n.n(e);
        (window.sonicWidget =
          window.sonicWidget ||
          function () {
            (window.sonicWidget.q = window.sonicWidget.q || []).push(arguments);
          }),
          (window.sonicWidget.q || []).forEach((e) => {
            const [n, o] = e;
            'init' === n &&
              (function ({
                orgId: e,
                width: n = 50,
                height: o = 50,
                position: r = 'bottom-right',
              }) {
                if (!e) return;
                n > 90 && (n = 90), o > 90 && (o = 90);
                const i = document.createElement('div'),
                  s = document.createElement('img');
                (s.src = 'https://dash.soniclinker.com/widmic.png'),
                  (s.alt = 'Sonic'),
                  (s.style.width = '30px'),
                  (s.style.height = '30px'),
                  (s.draggable = !1),
                  (s.style.userSelect = 'none'),
                  i.appendChild(s),
                  Object.assign(i.style, {
                    position: 'fixed',
                    bottom: '20px',
                    right: 'bottom-right' === r ? '20px' : '',
                    left: 'bottom-left' === r ? '20px' : '',
                    width: '50px',
                    height: '50px',
                    background: 'white',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    zIndex: 9999,
                    userSelect: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  });
                const l = document.createElement('div');
                function a(e) {
                  let t;
                  l
                    .querySelectorAll('.resize-handle')
                    .forEach((e) => e.remove()),
                    'bottom-right' === e
                      ? ((t = document.createElement('div')),
                        Object.assign(t.style, {
                          position: 'absolute',
                          top: '-10px',
                          left: '-10px',
                          width: '20px',
                          height: '20px',
                          cursor: 'nwse-resize',
                          zIndex: '10000',
                          background: 'transparent',
                        }))
                      : 'bottom-left' === e
                        ? ((t = document.createElement('div')),
                          Object.assign(t.style, {
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            width: '20px',
                            height: '20px',
                            cursor: 'nesw-resize',
                            zIndex: '10000',
                            background: 'transparent',
                          }))
                        : 'top-right' === e
                          ? ((t = document.createElement('div')),
                            Object.assign(t.style, {
                              position: 'absolute',
                              bottom: '-10px',
                              left: '-10px',
                              width: '20px',
                              height: '20px',
                              cursor: 'nesw-resize',
                              zIndex: '10000',
                              background: 'transparent',
                            }))
                          : 'top-left' === e &&
                            ((t = document.createElement('div')),
                            Object.assign(t.style, {
                              position: 'absolute',
                              bottom: '-10px',
                              right: '-10px',
                              width: '20px',
                              height: '20px',
                              cursor: 'nwse-resize',
                              zIndex: '10000',
                              background: 'transparent',
                            })),
                    t &&
                      (t.classList.add('resize-handle'),
                      l.appendChild(t),
                      t.addEventListener('mousedown', (t) => {
                        t.preventDefault();
                        const n = t.clientX,
                          o = t.clientY,
                          r = l.offsetWidth,
                          i = l.offsetHeight,
                          s = l.getBoundingClientRect().left,
                          a = l.getBoundingClientRect().top,
                          d = (t) => {
                            const d = t.clientX - n,
                              u = t.clientY - o,
                              c = window.innerWidth,
                              f = window.innerHeight;
                            if ('bottom-right' === e) {
                              const e = ((r - d) / c) * 100,
                                t = ((i - u) / f) * 100;
                              if (e >= 20 && e <= 90) {
                                const t = ((s + d) / c) * 100;
                                t > 2 &&
                                  ((l.style.width = `${e}vw`),
                                  (l.style.left = `${t}vw`));
                              }
                              if (t >= 20 && t <= 90) {
                                const e = ((a + u) / f) * 100;
                                e > 2 &&
                                  ((l.style.height = `${t}vh`),
                                  (l.style.top = `${e}vh`));
                              }
                            }
                            if ('bottom-left' === e) {
                              const e = ((r + d) / c) * 100,
                                t = ((i - u) / f) * 100;
                              e >= 20 &&
                                e <= 90 &&
                                (s / c) * 100 + e < 96 &&
                                (l.style.width = `${e}vw`),
                                t >= 20 &&
                                  t <= 90 &&
                                  ((a + u) / f) * 100 > 2 &&
                                  ((l.style.height = `${t}vh`),
                                  (l.style.top = ((a + u) / f) * 100 + 'vh'));
                            }
                            if ('top-right' === e) {
                              const e = ((r - d) / c) * 100,
                                t = ((i + u) / f) * 100;
                              if (e >= 20 && e <= 90) {
                                const t = ((s + d) / c) * 100;
                                t > 2 &&
                                  ((l.style.width = `${e}vw`),
                                  (l.style.left = `${t}vw`));
                              }
                              t >= 20 &&
                                t <= 90 &&
                                (a / f) * 100 + t < 96 &&
                                (l.style.height = `${t}vh`);
                            }
                            if ('top-left' === e) {
                              const e = ((r + d) / c) * 100,
                                t = ((i + u) / f) * 100;
                              e >= 20 &&
                                e <= 90 &&
                                (s / c) * 100 + e < 96 &&
                                (l.style.width = `${e}vw`),
                                t >= 20 &&
                                  t <= 90 &&
                                  (a / f) * 100 + t < 96 &&
                                  (l.style.height = `${t}vh`);
                            }
                          },
                          u = () => {
                            document.removeEventListener('mousemove', d),
                              document.removeEventListener('mouseup', u);
                          };
                        document.addEventListener('mousemove', d),
                          document.addEventListener('mouseup', u);
                      }));
                  const n = document.createElement('style');
                  (n.textContent =
                    "\n    .resize-handle {\n      position: absolute;\n      width: 20px;\n      height: 20px;\n      background: transparent;\n      z-index: 10000;\n    }\n  \n    .resize-handle::before,\n    .resize-handle::after {\n      content: '';\n      position: absolute;\n      width: 15px; /* Arrow width */\n      height: 15px; /* Arrow thickness */\n      background-color: gray; /* Arrow color */\n      transform-origin: center;\n    }\n  \n    .resize-handle::before {\n      transform: rotate(45deg); /* Diagonal arrow */\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) rotate(45deg);\n    }\n  \n    .resize-handle::after {\n      transform: rotate(-45deg); /* Opposite diagonal arrow */\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%) rotate(-45deg);\n    }\n  "),
                    document.head.appendChild(n),
                    t.classList.add('resize-handle');
                }
                Object.assign(l.style, {
                  position: 'fixed',
                  bottom: '70px',
                  right: 'bottom-right' === r ? '70px' : '',
                  left: 'bottom-left' === r ? '70px' : '',
                  width: `${n}vw`,
                  height: `${o}vh`,
                  minWidth: '220px',
                  minHeight: '220px',
                  display: 'none',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  zIndex: 9998,
                }),
                  a(r);
                const d = document.createElement('div');
                Object.assign(d.style, {
                  width: '100%',
                  height: '40px',
                  background: 'white',
                  color: 'gray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '0 10px',
                  boxSizing: 'border-box',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'default',
                });
                const u = document.createElement('button');
                (u.textContent = '×'),
                  Object.assign(u.style, {
                    background: 'transparent',
                    border: 'none',
                    color: 'gray',
                    fontSize: '30px',
                    cursor: 'pointer',
                  }),
                  u.addEventListener('click', () => {
                    l.style.display = 'none';
                  }),
                  d.appendChild(u);
                const c = 'http://localhost:4000',
                  f = 'https://dash.soniclinker.com';
                let p = localStorage.getItem('user_id');
                if (!p) {
                  const e = t().generate();
                  (p = e), localStorage.setItem('user_id', e);
                }
                const h =
                    'localhost' === window.location.hostname ||
                    '127.0.0.1' === window.location.hostname
                      ? c
                      : f,
                  g = document.createElement('iframe');
                (g.src = `${h}/embed/?org_id=${e}&user_id=${p}`),
                  (g.allow = 'microphone'),
                  (g.style.border = 'none'),
                  (g.style.width = '100%'),
                  (g.style.height = '100%'),
                  (g.style.userSelect = 'none'),
                  document.body.appendChild(i),
                  document.body.appendChild(l);
                const y = document.createElement('div');
                (y.style.width = '100%'),
                  (y.style.height = '100%'),
                  (y.style.display = 'flex'),
                  (y.style.flexDirection = 'column'),
                  (y.style.backgroundColor = 'white'),
                  y.appendChild(d),
                  y.appendChild(g),
                  l.appendChild(y),
                  i.addEventListener('click', () => {
                    l.style.display =
                      'none' === l.style.display ? 'block' : 'none';
                  });
                let b,
                  m,
                  v = !1;
                i.addEventListener('mousedown', (e) => {
                  (v = !0),
                    (b = e.clientX - i.getBoundingClientRect().left),
                    (m = e.clientY - i.getBoundingClientRect().top),
                    (i.style.transition = 'none');
                }),
                  document.addEventListener('mousemove', (e) => {
                    if (v) {
                      'none' === l.style.display &&
                        (l.style.visibility = 'hidden'),
                        (l.style.display = 'block');
                      let t = e.clientX - b,
                        n = e.clientY - m;
                      const o = window.innerWidth,
                        r = window.innerHeight,
                        s = i.offsetWidth,
                        d = i.offsetHeight;
                      (t = Math.max(0, Math.min(t, o - s))),
                        (n = Math.max(0, Math.min(n, r - d))),
                        (i.style.left = (t / o) * 100 + '%'),
                        (i.style.top = (n / r) * 100 + '%'),
                        (i.style.right = ''),
                        (i.style.bottom = '');
                      const u =
                        t > o / 2
                          ? n > r / 2
                            ? 'bottom-right'
                            : 'top-right'
                          : n > r / 2
                            ? 'bottom-left'
                            : 'top-left';
                      'bottom-right' === u
                        ? ((l.style.top =
                            ((n - l.offsetHeight) / r) * 100 + '%'),
                          (l.style.left =
                            ((t - l.offsetWidth) / o) * 100 + '%'))
                        : 'bottom-left' === u
                          ? ((l.style.top =
                              ((n - l.offsetHeight) / r) * 100 + '%'),
                            (l.style.left = ((t + s) / o) * 100 + '%'))
                          : 'top-right' === u
                            ? ((l.style.top = ((n + d) / r) * 100 + '%'),
                              (l.style.left =
                                ((t - l.offsetWidth) / o) * 100 + '%'))
                            : 'top-left' === u &&
                              ((l.style.top = ((n + d) / r) * 100 + '%'),
                              (l.style.left = ((t + s) / o) * 100 + '%')),
                        (l.style.right = ''),
                        (l.style.bottom = ''),
                        a(u);
                    }
                  }),
                  document.addEventListener('mouseup', () => {
                    (v = !1),
                      (i.style.transition = ''),
                      (l.style.visibility = 'visible');
                  });
              })(o);
          });
      })(),
      o
    );
  })()
);
