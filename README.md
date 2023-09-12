# ILT Cloud 2 Bangkit Demo

## Simple RESTFul API

Create the simple RESTFul API using Node.js Natively and Hapi Framework with the specification:

| Method | Path          | Response Code | Body | Description         |
| ------ |---------------| ------------- | ---- |---------------------|
| POST   | /contacts     | 201 | JSON | Create new contacts |
| GET    | /contacts     | 200 | JSON | List of contacts    |
| DELETE | /contacts/:id | 200 | JSON | Delete contacts     |

User data structure:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```
Server options:
 - `port`: 3000
 - `host`: localhost

---

References:
- [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-22-04)
- [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

# Demo Guide

## Install Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install v18.17.1
```

## Clone and prepare project

```bash
sudo apt install git
git clone https://github.com/nekoto-kun/ilt-cloud-2-bangkit-demo.git
cd ilt-cloud-2-bangkit-demo/
git checkout solution
npm i
```

## Install and prepare PM2

```bash
npm install pm2@latest -g
pm2 start server.js
pm2 startup systemd

sudo env PATH=$PATH:/home/<USERNAME>/.nvm/versions/node/v18.17.1/bin /home/<USERNAME>/.nvm/versions/node/v18.17.1/lib/node_modules/pm2/bin/pm2 startup systemd -u <USERNAME> --hp /home/<USERNAME>

pm2 save
sudo systemctl start pm2-<USERNAME>
sudo reboot
```

## Install web proxy

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Modify the `location / {}` part like this

```conf
location / {
	proxy_pass http://localhost:3000;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection 'upgrade';
	proxy_set_header Host $host;
	proxy_cache_bypass $http_upgrade;
}
```

Save with `Ctrl + X`, `Y`, then `Enter`

## Test website config

```bash
sudo nginx -t
```

## Restart nginx

```bash
sudo systemctl restart nginx
```