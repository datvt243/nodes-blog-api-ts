### Source code Nodejs xây dụng sẵn

-   Express
-   Typescript
-   PugJs (Template engine)
-   Tailwindcss
-   Prettier & Eslint

## scripts

```
npm start           :: chạy app env production
npm run build       :: build code src/*.ts -> dist/*.js
npm run dev         :: chạy code env development
npm run lint        :: check lỗi eslint
npm run lint:fix    :: fix lỗi eslint
npm run tail:build  :: build file css
npm run pug:format  :: format file pug
```

-   Trước khi chạy `npm start` cần chạy build (ra folder dist) trước.
-   Để chạy dev thì không cần build, chạy trực tiếp code trong src
