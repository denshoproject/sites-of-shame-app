import React, { useEffect, useState } from "react";
import classNames from "classnames";

const PopupImage = ({ alt, className, src }) => {
  const [imageError, setImageError] = useState(false);
  useEffect(() => setImageError(false), [src]);
  if (imageError) return null;

  return (
    <div className="popup-row">
      <img
        alt={alt}
        src={src}
        className={classNames("imgcrop", className)}
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default PopupImage;
