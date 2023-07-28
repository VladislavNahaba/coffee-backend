setup:
	docker volume create --name=coffee_database
	docker-compose up -d

create_db:
	docker exec -it coffee-backend-web npm run db:create

seed:
	docker exec -it coffee-backend-web npm run seed
