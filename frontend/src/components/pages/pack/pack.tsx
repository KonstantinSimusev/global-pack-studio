// import styles from './pack.module.css';

// import { useEffect } from 'react';

// import { PackList } from '../../lists/pack-list/pack-list';

// import { useDispatch, useSelector } from '../../../services/store';
// import { selectShifts } from '../../../services/slices/shift/slice';
// import { getTeamShifts } from '../../../services/slices/shift/actions';

// import { formatDate } from '../../../utils/utils';

// export const Pack = () => {
//   const dispatch = useDispatch();
//   const shifts = useSelector(selectShifts);
//   const lastShift = shifts[0];

//   useEffect(() => {
//     dispatch(getTeamShifts());
//   }, []);

//   return (
//     <main className={styles.container}>
//       {lastShift ? (
//         <>
//           <div className={styles.wrapper__margin}>
//             <h5 className={styles.header__title}>УПАКОВКА</h5>
//             <div className={styles.wrapper__info}>
//               <div className={styles.wrapper}>
//                 <span className={styles.title}>Дата</span>
//                 <span className={styles.text}>
//                   {formatDate(lastShift.date)}
//                 </span>
//               </div>

//               <div className={styles.wrapper}>
//                 <span className={styles.title}>№ смены</span>
//                 <span className={styles.text}>
//                   Смена {lastShift.shiftNumber}
//                 </span>
//               </div>

//               <div className={styles.wrapper}>
//                 <span className={styles.title}>№ бригады</span>
//                 <span className={styles.text}>
//                   Бригада {lastShift.teamNumber}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <PackList />
//         </>
//       ) : (
//         <span className={styles.text__info}>Пожалуйста, создайте смену...</span>
//       )}
//     </main>
//   );
// };
