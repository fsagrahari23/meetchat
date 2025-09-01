# TODO: Update Project Configuration for React + Express with Nginx

## Tasks
- [x] Update nginx/default.conf to serve React static files and proxy /api to server:5000
- [x] Update nginx/Dockerfile to copy built client dist files to nginx html directory
- [x] Update docker-compose.yml to remove django_app dependency and add proper dependencies for nginx
- [x] Ensure client build outputs to correct location for nginx to serve
- [ ] Test the configuration by running docker-compose up
