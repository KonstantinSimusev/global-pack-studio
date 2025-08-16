import styles from './burger.module.css';

type TBurgerIconProps = {
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
};

export const BurgerIcon = ({ onClick }: TBurgerIconProps) => {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" onClick={onClick}>
      <path d="M4 18h16M4 12h16M4 6h16" />
    </svg>
  );
};
