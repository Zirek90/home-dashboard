FOR migration

npm run typeorm migration:generate -- -n DescriptionHere
npm run typeorm migration:run

FOR Docker:
docker compose --env-file ../.env.production up --build -d
