import styles from './spinner.module.css';

interface ISpinnerProps {
  isVisible: boolean;
}

export const Spinner = ({ isVisible }: ISpinnerProps) => {
  return isVisible && <span className={styles.spinner}></span>;
};
