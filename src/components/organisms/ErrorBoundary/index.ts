// // ErrorBoundary.tsx
// import React, { Component, ErrorInfo, ReactNode } from 'react';

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(_: Error): ErrorBoundaryState {
//     // Update state so the next render shows the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     // You can log the error to an error reporting service here
//     console.error('Uncaught error:', error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Return the fallback UI (make sure you use the correct HTML tag here)
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
