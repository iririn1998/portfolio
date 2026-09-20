import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./index.module.css";

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.props.onReset?.();
    this.setState({
      hasError: false,
      error: null,
    });
  };

  override render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (typeof fallback === "function") {
        return fallback(error, this.reset);
      }
      if (fallback) {
        return fallback;
      }
      return (
        <div role="alert" className={styles.fallback}>
          <h2 className={styles.title}>Something went wrong.</h2>
          <pre className={styles.detail}>{error.message}</pre>
          <button type="button" className={styles.retryBtn} onClick={this.reset}>
            Try again
          </button>
        </div>
      );
    }

    return children;
  }
}
