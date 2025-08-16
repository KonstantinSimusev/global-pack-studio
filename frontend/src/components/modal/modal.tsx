import styles from './modal.module.css';

type TModalProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal = ({ onClose, children }: TModalProps) => {
  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      {children}
    </div>
  );
};
