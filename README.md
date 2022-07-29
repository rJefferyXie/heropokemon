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
![First Time Visit](https://prnt.sc/GUAstxCiWDXg)
![Regions Screen](https://prnt.sc/GWCty7KHAhNd)
![Region Selection](https://prnt.sc/9ySqidK5bOXi)
![Game Page](https://prnt.sc/vUtlP2VkrsUO)

# Technologies <a name="technologies"></a>
* NextJS - Used to create a static site for website hosting, along with several useful features such as [image optimization](https://nextjs.org/docs/basic-features/image-optimization), which greatly reduced loading times for large images.
* Google Firebase - Used to host the website and store the pokedex information using [Cloud Firestore](https://firebase.google.com/docs/firestore).
* TypeScript - Used to add [type support](https://www.typescriptlang.org/) to components for better readability and usability.
* Redux - Used to centralize and share state between components, removing the need for prop drilling.
* Framer Motion - Used to seamlessly create and add animations to React components.
* Github Actions - Created a [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd) pipeline to automate the deployment of my project and code.
* Cypress - Created several integration tests and an end-to-end test for all the game functionalities to simulate a real user.
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
* Calculating Damage: https://bulbapedia.bulbagarden.net/wiki/Damage
* Type Color Templates: https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
* Type Advantages: https://www.theloadout.com/pokemon-type-chart
* Badge Images: https://bulbapedia.bulbagarden.net/wiki/Badge#Indigo_League
* Setting up CI/CD: https://github.com/pnpm/action-setup
* Github Actions for Cypress: https://github.com/cypress-io/github-action
* Using SetInterval with React https://overreacted.io/making-setinterval-declarative-with-react-hooks/
* CSS Color Schemes: https://tailwindcss.com/docs/customizing-colors
* Setting up Redux in NextJS: https://medium.com/how-to-react/how-to-setup-redux-in-nextjs-5bce0d82b8de
* Rerouting Error in NextJS: https://stackoverflow.com/questions/54815348/nextjs-page-goes-to-404-on-refresh
* EXP Calculation for Player: https://www.reddit.com/r/2007scape/comments/3idn2b/comment/cufhle9/