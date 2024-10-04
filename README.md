# Veyor Wellness

**Veyor Wellness** is a wellness booking web application built with Create React App using TypeScript. The app features three main pages—Booking, Guest Info, and Confirmation—to help users schedule wellness sessions easily.

## Tech Stack

- **React** (with TypeScript)
- **Tailwind CSS**
- **React Hook Form**
- **React Router DOM**

## Pages

1. **Booking Page**  
   Allows users to choose a wellness session. After selecting a session, users can pick a preferred date and time.
2. **Guest Info Page**  
   Contains a simple form for users to input their personal details such as first name, last name, phone number, and email.
3. **Confirmation Page**  
   Displays the selected wellness session along with the chosen date and time. Users can opt to cancel or reschedule.

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:felixgohh/veyor-wellness.git
   cd veyor-wellness
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Running Tests

To run the unit tests:

```bash
npm test
```

This command will launch Jest in watch mode, running all tests and re-running them when changes are detected.

## Build and Vercel Deployment

To build the project for production:

```bash
npm run build
```

To deploy the app on **Vercel**:

1. Commit and push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/), log in, and import your project from GitHub.
3. Follow the deployment instructions provided by Vercel [here](https://vercel.com/docs/concepts/projects/overview#deploying-projects).

Once deployed, the app will be live at the URL provided by Vercel.
