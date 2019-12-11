import React from 'react';

interface IErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  error: any;
  errorInfo: any;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = { error: undefined, errorInfo: undefined };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { errorInfo } = this.state;

    if (errorInfo) {
      return (
        <h3>An unexpected error has occurred.</h3>
      );
    }
    return this.props.children;
  }
}
