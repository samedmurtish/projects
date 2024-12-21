//posters
import bmwThumb from "../assets/images/! Project Thumbnails/bmwThumb.png";
import bmwDetail from "../assets/images/project-images/Poster/bmw/bin 2.png";

import boatThumb from "../assets/images/! Project Thumbnails/boatThumb.png";
import boatDetail from "../assets/images/project-images/Poster/gemi/gemi 2.png";

import elliotThumb from "../assets/images/! Project Thumbnails/elliotThumb.png";
import elliotDetail from "../assets/images/project-images/Poster/eliot/eli 2.jpg";

import fuckThumb from "../assets/images/! Project Thumbnails/fuckThumb.png";
import fuckDetail from "../assets/images/project-images/Poster/no fuck/fuck 2.png";

import julesThumb from "../assets/images/! Project Thumbnails/julesThumb.png";
import julesDetail from "../assets/images/project-images/Poster/jules/jul 2.jpg";

import mendoThumb from "../assets/images/! Project Thumbnails/mendoThumb.png";
import mendoDetail from "../assets/images/project-images/Poster/mendo/mendo 2.png";

import planetThumb from "../assets/images/! Project Thumbnails/planetThumb.jpg";
import planetDetail from "../assets/images/project-images/Poster/planet/planet 2.png";

import rueThumb from "../assets/images/! Project Thumbnails/rueThumb.png";

//logos with details
import carLogoThumb from "../assets/images/! Project Thumbnails/carLogoThumb.png";
import carLogoDetail1 from "../assets/images/project-images/Logo/econo car/car1.png";
import carLogoDetail2 from "../assets/images/project-images/Logo/econo car/car2.png";

import pyramidThumb from "../assets/images/! Project Thumbnails/pyramidThumb.jpg";
import pyramidLogoDetail1 from "../assets/images/project-images/Logo/pyramid/pyramid1.jpg";
import pyramidLogoDetail2 from "../assets/images/project-images/Logo/pyramid/pyramid2.jpg";

// magazines with details
import magazineThumb from "../assets/images/! Project Thumbnails/magazineThumb.jpg";
import magazineDetail1 from "../assets/images/project-images/Magazine/0.jpg";
import magazineDetail2 from "../assets/images/project-images/Magazine/1.jpg";
import magazineDetail3 from "../assets/images/project-images/Magazine/2.jpg";
import magazineDetail4 from "../assets/images/project-images/Magazine/3.jpg";
import magazineDetail5 from "../assets/images/project-images/Magazine/4.jpg";
import magazineDetail6 from "../assets/images/project-images/Magazine/5.jpg";
import magazineDetail7 from "../assets/images/project-images/Magazine/6.jpg";
import magazineDetail8 from "../assets/images/project-images/Magazine/7.jpg";

// skateboard designs with details
import skateThumb from "../assets/images/! Project Thumbnails/skateThumb.png";
import skateDetail1 from "../assets/images/project-images/Skate/3.png";
import skateDetail2 from "../assets/images/project-images/Skate/4.png";

// social media content with details
import kazfonThumb from "../assets/images/! Project Thumbnails/zecThumb.png";
import kazfonDetail1 from "../assets/images/project-images/Advertisement/zec 2.png";
import kazfonDetail2 from "../assets/images/project-images/Advertisement/zec 3.png";
import kazfonDetail3 from "../assets/images/project-images/Advertisement/zec 4.png";
import kazfonDetail4 from "../assets/images/project-images/Advertisement/zec 5.png";
import kazfonDetail5 from "../assets/images/project-images/Advertisement/zec 6.png";

import fcStrugaThumb from "../assets/images/! Project Thumbnails/fcStrugaThumb.png";
import fcStrugaDetail1 from "../assets/images/project-images/Fcstruga/FCstruga-01.png";
import fcStrugaDetail2 from "../assets/images/project-images/Fcstruga/FCstruga-02.png";
import fcStrugaDetail3 from "../assets/images/project-images/Fcstruga/FCstruga-03.png";

/* 
posters 
magazine
social media content 
logo design
skateboard design
*/

