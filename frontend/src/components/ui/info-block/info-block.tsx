import styles from './info-block.module.css';

interface IInfoBlockProps {
  title: string;
  text: string | number;
}

export const InfoBlock = ({ title, text }: IInfoBlockProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
