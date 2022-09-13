// Styling
import styles from '../../styles/reusable/IconImage.module.scss';

// Next
import ExportedImage from 'next-image-export-optimizer';
import React from 'react';

interface IconImageProps {
  size: string,
  src: string,
  alt: string
}

const IconImage = (props: React.PropsWithChildren<IconImageProps>) => {
  const { size, src, alt } = props;

  return (
    <div className={styles.container}>
      <ExportedImage
        layout="fixed" 
        width={size === "large" ? "128px" : "64px"}
        height={size === "large" ? "128px" : "64px"} 
        src={src}
        alt={alt}
      ></ExportedImage>
    </div>
  );
}

export default IconImage;