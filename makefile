start:
	pnpm install
	pnpm run build
	pm2 start pnpm --name hub-community-front -- run start

update:
	git pull
	pnpm install
	pnpm run build
	pm2 restart hub-community-front