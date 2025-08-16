import styles from './close.module.css';

type TCloseIconProps = {
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
};

export const CloseIcon = ({ onClick }: TCloseIconProps) => {
  return (
    <svg className={styles.icon} viewBox="-0.5 0 25 25" onClick={onClick}>
      <path d="m3 21.32 18-18M3 3.32l18 18" />
    </svg>
  );
};
