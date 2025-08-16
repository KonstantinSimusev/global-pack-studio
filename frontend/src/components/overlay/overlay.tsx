import styles from './overlay.module.css';

type TOverlayProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const Overlay = ({ onClose, children }: TOverlayProps) => {
  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  );
};
