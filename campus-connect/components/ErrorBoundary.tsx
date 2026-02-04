import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
   children: ReactNode;
   fallback?: ReactNode;
}

interface State {
   hasError: boolean;
   error: Error | null;
   errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         hasError: false,
         error: null,
         errorInfo: null,
      };
   }

   static getDerivedStateFromError(error: Error): State {
      // Update state so the next render will show the fallback UI
      return {
         hasError: true,
         error,
         errorInfo: null,
      };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      // Log error to console or error reporting service
      console.error('ErrorBoundary caught an error:', error, errorInfo);

      this.setState({
         error,
         errorInfo,
      });

      // You can also log to an error reporting service here
      // Example: logErrorToService(error, errorInfo);
   }

   handleReset = () => {
      this.setState({
         hasError: false,
         error: null,
         errorInfo: null,
      });
   };

   handleGoHome = () => {
      window.location.href = '/';
   };

   render() {
      if (this.state.hasError) {
         // Custom fallback UI
         if (this.props.fallback) {
            return this.props.fallback;
         }

         // Default error UI
         return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
               <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-6 text-center">
                     <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                        <AlertTriangle className="w-10 h-10 text-white" />
                     </div>
                     <h1 className="text-3xl font-bold text-white mb-2">
                        Oops! Something went wrong
                     </h1>
                     <p className="text-red-100">
                        We encountered an unexpected error
                     </p>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                     <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold text-red-900 mb-2">
                           Error Details:
                        </h2>
                        <p className="text-red-700 text-sm font-mono break-words">
                           {this.state.error?.toString()}
                        </p>
                     </div>

                     {/* Development mode - show stack trace */}
                     {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                        <details className="mb-6">
                           <summary className="cursor-pointer text-gray-700 font-semibold mb-2 hover:text-gray-900">
                              Stack Trace (Development Only)
                           </summary>
                           <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 overflow-auto max-h-64">
                              <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                                 {this.state.errorInfo.componentStack}
                              </pre>
                           </div>
                        </details>
                     )}

                     {/* Action Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4">
                        <button
                           onClick={this.handleReset}
                           className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                           <RefreshCw className="w-5 h-5" />
                           Try Again
                        </button>
                        <button
                           onClick={this.handleGoHome}
                           className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors duration-200"
                        >
                           <Home className="w-5 h-5" />
                           Go to Homepage
                        </button>
                     </div>

                     {/* Help Text */}
                     <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                           If this problem persists, please contact support or try refreshing the page.
                        </p>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
                     <p className="text-sm text-gray-600">
                        Error ID: {Date.now().toString(36)}
                     </p>
                  </div>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
