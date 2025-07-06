# Movie App

A feature-rich React-based movie search application built with Vite, TypeScript, and Material-UI, leveraging the TMDB API for movie data, with custom authentication, infinite scrolling, and performance optimizations.

## Repository

Check out the source code on GitHub.

## Features

### Exciting Features

- **Movie Search Application**: Displays a list of movie cards on the main page, each showing the movie poster, title, rating, and genre, built to the project requirements.
- **Detailed Movie Page**: Presents comprehensive movie information on a dedicated page, accessible via React Router DOM.
- **Skeleton Loaders**: Enhances user experience with skeleton loaders for movie cards and detailed page sections during data fetching.
- **Search with Debounce**: Implements a search input with debounce functionality to optimize performance and reduce API calls.
- **Genre Filtering**: Allows users to filter search results by genre, integrated seamlessly with the movie list.
- **Infinite Scrolling**: Loads 10 movies per scroll increment using a custom state, optimized with React Virtualized for better performance.
- **TMDB Integration**: Utilizes the TMDB API for movie data, providing dynamic and up-to-date content.
- **Multi-Language Support**: Offers a customizable translation system using hooks, supporting English and Persian out of the box.
- **Responsive Design**: Built with Material-UI, ensuring a seamless experience across devices.

### Challenging Features & Solutions

- **Custom Delete Operation**: The TMDB API lacks a delete endpoint. I implemented delete functionality using localStorage, maintaining consistency with other API calls by writing a custom React Query function (`useQuery`) that integrates seamlessly with the project structure.
- **Data Filtering Optimization**: While `useQuery` provides a `select` option for filtering data, it caches the entire dataset in React Query. To optimize, I handled filtering at the API call layer within the query function, reducing cache overhead.
- **Dynamic Filtering Function**: Created a dynamic filtering function that adapts to different types and key-value pairs, ensuring flexible data manipulation based on project needs.
- **Paginated Data Handling**: TMDB API returns data in batches of 20. I introduced a custom state to handle loading 10 items per scroll, enhancing user experience with smoother infinite scrolling.
- **Client-Side Authentication**: The authentication is entirely client-side with no backend connection, which could pose security risks. To mitigate this, I used `encryptionWebCrypto` to encrypt usernames and passwords. Additional validations ensure no duplicate usernames, strong password requirements, and rejection of incorrect login attempts.
- **Custom Search and Genre Filtering**: The TMDB API lacks a single endpoint that supports filtering by both search query and genre simultaneously. I addressed this by fetching data from two separate API endpoints and manually handling the logic to combine and filter results. Additionally, when a user searches with a query, I perform client-side filtering of genres on the fetched data to provide a seamless experience.

## Prerequisites

- Node.js (v18.x or higher)
- npm or Yarn
- Git
- Docker (for local development)

## Environment Variables

The project relies on the following environment variables, defined in a `.env` file:

- `VITE_API_URL`: Base URL for API requests (e.g., `https://api.example.com`).
- `VITE_SECRET_KEY`: Secret key for encryption (e.g., `your-secret-key-123`).
- `VITE_IMAGE_URL`: Base URL for image assets (e.g., `https://image.tmdb.org/t/p/w500`).
- `VITE_API_KEY`: API key for TMDB (required for API access).

Create a `.env` file in the root directory with these variables:

```
VITE_API_URL=https://api.example.com
VITE_SECRET_KEY=your-secret-key-123
VITE_IMAGE_URL=https://image.tmdb.org/t/p/w500
VITE_API_KEY=your-tmdb-api-key
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Development

### Using Node.js

Run the development server:

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed.
2. Run the development environment:

   ```bash
   docker-compose up
   ```
3. Access the app at http://localhost:3000.

## Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### Local Docker Deployment

1. Ensure a `.env` file exists in the root directory with the required environment variables.
2. Build the Docker image:

   ```bash
   docker build -t movie-app .
   ```
3. Run the container (optional: override env vars at runtime for security):

   ```bash
   docker run -p 3000:3000 \
     -e VITE_API_URL=https://api.example.com \
     -e VITE_SECRET_KEY=your-secret-key-123 \
     -e VITE_IMAGE_URL=https://image.tmdb.org/t/p/w500 \
     -e VITE_API_KEY=your-tmdb-api-key \
     movie-app
   ```
4. Access the app at http://localhost:3000.

### Vercel Deployment

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:

   ```bash
   vercel login
   ```
3. Deploy the project:

   ```bash
   vercel --prod
   ```
4. Add environment variables in the Vercel dashboard under **Settings &gt; Environment Variables**.
5. The deployment URL will be provided after the build completes (e.g., https://movie-app.vercel.app).

## Project Structure

```
src/
├── features/         # Feature-specific logic (auth, movies)
│   ├── auth/         # Authentication logic and store
│   └── movies/       # Movie-related components, hooks, and API calls
├── pages/            # Page components with minimal logic
├── shared/           # Reusable code (components, utils, theme, types)
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── vite-env.d.ts     # TypeScript environment definitions
```

## Technologies

- **Zustand**: For state management.
- **React Query**: For data fetching, caching, and loading states.
- **React Router DOM**: For client-side routing.
- **Fetch/Axios**: For HTTP requests (Axios used in this project).
- **Material-UI**: As the component library for UI components.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## Cool Extras

- **Type Safety**: Leverages TypeScript throughout the project for robust type checking.
- **Custom Hooks**: Implements custom hooks like `useVirtualListInfiniteLoader` for optimized list rendering.
- **Theme Customization**: Uses Material-UI with a custom theme for a consistent dark-mode design.
- **Dockerized Development**: Includes `docker-compose.yml` for easy local setup with hot reload.

## License

MIT License