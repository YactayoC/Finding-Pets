import { useState, FormEvent, MouseEvent } from "react";
import Avvvatars from "avvvatars-react";

import { AvatarProps, AvatarSize } from "components/Avatar/types";
import styles from "components/Avatar/avatar.module.css";

const getAvatarSize = (size: AvatarSize) => {
  switch (size) {
    case "small":
      return 48;
    case "normal":
      return 96;
    case "medium":
      return 128;
    case "large":
      return 150;
  }
};

type PreviewState = {
  url: string;
  image: File;
};

export default function Avatar({
  rounded,
  size,
  src,
  editable,
  email: name,
  alt,
  onConfirmUpload,
  ...props
}: AvatarProps) {
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<PreviewState | null>(null);

  const defaultSize = size || "normal";
  const avvvatarsSize = getAvatarSize(defaultSize);

  const avatarSrc = preview?.url || src;

  const handleImageError = () => {
    setError(true);
  };

  const handleImageLoad = (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview({
      url,
      image: file,
    });
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleConfirmUpload = () => {
    if (!preview || !onConfirmUpload) return;
    onConfirmUpload(preview?.image);
  };

  const handleCancelUpload = () => {
    setPreview(null);
  };

  return (
    <picture className={`${styles.container} ${styles[defaultSize]}`}>
      {editable && !preview && (
        <label className={styles.actions} role="button">
          <b> {/* this is for align to right using flex :c*/} </b>
          <span className={styles.iconButton}>
            <i className="fa-solid fa-camera"></i>
            <input
              type="file"
              hidden
              accept="image/*"
              onInput={handleImageLoad}
            />
          </span>
        </label>
      )}
      {editable && preview && (
        <div className={styles.actions}>
          <button
            className={`${styles.iconButton} ${styles.cancelButton}`}
            type="button"
            onClick={handleCancelUpload}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button
            className={`${styles.iconButton} ${styles.confirmButton}`}
            type="button"
            onClick={handleConfirmUpload}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      )}
      {error ? (
        <Avvvatars value={name} size={avvvatarsSize} />
      ) : (
        <img
          src={avatarSrc}
          {...props}
          alt={alt}
          className={styles.avatarImg}
          onError={handleImageError}
        />
      )}
    </picture>
  );
}
