import styles from './error.module.css';

interface IError {
  message: string;
}

export const Error = ({ message }: IError) => {
  return <span className={styles.error}>{message}</span>;
};
