// Kanto
import venusaur from "../public/images/kanto/venusaur.png";
import charizard from "../public/images/kanto/charizard.png";
import blastoise from "../public/images/kanto/blastoise.png";
import articuno from "../public/images/kanto/articuno.png";
import zapdos from "../public/images/kanto/zapdos.png";
import moltres from "../public/images/kanto/moltres.png";

// Johto
import meganium from "../public/images/johto/meganium.png";
import typhlosion from "../public/images/johto/typhlosion.png";
import feraligatr from "../public/images/johto/feraligatr.png";
import hooh from "../public/images/johto/ho-oh.png";
import lugia from "../public/images/johto/lugia.png";
import celibi from "../public/images/johto/celibi.png";

// Hoenn
import sceptile from "../public/images/hoenn/sceptile.png";
import blaziken from "../public/images/hoenn/blaziken.png";
import swampert from "../public/images/hoenn/swampert.png";
import groudon from "../public/images/hoenn/groudon.png";
import kyogre from "../public/images/hoenn/kyogre.png";
import rayquaza from "../public/images/hoenn/rayquaza.png";

// Sinnoh
import torterra from "../public/images/sinnoh/torterra.png";
import infernape from "../public/images/sinnoh/infernape.png";
import empoleon from "../public/images/sinnoh/empoleon.png";
import dialga from "../public/images/sinnoh/dialga.png";
import palkia from "../public/images/sinnoh/palkia.png";
import giratina from "../public/images/sinnoh/giratina.png";

// Unova
import serperior from "../public/images/unova/serperior.png";
import emboar from "../public/images/unova/emboar.png";
import samurott from "../public/images/unova/samurott.png";
import reshiram from "../public/images/unova/reshiram.png";
import zekrom from "../public/images/unova/zekrom.png";
import kyurem from "../public/images/unova/kyurem.png";

// Kalos
import chesnaught from "../public/images/kalos/chesnaught.png";
import delphox from "../public/images/kalos/delphox.png";
import greninja from "../public/images/kalos/greninja.png";
import xerneas from "../public/images/kalos/xerneas.png";
import yveltal from "../public/images/kalos/yveltal.png";
import zygarde from "../public/images/kalos/zygarde.png";

// Alola
import decidueye from "../public/images/alola/decidueye.png";
import incineroar from "../public/images/alola/incineroar.png";
import primarina from "../public/images/alola/primarina.png";
import lunala from "../public/images/alola/lunala.png";
import solgaleo from "../public/images/alola/solgaleo.png";
import necrozma from "../public/images/alola/necrozma.png";

interface RegionImagesMap {
  [key: string]: any
}

const RegionImages: RegionImagesMap = {
  "venusaur": venusaur.src,
  "charizard": charizard.src,
  "blastoise": blastoise.src,
  "articuno": articuno.src,
  "zapdos": zapdos.src,
  "moltres": moltres.src,

  "meganium": meganium.src,
  "typhlosion": typhlosion.src,
  "feraligatr": feraligatr.src,
  "hooh": hooh.src,
  "lugia": lugia.src,
  "celibi": celibi.src,

  "sceptile": sceptile.src,
  "blaziken": blaziken.src,
  "swampert": swampert.src,
  "groudon": groudon.src,
  "kyogre": kyogre.src,
  "rayquaza": rayquaza.src,

  "torterra": torterra.src,
  "infernape": infernape.src,
  "empoleon": empoleon.src,
  "dialga": dialga.src,
  "palkia": palkia.src,
  "giratina": giratina.src,

  "serperior": serperior.src,
  "emboar": emboar.src,
  "samurott": samurott.src,
  "reshiram": reshiram.src,
  "zekrom": zekrom.src,
  "kyurem": kyurem.src,

  "chesnaught": chesnaught.src,
  "delphox": delphox.src,
  "greninja": greninja.src,
  "xerneas": xerneas.src,
  "yveltal": yveltal.src,
  "zygarde": zygarde.src,

  "decidueye": decidueye.src,
  "incineroar": incineroar.src,
  "primarina": primarina.src,
  "lunala": lunala.src,
  "solgaleo": solgaleo.src,
  "necrozma": necrozma.src
}

export default RegionImages;