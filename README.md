# Dripos Migration Database

A data migration application that enables users to move Stripe customers into 
MongoDB through a interface purpose-built for simple migrations.

## Features
- Stripe API Integration: version "2024-06-20"
- Redis Cache: cached Stripe data for faster subsequent API requests
- Mongoose Pipelining: Mongoose to manage large-scale Stripe data migration
- React Dashboard: Role-specific dashboard to trigger and monitor migrations
- Docker Deployment: Dockerized services for easy deployment and scaling.

### Planned
- Generatable test data
- Real-time syncing of data from Stripe with webhooks
- Database query caching
- Error tracking and reporting for failed migrations
- Better frontend

## Technologies
Written in Typescript

### Frontend:
- React (v6)
- Axios for API requests

### Backend:
- Node.js
- Express
- Mongoose
- Stripe API (2024-06-20)

### Database:
- MongoDB
- Redis

### Deployment:
- Docker
- Docker Compose


