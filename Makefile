NODE_IMAGE = next-node-app:1.0
NODE_CONTAINER = agro-frontend

up:
	docker compose up -d

down:
	docker compose down

bash:
	docker exec -it ${NODE_CONTAINER} /bin/sh

build-image:
	docker build -f .docker/node/Dockerfile -t ${NODE_IMAGE} .

update:
	docker run -it -v ./:/app ${NODE_IMAGE} /bin/sh -c "npm i" && \
	docker container prune -f

install:
	make build-image && \
	docker run -it -v ./app:/app ${NODE_IMAGE} /bin/sh -c "npx create-next-app@14.2.31 . && npm i react@18 react-dom@18" && \
	sudo chmod -R 777 . && \
	mv ./app/* . && \
	mv ./app/.eslintrc.json . && \
	mv ./app/.gitignore . && \
	rm -rf ./app && \
	docker container prune -f && \
	docker compose up -d

up-static:
	NODE_ENV=production docker compose up -d

build:
	mkdir -p public/build/resources && \
	docker run -it -v ./:/app ${NODE_IMAGE} /bin/sh -c "npm run build" && \
	docker container prune -f && \
	make down && \
	make up-static