const hairFiberDescription =
  "KeraLux hårfibrer hjälper den som lider av håravfall eller allmänt tunt hår att få ett tjockare och tätare hår på ett snabbt och enkelt sätt. De mikroskopiska fibrerna fäster sig på dina hårstrån, även mycket tunna hårstrån, och får omedelbart håret att se tjockare och fylligare ut på ett naturtroget sätt. Ämnet som fibrerna består av är keratin, samma ämne som riktigt hår består av.";

export const products = [
  {
    slug: "keralux-black",
    name: "KeraLux Svart",
    image: "/products/keralux-black.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-dark-brown",
    name: "KeraLux Mörkbrun",
    image: "/products/keralux-dark-brown.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-medium-brown",
    name: "KeraLux Mellanbrun",
    image: "/products/keralux-medium-brown.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-light-brown",
    name: "KeraLux Ljusbrun",
    image: "/products/keralux-light-brown.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-medium-blonde",
    name: "KeraLux Mellanblond",
    image: "/products/keralux-medium-blonde.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-blonde",
    name: "KeraLux Blond",
    image: "/products/keralux-blonde.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-light-blonde",
    name: "KeraLux Ljusblond",
    image: "/products/keralux-light-blonde.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-grey",
    name: "KeraLux Grå",
    image: "/products/keralux-grey.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-white",
    name: "KeraLux Vit",
    image: "/products/keralux-white.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-auburn",
    name: "KeraLux Auburn",
    image: "/products/keralux-auburn.jpg",
    price: 299,
    description: hairFiberDescription,
  },
  {
    slug: "keralux-applikator",
    name: "KeraLux Applikator",
    image: "/products/keralux-applikator.jpg",
    price: 149,
    description: "Applikator för enkel och precis applicering av hårfibrer.",
  },
];

export type Product = (typeof products)[number];
