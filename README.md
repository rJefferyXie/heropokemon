# HeroPokemon

Welcome to my take on a Pokemon-based clicker game. This game was inspired by games such as Cookie Clicker, Clicker Heroes, and Pokemon. 

Check it out here! https://heropokemon.web.app/

# Table of Contents
* [About](#about)
* [Images](#images)
* [Technologies](#technologies)
* [Regions](#regions)
* [Sources](#sources)

# About <a name="about"></a>
* This is an incremental / clicker game created by me that is built using modern web techologies, drawing inspiration from other games such as Runescape, Cookie Clicker, Clicker Heroes, and Pokemon.

# Images <a name="images"></a>
![Home Page](https://user-images.githubusercontent.com/73203729/181860151-81201c7b-9a80-4371-93f4-9b3d49b24737.png)
![Regions Page](https://user-images.githubusercontent.com/73203729/181860187-1e86cbd2-c523-4fca-bb0d-12d4b4ce492a.png)
![Region Selection](https://user-images.githubusercontent.com/73203729/181860218-6aadd4b2-8d25-4c92-ac06-4bc3ef8cecb5.png)
![Game Screen](https://user-images.githubusercontent.com/73203729/181860236-cb76510d-d09a-44c1-9c50-fa28a08277ba.png)

# Technologies <a name="technologies"></a>
* NextJS - Used to create [static HTML files](https://nextjs.org/docs/advanced-features/static-html-export) for website hosting, along with several useful features such as [image optimization](https://nextjs.org/docs/basic-features/image-optimization), which greatly reduced loading times for large images.
* Google Firebase - Used to [host the website](https://firebase.google.com/docs/hosting) and store the pokedex information using [Cloud Firestore](https://firebase.google.com/docs/firestore).
* TypeScript - Used to add [type support](https://www.typescriptlang.org/) to components for better readability and usability.
* Redux - Used to [centralize and share state](https://redux.js.org/) between components, removing the need for prop drilling.
* Framer Motion - Used to seamlessly create and add [animations](https://www.framer.com/motion/) to React components.
* Github Actions - Created a [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd) pipeline to automate the deployment of my project and code.
* Cypress - Created several integration and end-to-end tests to simulate a real user using the website.
* MaterialUI - A library of pre-built production-ready React components.
* SASS - Used for styling the website.

# Regions <a name="regions"></a>
* Kanto
   * Red and Blue (Yellow)
   * FireRed and LeafGreen
   * Gold and Silver (Crystal)
   * HeartGold and SoulSilver
* Johto
   * Gold and Silver (Crystal)
   * HeartGold and SoulSilver
* Hoenn
   * Ruby and Sapphire (Emerald)
   * Omega Ruby and Alpha Sapphire
* Sinnoh
   * Diamond and Pearl (Platinum)
* Unova
   * Black and White
   * Black 2 and White 2
* Kalos
   * X and Y
* Alola
   * Sun and Moon
   * Ultra Sun and Ultra Moon

# Sources <a name="sources"></a>
* Database: https://pokeapi.co/api/
* Setting up CI/CD: https://github.com/pnpm/action-setup
* Type Advantages: https://www.theloadout.com/pokemon-type-chart
* CSS Color Schemes: https://tailwindcss.com/docs/customizing-colors
* Calculating Damage: https://bulbapedia.bulbagarden.net/wiki/Damage
* Github Actions for Cypress: https://github.com/cypress-io/github-action
* Badge Images: https://bulbapedia.bulbagarden.net/wiki/Badge#Indigo_League
* Type Color Templates: https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
* EXP Calculation for Player: https://www.reddit.com/r/2007scape/comments/3idn2b/comment/cufhle9/
* Game Formulas: https://clickerheroes.fandom.com/wiki/Formulas
* Setting up Cypress E2E tests with Redux: https://www.cypress.io/blog/2018/11/14/testing-redux-store/
* Using SetInterval with React https://overreacted.io/making-setinterval-declarative-with-react-hooks/
* Setting up Redux in NextJS: https://medium.com/how-to-react/how-to-setup-redux-in-nextjs-5bce0d82b8de
* Rerouting Error in NextJS: https://stackoverflow.com/questions/54815348/nextjs-page-goes-to-404-on-refresh
