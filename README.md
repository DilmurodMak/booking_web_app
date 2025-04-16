# Airbnb Clone Project

A full-stack Airbnb clone application with React frontend and Node.js/Express backend.

## Deployment to Heroku

This application is configured for easy deployment to Heroku. Follow these steps to deploy:

### Prerequisites

1. [Create a Heroku account](https://signup.heroku.com/) if you don't have one
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Login to Heroku CLI:
   ```bash
   heroku login
   ```

### Deployment Steps

1. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Add a PostgreSQL database:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. Set environment variables in Heroku:
   ```bash
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   heroku config:set CLOUDINARY_API_KEY=your_api_key
   heroku config:set CLOUDINARY_API_SECRET=your_api_secret
   heroku config:set NODE_ENV=production
   ```

4. Deploy your application:
   ```bash
   git push heroku main
   ```

5. Open your application:
   ```bash
   heroku open
   ```

### Monitoring & Troubleshooting

- Check your application logs:
  ```bash
  heroku logs --tail
  ```

- Access your PostgreSQL database:
  ```bash
  heroku pg:psql
  ```

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication with JWT
- Property listings with photos via Cloudinary
- Booking management system
- Responsive design with Tailwind CSS
