
# Typeahead city component ![Nodejs Version](https://img.shields.io/badge/Nodejs-20.9-green) ![Nextjs Version](https://img.shields.io/badge/Nextjs-14.0-black)


Typeahead city React component keeping track the most recent cities chosen.

Note that they are fetched once when the page loads (server-side).

This project uses a FastAPI backend in this repository [city-service](https://github.com/vidalmatheus/city-service).


# Running

- Local:

```bash
npm i
npm run dev
```

- Docker container

```bash
npm run dkbuild
npm run dkrun
```

***Note 1**: dkrun command also creates/uses the same Docker network city-service backend uses.*

***Note 2**: don't forget to edit your /private/etc/hosts (macOS) or /etc/hosts (Linux) to ensure that your browser recognizes the namespace 'city-service' as localhost as well.*
