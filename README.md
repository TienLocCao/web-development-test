# JSONPlaceholder App

A feature-rich web application built with Next.js and React.js to interact with the JSONPlaceholder API. This application demonstrates modern web development practices including authentication, search, filtering, pagination, and responsive design.

## 🚀 Features

### Authentication System
- **User Registration**: Create new accounts with email and password
- **User Login**: Secure authentication with email/password
- **Protected Routes**: Only authenticated users can access post details and comment functionality
- **User Management**: User profile information and logout functionality

### Posts & Content
- **Post Listing**: Browse all posts with pagination
- **Post Details**: View full post content with user information
- **Search & Filter**: Search posts by title/content and filter by user
- **Sorting**: Sort posts by title, ID, or user ID in ascending/descending order

### Comments System
- **View Comments**: See all comments on individual posts
- **Add Comments**: Authenticated users can add new comments
- **Comment Management**: Real-time comment updates

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: Proper loading indicators and error handling
- **Pagination**: Efficient navigation through large datasets

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for authentication
- **API Integration**: JSONPlaceholder REST API
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint with Next.js configuration

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jsonplaceholder-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 🔐 Demo Credentials

For testing purposes, you can use these demo credentials:

- **Email**: `demo@example.com`
- **Password**: `password`

Or create a new account using the signup functionality.

## 📱 Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── comments/       # Comment-related components
│   │   ├── common/         # Shared components (Pagination)
│   │   ├── layout/         # Layout components (Header)
│   │   └── posts/          # Post-related components
│   ├── contexts/           # React contexts (AuthContext)
│   ├── services/           # API service layer
│   ├── types/              # TypeScript type definitions
│   ├── auth/               # Authentication page
│   ├── posts/              # Post detail pages
│   ├── about/              # About page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
```

## 🔧 Available Scripts

- **`npm run dev`**: Start development server
- **`npm run build`**: Build for production
- **`npm run start`**: Start production server
- **`npm run lint`**: Run ESLint
- **`npm run type-check`**: Run TypeScript type checking

## 🌐 API Integration

This application integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/), which provides:

- **Posts**: 100 sample posts with titles and content
- **Users**: 10 sample users with profile information
- **Comments**: Sample comments for each post

The API is free to use and doesn't require authentication keys.

## 🎨 Design Features

- **Modern UI**: Clean, professional design inspired by modern web applications
- **Responsive Layout**: Mobile-first approach with breakpoints for all screen sizes
- **Color Scheme**: Consistent blue-based color palette with proper contrast
- **Typography**: Clear hierarchy with readable fonts
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper focus states and semantic HTML

## 🔒 Security Features

- **Protected Routes**: Authentication required for sensitive pages
- **Input Validation**: Form validation on both client and server side
- **Secure Storage**: User data stored in localStorage (for demo purposes)
- **Error Handling**: Proper error messages without exposing sensitive information

## 📱 Responsive Design

The application is fully responsive and works on:

- **Mobile Devices**: Optimized for small screens
- **Tablets**: Adaptive layout for medium screens
- **Desktop**: Full-featured experience on large screens
- **Touch Devices**: Touch-friendly interactions

## 🧪 Testing

The application includes:

- **TypeScript**: Static type checking for better code quality
- **ESLint**: Code linting and style enforcement
- **Responsive Testing**: Tested across different screen sizes
- **Cross-browser**: Compatible with modern browsers

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **AWS Amplify**: Connect your repository
- **Docker**: Use the provided Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **JSONPlaceholder**: For providing the free API service
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon set

## 📞 Support

If you have any questions or need help:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Coding! 🎉**
