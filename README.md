# FreshCart E-commerce Application

A modern React-based e-commerce application built with Bootstrap and various React libraries.

## Developer
**Mohamed Adel**

## Features

- 🛒 Shopping Cart Management
- 🔐 User Authentication (Login/Register)
- 📱 Mobile Responsive Design
- 🛍️ Product Catalog with Categories
- 📦 Order Management System
- 📞 Contact Form with WhatsApp Integration
- 🎨 Modern UI with Bootstrap
- 🔄 Offline Detection
- 📍 Address Management for Orders

## Technologies Used

- **React** 18.2.0
- **React Router DOM** 6.8.0
- **Bootstrap** 5.3.8
- **Axios** for API calls
- **Formik & Yup** for form validation
- **React Hot Toast** for notifications
- **React Spinners** for loading states
- **React Helmet Async** for SEO

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd app3
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Build for Production

\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── Home/
│   ├── Cart/
│   ├── Order/
│   ├── Product/
│   ├── FeatureProducts/
│   ├── Login/
│   ├── Register/
│   ├── Contact/
│   ├── Adress/
│   └── Context/
├── assets/
└── App.js
\`\`\`

## Key Features Implementation

### Authentication Flow
- JWT token-based authentication
- Protected routes
- Persistent login state

### Cart Management
- Add/remove products
- Local storage backup
- API integration with fallback

### Order System
- Address validation
- Order confirmation
- Order history

### Mobile Responsiveness
- Bootstrap responsive grid
- Mobile-optimized footer
- Touch-friendly interface

## API Integration

The application integrates with the Route E-commerce API for:
- Product catalog
- User authentication
- Cart operations
- Order management

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is developed by Mohamed Adel.

## Contact

For any inquiries, please use the contact form in the application or reach out via WhatsApp integration.