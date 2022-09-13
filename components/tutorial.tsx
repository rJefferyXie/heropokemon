// Styles
import styles from '../styles/Tutorial.module.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

// MUI
import { ClickAwayListener, Button } from '@mui/material';

// MUI Icons
import MapIcon from '@mui/icons-material/Map';
import PetsIcon from '@mui/icons-material/Pets';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculateIcon from '@mui/icons-material/Calculate';
import LandscapeIcon from '@mui/icons-material/Landscape';

const Tutorial = () => {
  const dispatch = useDispatch();
  const tutorial = useSelector((state: any) => { return state.tutorialReducer});

  const exit = () => {
    dispatch(allActions.tutorialActions.setShowTutorial());
  }

  interface tutorialSection {
    subtitle: string;
    description: string;
    icon: any;
    images: string[];
  }

  const tutorialSections: tutorialSection[] = [
    {
      subtitle: 'TEAM',
      description: 'Everything you need to know about your team.',
      icon: <GroupsIcon fontSize='inherit'></GroupsIcon>,
      images: ["/images/tutorial/team1.png", "/images/tutorial/team2.png", "/images/tutorial/team3.png"]
    },
    {
      subtitle: 'ENEMY',
      description: 'Learn more about the wild Pokémon that you will encounter in your travels.',
      icon: <PetsIcon fontSize='inherit'></PetsIcon>,
      images: ["/images/tutorial/enemy.png"]
    },
    {
      subtitle: 'ROUTES',
      description: 'See how the different routes can change your adventure.',
      icon: <MapIcon fontSize='inherit'></MapIcon>,
      images: ["/images/tutorial/floors.png"]
    },
    {
      subtitle: 'ENVIRONMENTS',
      description: 'Discover the different environments and the different Pokémon that live in them.',
      icon: <LandscapeIcon fontSize='inherit'></LandscapeIcon>,
      images: ["/images/tutorial/environment.png"]
    },
    {
      subtitle: 'GAME FORMULAS',
      description: 'Read about the math formulas being used in the game.',
      icon: <CalculateIcon fontSize='inherit'></CalculateIcon>,
      images: ["/images/tutorial/team2.png"]
    }
  ]

  return (
    tutorial.showTutorial && <div className={styles.overlay}>
      <ClickAwayListener onClickAway={exit}>
        <div className={styles.container}>
          <h1 className={styles.title}>TUTORIAL</h1>

          <div className={styles.tutorialCards}>
            {tutorialSections.map((section, idx) => {
              return (
                <div className={styles.tutorialCard} key={idx}>
                  <p className={styles.icon}>{section.icon}</p>
                  <h2 className={styles.subtitle}>{section.subtitle}</h2>
                  <p className={styles.description}>{section.description}</p>
                </div>
              );
            })}
          </div>

          <Button className={styles.exitButton} onClick={exit}>EXIT</Button>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default Tutorial;