export const projectData = [
  {
    id: 0,
    name: "BIN IT !",
    category: "Posters",
    thumbnail: `${bmwThumb}`,
    details: [
      {
        img: `${bmwThumb}`,
        title: "Bin It",
        text: "The 'Bin It' poster was designed to address the issue of littering. The visual metaphor of a trash can preventing a car from moving underscores the importance of keeping our streets clean for a smoother, more harmonious urban environment!",
      },
      {
        img: `${bmwDetail}`,
        title: "Bin It",
        text: "",
      },
    ],
  },
  {
    id: 1,
    name: "KEEP IT !",
    category: "Posters",
    thumbnail: `${boatThumb}`,
    details: [
      {
        img: `${boatThumb}`,
        title: "Keep It",
        text: "The 'Keep It Clean' poster was designed with a similar purpose as the 'Bin It' poster, but this time focusing on water conservation—a critical issue that demands our attention.",
      },
      {
        img: `${boatDetail}`,
        title: "Keep It",
        text: "",
      },
    ],
  },
  {
    id: 2,
    name: "Save The Planet !",
    category: "Posters",
    thumbnail: `${planetThumb}`,
    details: [
      {
        img: `${planetThumb}`,
        title: "Save The Planet",
        text: "The 'Save the Planet' poster was created to address the issue of littering. It highlights the paradox where individuals capture photos and videos for social media, yet their actions in reality do not reflect genuine concern for the environment.",
      },
      {
        img: `${planetDetail}`,
        title: "Save The Planet",
        text: "",
      },
    ],
  },
  {
    id: 3,
    name: "F*CK !",
    category: "Posters",
    thumbnail: `${fuckThumb}`,
    details: [
      {
        img: `${fuckThumb}`,
        title: "F*CK !",
        text: "The 'I Don't Be Giving No F**k' poster was created as an experimental piece, exploring new artistic styles for fun.",
      },
      {
        img: `${fuckDetail}`,
        title: "F*CK !",
        text: "",
      },
    ],
  },
  {
    id: 4,
    name: "Mendo",
    category: "Posters",
    thumbnail: `${mendoThumb}`,
    details: [
      {
        img: `${mendoThumb}`,
        title: "Mendo !",
        text: "The 'Just Sk8, Don't Pose' poster was an assignment during my university studies. I was tasked with creating a poster that conveyed my personality without explicitly stating it. It turned out to be a highly enjoyable project.",
      },
      {
        img: `${mendoDetail}`,
        title: "Mendo !",
        text: "",
      },
    ],
  },
  {
    id: 5,
    name: "Rue Bennett",
    category: "Posters",
    thumbnail: `${rueThumb}`,
    details: [
      {
        img: `${rueThumb}`,
        title: "Rue Bennett",
        text: "The 'Rue Bennett' poster is part of a three-part series inspired by the show 'Euphoria.' This university assignment resulted in all three posters being exhibited in the university gallery. The specific focus of this poster is on the show's first season.",
      },
    ],
  },
  {
    id: 6,
    name: "Elliot",
    category: "Posters",
    thumbnail: `${elliotThumb}`,
    details: [
      {
        img: `${elliotThumb}`,
        title: "Elliot",
        text: "The 'Elliot' poster is part of a three-part series inspired by the show 'Euphoria.' This university assignment resulted in all three posters being exhibited in the university gallery. The specific focus of this poster is on the show's second season.",
      },
      {
        img: `${elliotDetail}`,
        title: "Elliot",
        text: "",
      },
    ],
  },
  {
    id: 7,
    name: "Jules Vaughn",
    category: "Posters",
    thumbnail: `${julesThumb}`,
    details: [
      {
        img: `${julesThumb}`,
        title: "Jules Vaughn",
        text: "The 'Jules Vaughn' poster is part of a three-part series inspired by the show 'Euphoria.' This university assignment resulted in all three posters being exhibited in the university gallery. The specific focus of this poster is on the show's first season.",
      },
      {
        img: `${julesDetail}`,
        title: "Jules Vaughn",
        text: "",
      },
    ],
  },
  {
    id: 8,
    name: "KAZFON",
    category: "Social Media Content",
    thumbnail: `${kazfonThumb}`,
    details: [
      {
        img: `${kazfonThumb}`,
        title: "KAZFON",
        text: "Creating these social media posts was a deliberate self-assessment of my graphic design skills. I found immense satisfaction in their outcome. Interestingly, when I shared them with the company, after they offered me to do my internship with them.",
      },
      {
        img: `${kazfonDetail1}`,
        title: "IPHONE X",
        text: "",
      },
      {
        img: `${kazfonDetail2}`,
        title: "SAMSUNG GALAXY A34 5G",
        text: "",
      },
      {
        img: `${kazfonDetail3}`,
        title: "SAMSUNG GALAXY FO4",
        text: "",
      },
      {
        img: `${kazfonDetail4}`,
        title: "XIAMO 11 LITE 5G",
        text: "",
      },
      {
        img: `${kazfonDetail5}`,
        title: "A1 ALPHA ECO",
        text: "",
      },
    ],
  },
  {
    id: 9,
    name: "FC STRUGA",
    category: "Social Media Content",
    thumbnail: `${fcStrugaThumb}`,
    details: [
      {
        img: `${fcStrugaThumb}`,
        title: "FC STRUGA",
        text: "These social media posts were created for my local football team, FC Struga Trim Lum. Although I haven't shared them with the team yet, I hope that when I do, they will consider me as their social media content creator.",
      },
      {
        img: `${fcStrugaDetail1}`,
        title: "NEXT MATCH",
        text: "",
      },
      {
        img: `${fcStrugaDetail2}`,
        title: "STARTING XI",
        text: "",
      },
      {
        img: `${fcStrugaDetail3}`,
        title: "PRE SEASON GAMES",
        text: "",
      },
    ],
  },
  {
    id: 10,
    name: "Magazine",
    category: "Magazine",
    thumbnail: `${magazineThumb}`,
    details: [
      {
        img: `${magazineThumb}`,
        title: "Magazine",
        text: "The 'Flip Frame Magazine' is one of my favorite projects. In my university studies, I was assigned to create a magazine related to art and graphic design, and I chose skateboarding as my theme. This project allowed me to express myself extensively, and it remains one of my most accomplished works.",
      },
      {
        img: `${magazineDetail1}`,
        title: "Erased Project",
        text: "",
      },
      {
        img: `${magazineDetail2}`,
        title: "Fisheye",
        text: "",
      },
      {
        img: `${magazineDetail3}`,
        title: "Deisgning Decks",
        text: "",
      },
      {
        img: `${magazineDetail4}`,
        title: "Local Shops",
        text: "",
      },
      {
        img: `${magazineDetail5}`,
        title: "Fashion",
        text: "",
      },
      {
        img: `${magazineDetail6}`,
        title: "Brands",
        text: "",
      },
      {
        img: `${magazineDetail7}`,
        title: "Stylish Skater",
        text: "",
      },
      {
        img: `${magazineDetail8}`,
        title: "2K24 Skateboarding",
        text: "",
      },
    ],
  },
  {
    id: 11,
    name: "Econocar",
    category: "Logo Designs",
    thumbnail: `${carLogoThumb}`,
    details: [
      {
        img: `${carLogoThumb}`,
        title: "Econocar",
        text: "The 'Econo Car' logo was assigned to me during my university studies. I was tasked with animating it using HTML, CSS, and JavaScript. Unfortunately, this is all i got of the logo",
      },
      {
        img: `${carLogoDetail1}`,
        title: "Econocar",
        text: "",
      },
      {
        img: `${carLogoDetail2}`,
        title: "Econocar",
        text: "",
      },
    ],
  },
  {
    id: 12,
    name: "My Piramit",
    category: "Logo Designs",
    thumbnail: `${pyramidThumb}`,
    details: [
      {
        img: `${pyramidThumb}`,
        title: "My Piramit",
        text: "The 'My Piramit' logo was intended for my cousin's unsuccessful online shopping company.",
      },
      {
        img: `${pyramidLogoDetail1}`,
        title: "My Piramit",
        text: "",
      },
      {
        img: `${pyramidLogoDetail2}`,
        title: "My Piramit ",
        text: "",
      },
    ],
  },

  {
    id: 13,
    name: "Skateboard",
    category: "Skateboard Designs",
    thumbnail: `${skateThumb}`,
    details: [
      {
        img: `${skateThumb}`,
        title: "Skateboard",
        text: "Creating skate decks for fun and then realizing their potential for your magazine is a fantastic journey! It's wonderful how your creativity led to such unique designs. Incorporating characters from 'Euphoria' adds an intriguing touch.",
      },
      {
        img: `${skateDetail1}`,
        title: "Skateboard",
        text: "",
      },
      {
        img: `${skateDetail2}`,
        title: "Skateboard",
        text: "",
      },
    ],
  },
];

export let sortedCategories = [];

export function sortCategories() {
  projectData.map((value) => {
    let matches = false;
    sortedCategories.forEach((sortedValue) => {
      if (sortedCategories.length > 0)
        if (value.category == sortedValue) matches = true;
    });
    if (!matches) sortedCategories = [...sortedCategories, value.category];
  });
}

sortCategories();
