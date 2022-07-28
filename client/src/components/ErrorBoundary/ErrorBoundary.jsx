import React from 'react';
import './ErrorBoundary.css';

const ErrorView = ({ error, errorInfo }) => (
  <div className="error-section">
    <div>
      <h1>Something went wrong.</h1>
      <details>
        {error && error.toString()}
        <br />
        {error.componentStack}
      </details>
    </div>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) return <ErrorView {...{ error, errorInfo }} />;
    return this.props.children;
  }
}

export default ErrorBoundary;
