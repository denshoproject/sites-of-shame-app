import React from "react";
import { Switch, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import About from "components/About";
import Index from "components/Index";
import Nav from "components/ui/Nav";
import IntroOverlay from "components/ui/IntroOverlay";
import "./App.scss";

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends React.Component {
    componentDidMount() {
      const {
        location: { pathname: page },
      } = this.props;
      trackPage(page);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      const {
        location: { pathname: currentPage },
      } = this.props;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};
const App = () => {
  return (
    <div className="App">
      <IntroOverlay />
      <Nav />
      <Switch>
        <Route path="/" exact component={withTracker(Index)} />
        <Route path="/about" exact component={withTracker(About)} />
      </Switch>
    </div>
  );
};

export default App;
