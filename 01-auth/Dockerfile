ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install pnpm 
RUN npm install -g pnpm

# Stage to install production dependencies
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --prod

# Stage to build the application
FROM base AS build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.pnpm-store \
    pnpm install

# Copy all the files
COPY . .

# Build the application
RUN pnpm run build

# Final stage for production
FROM base AS release
ENV NODE_ENV=production
USER node

# Copy dependencies of production and compiled code
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env .

# Execute the application
CMD ["node", "dist/main"]