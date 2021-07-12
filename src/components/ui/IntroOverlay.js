import React, { useContext, useState } from "react";

import { Context } from "store";
import IntroOverlayContent from "components/ui/IntroOverlayContent";

const IntroOverlay = () => {
  const { state } = useContext(Context);
  const { showIntro } = state.intro;

  const [overlayText, setOverlayText] = useState(true);

  const closeIntroOverlay = () => {
    setOverlayText(false);
  };

  return (
    <div>
      {overlayText && showIntro ? (
        <IntroOverlayContent closeOverlay={closeIntroOverlay} />
      ) : null}
    </div>
  );
};

export default IntroOverlay;
