import styles from './overlay.module.css';

type TOverlayProps = {
  onClose?: () => void;
};

export const Overlay = ({ onClose }: TOverlayProps) => {
  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return <div className={styles.overlay} onClick={handleClick}></div>;
};
