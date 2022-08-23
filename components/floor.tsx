// React and Styling
import styles from '../styles/Floor.module.scss';

// MUI
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import TokenIcon from '@mui/icons-material/Token';

interface FloorProps {
  setFloor: Function,
  floor: number,
  highestFloor: number,
  current?: boolean
}

const Floor = (props: React.PropsWithChildren<FloorProps>) => {
  const { setFloor, floor, highestFloor, current } = props;

  return (
    <div className={current ? styles.currentFloor : styles.floor} onClick={floor <= highestFloor ? () => setFloor(floor) : () => null}>
      <p>{floor}</p>
      <div className={styles.iconContainer}>
        {floor <= highestFloor ? <DoneIcon></DoneIcon> : <ClearIcon></ClearIcon>}
        {floor % 10 === 0 && <TokenIcon></TokenIcon>}
      </div>
    </div>
  );
}

export default Floor;