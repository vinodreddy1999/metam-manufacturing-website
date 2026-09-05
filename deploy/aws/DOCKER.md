# Docker Hub to EC2

Build from the repository root on a Docker-enabled computer:

```sh
docker build --platform linux/amd64 -t vinodreddy1999/metam-services-website:v2-app-domain .
docker run --rm -d --name metam-website-check -p 127.0.0.1:13000:3000 vinodreddy1999/metam-services-website:v2-app-domain
```

Check http://localhost:13000 and confirm Sign in links to
https://app.metamservices.com. Stop the test container when finished:

```sh
docker stop metam-website-check
docker push vinodreddy1999/metam-services-website:v2-app-domain
```

Use a new tag for each subsequent release. Docker authentication must have push
access to this repository. Do not store credentials in Git or the image.

On EC2, back up `/home/ubuntu/docker-compose.yml`, update only the website image
to the published tag, then run from `/home/ubuntu`:

```sh
sudo docker compose config --quiet
sudo docker compose pull website
sudo docker compose up -d --no-deps website
sudo docker compose ps website
sudo docker compose logs --tail=50 --timestamps website
```

Check https://metamservices.com and the Sign in destination. To roll back,
restore the previous website image tag and repeat `up -d --no-deps website`.

The Node build uses `vite.docker.config.ts` inside the build stage; the existing
Sites configuration is retained in Git. Runtime uses the existing Vinext CLI,
port 3000, and the non-root node user. Development dependencies are retained
because Vinext, the production server, is declared there in package.json.

The navigation URL is compiled from `app/components/Nav.tsx`. Changing
`SIGNUP_URL` in the server environment does not change that compiled link.
