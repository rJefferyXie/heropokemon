// Styles
import styles from '../styles/Tutorial.module.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Tutorial = () => {
  const dispatch = useDispatch();
  const tutorial = useSelector((state: any) => { return state.tutorialReducer});

  return (
    <div>tutorial</div>
  )
}

export default Tutorial;