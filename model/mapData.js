const Images = [
    { image: require("../assets/banners/food-banner1.jpg") },
    { image: require("../assets/banners/food-banner2.jpg") },
    { image: require("../assets/banners/food-banner3.jpg") },
    { image: require("../assets/banners/food-banner4.jpg") },
    { image: require("../assets/banners/food-banner5.jpg") },
    { image: require("../assets/banners/food-banner6.jpg") },
    { image: require("../assets/banners/food-banner7.jpg") },
    { image: require("../assets/banners/food-banner8.jpg") },
    { image: require("../assets/banners/food-banner9.jpg") },
    { image: require("../assets/banners/food-banner10.jpg") },
    { image: require("../assets/banners/food-banner11.jpg") },
];

export const markers = [
    {
      coordinate: {
        latitude: -13.303720673007433,
        longitude: -72.11534428482658,
      },
      title: "Adobo a lo Mamacha",
      description: "Mamacha Juana Sopas y Guisos",
      image: Images[3].image,
      rating: 5,
      reviews: 1,
    },
    {
      coordinate: {
        latitude: -13.30488400187192,
        longitude: -72.11526538094402,
      },
      title: "Curry de verduras con arroz y pan naan",
      description: "Kampu",
      image: Images[1].image,
      rating: 0,
      reviews: 0
    },
    {
      coordinate: {
        latitude: -13.310036491089871,
        longitude: -72.1126645864638,
      },
      title: "Buffet Andino",
      description: "El Maizal",
      image: Images[2].image,
      rating: 0,
      reviews: 0,
    },
    {
      coordinate: {
        latitude: -13.525226531747563,
        longitude: -71.95173891082763
      },
      title: "Furai Maki",
      description: "Itamae Sushi Bar",
      image: Images[0].image,
      rating: 4.333333333333333,
      reviews: 3
    },
    {
      coordinate: {
        latitude: -13.307658792389006,
        longitude: -72.11492793270111,
      },
      title: "Ravioles de Espinaca y Ricotta en salsa de Queso Azul y Tomates Salteados",
      description: "El Huacatay",
      image: Images[5].image,
      rating: 0,
      reviews: 0,
    },
    {
      coordinate: {
        latitude: -13.307176905387323,
        longitude: -72.11431182054619,
      },
      title: "Pizza Pizza Wasi de Pollo con Verduras",
      description: "Pizza Wasi",
      image: Images[4].image,
      rating: 0,
      reviews: 0,
    },
    {
      coordinate: {
        latitude: -13.306730399980001,
        longitude: -72.11856787511971,
      },
      title: "Hamburguesas de frijoles negros",
      description: "Pacha Sara Vegan",
      image: Images[6].image,
      rating: 0,
      reviews: 0,
    },
    {
      coordinate: {
        latitude: -13.309713271414207,
        longitude: -72.11778610777796
      },
      title: "Pisco Sour Hawa",
      description: "Restaurante Hawa",
      image: Images[7].image,
      rating: 0,
      reviews: 0
    },
    {
      coordinate: {
        latitude: -13.3072564874526,
        longitude: -72.11925270587967
      },
      title: "Pollo al curry y plátano",
      description: "Tres Keros Restaurante - Grill & Bar",
      image: Images[8].image,
      rating: 0,
      reviews: 0
    },
    {
      coordinate: {
        latitude: -13.307228143633028,
        longitude: -72.11881587426274
      },
      title: "Lomo Saltado",
      description: "Tierra Restaurante",
      image: Images[9].image,
      rating: 3,
      reviews: 1
    },
    {
      coordinate: {
        latitude: -13.299029212385587,
        longitude: -72.1286116504071
      },
      title: "Pie de manzana",
      description: "Q'anela Restaurante",
      image: Images[10].image,
      rating: 4,
      reviews: 1
    },
];

export const mapStandardStyle = [
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
  ];