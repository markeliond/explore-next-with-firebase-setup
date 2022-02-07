Using: https://nextjs.org/docs/upgrading

- upgrade latest react version

`$npm install react@latest react-dom@latest`

- upgrade next version

`$ npm install next@12`

> Tested both dev and build, and works with no errors.

- remove babel config

If the babel file is still there, the compiler opts out of using the new Rust one.

> works fine