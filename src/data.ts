export interface Municipality {
  name: string;
  festival: string;
  date: string;
  province: string;
  lat: number;
  lng: number;
  description?: string;
  image?: string;
}

export const PROVINCES = [
  "Provincia de Pasto",
  "Provincia Costa Pacífica",
  "Provincia de Juanambú",
  "Provincia de Túquerres"
];

export interface DetailedEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  image: string;
  gallery?: string[];
}

export const PASTO_EVENTS: DetailedEvent[] = [
  {
    id: 'carnaval',
    name: 'Carnaval de Negros y Blancos',
    date: '2-7 Enero',
    description: 'Declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO, es la fiesta más grande del sur de Colombia. Incluye el Precarnaval (diciembre), el Desfile de Colonias, la Familia Castañeda (4 de enero), el Día de Negros (5 de enero) y el majestuoso Desfile de Carrozas en el Día de Blancos (6 de enero). Es una explosión de color, arte, música y juego que celebra la diversidad y la fraternidad.',
    image: 'https://destinacolombia.com/wp-content/uploads/2019/01/carnaval-negros-blancos-dia-3-enero-desfile-colectivos-coreograficos-turismo-pasto-destinocolombia.jpg',
    gallery: [
      'https://www.senalcolombia.tv/sites/default/files/styles/noticia_detalle/public/field/image/carnaval-de-negros-y-blancos.jpg',
      'https://caracol.com.co/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fprisaradioco%2FML2S6WNZMRE7NFJMQX7YPXE4KE.jpg?auth=6a7a0b3f7f8f9e6a2b8e4f1a6c9e0f3d6a7a0b3f7f8f9e6a2b8e4f1a6c9e0f3d&height=800&width=1200&quality=70&smart=true'
    ]
  },
  {
    id: 'semana-santa',
    name: 'Semana Santa (Senda de la Fe)',
    date: 'Marzo/Abril',
    description: 'La Senda de la Fe es una innovadora propuesta que combina arte, espiritualidad y tradición para transformar el centro histórico en una galería al aire libre. Se pueden apreciar esculturas monumentales de las estaciones del viacrucis elaboradas por artesanos del carnaval. Además de las tradicionales procesiones de templos históricos como San Juan, La Merced y Cristo Rey, que guardan tesoros de la imaginería colonial.',
    image: 'https://informativodelguaico.com/wp-content/uploads/2025/04/Senda-de-la-fe-en-Pasto-5-1018x573.jpg',
    gallery: [
      'https://informativodelguaico.com/wp-content/uploads/2024/03/Senda-de-fe-Pasto.jpg',
      'https://tse3.mm.bing.net/th/id/OIP.JF7Tfg25JOxtWcfT9JWoggHaEK?rs=1&pid=ImgDetMain&o=7&rm=3'
    ]
  },
  {
    id: 'galeras-rock',
    name: 'Galeras Rock',
    date: 'Agosto',
    description: 'El festival de rock más importante del suroccidente colombiano. Es una plataforma para bandas locales, nacionales e internacionales que promueve el desarrollo de las culturas alternativas. Un espacio de convivencia y expresión juvenil que se toma la Plaza del Carnaval con potentes sonidos y una propuesta visual impactante.',
    image: 'https://radionacional-v3.s3.amazonaws.com/s3fs-public/styles/portadas_relaciona_4_3/public/2022-08/Galeras%20Rock.jpg',
    gallery: [
      'https://tse1.mm.bing.net/th/id/OIP.n_hX8Xm8Xm8Xm8Xm8Xm8Xm8?rs=1&pid=ImgDetMain',
      'https://www.pasto.gov.co/images/2023/ago/galeras_rock_2023.jpg'
    ]
  },
  {
    id: 'festival-trucha',
    name: 'Festival de la Trucha (El Encano)',
    date: 'Enero (Primeras semanas)',
    description: 'Ubicado a las orillas de la Laguna de la Cocha, el corregimiento del Encano celebra este festival gastronómico. Es la oportunidad perfecta para degustar la trucha arcoíris en diversas preparaciones, conocer la arquitectura tipo suiza de "El Puerto" y disfrutar de regatas en la laguna y música campesina.',
    image: 'https://caracol.com.co/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fprisaradioco%2FML2S6WNZMRE7NFJMQX7YPXE4KE.jpg?auth=6a7a0b3f7f8f9e6a2b8e4f1a6c9e0f3d6a7a0b3f7f8f9e6a2b8e4f1a6c9e0f3d&height=800&width=1200&quality=70&smart=true',
    gallery: [
      'https://tse2.mm.bing.net/th/id/OIP.X1X1X1X1X1X1X1X1X1X1X1X1?rs=1&pid=ImgDetMain',
      'https://narino.gov.co/wp-content/uploads/2023/01/truchaencano.jpg'
    ]
  },
  {
    id: 'onomastico',
    name: 'Onomástico Municipal',
    date: '13-30 Junio (Central: 24 Junio)',
    description: 'El 24 de junio, Pasto celebra su Onomástico en honor a su santo patrono, San Juan Bautista. El nombre "San Juan de Pasto" fue otorgado oficialmente en 1559 por la corona española. Esta conmemoración resalta el sentido de pertenencia, la historia y la cultura local, celebrándose con actividades religiosas, actos protocolarios y eventos culturales que unen a la comunidad.',
    image: 'https://caracol.com.co/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fprisaradioco%2FVFTFA3ELOZCFZAKR2TKGQC46VQ.jpeg?auth=c6ba2935ac9f323e3ae04fe335cafcaa98e07182c10e537ac15e709560391ff8&height=800&width=1200&quality=70&smart=true',
    gallery: [
      'https://tse1.mm.bing.net/th/id/OIP.wqtnCTYlrSPossv9kAmQZAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://www.pasto.gov.co/images/2022/jul/Arte_y_TRadicion.jpg'
    ]
  },
  {
    id: 'guaguas-pan',
    name: 'San Pedro, San Pablo y las Guaguas de Pan',
    date: '28-29 Junio',
    description: 'Tradición arraigada en los corregimientos de Jongovito y Obonuco. Es una fiesta donde los santos patronos y las guaguas de pan son protagonistas en una actitud de fervor y agradecimiento comunitario. Representa un sincretismo entre memorias prehispánicas andinas y herencias españolas, vinculando costumbres y saberes que otorgan un sello especial a su cultura.',
    image: 'https://informativodelguaico.com/wp-content/uploads/2023/07/Guaguas-Jongovito.jpg',
    gallery: [
      'https://tse1.mm.bing.net/th/id/OIP.vCt2d5r7oANIl1EHmCMe9wHaKP?rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://th.bing.com/th/id/R.8f1e041d6c9e127fcb03cc7b9cea1048?rik=FWvqNQtJnHtl8A&riu=http%3a%2f%2fbp2.blogger.com%2f_cje0SQU4gjk%2fSFsWQpYL8YI%2fAAAAAAAACh0%2ffYSn9XJbrUQ%2fs0-d%2f000_0075.jpg&ehk=8ip7pe3GFBVZIO507i1oyl6KKDGc8frl1wz8FGDaQ7o%3d&risl=&pid=ImgRaw&r=0'
    ]
  },
  {
    id: 'teatro',
    name: 'Festival Internacional de Teatro',
    date: '1-15 Septiembre',
    description: 'Festival de gran trayectoria que reúne a artistas nacionales e internacionales. Durante la celebración, el teatro se toma los parques, salas y auditorios de la ciudad. Se realizan talleres, tertulias y conversatorios con maestros invitados para promover la cultura de este arte y afianzar lazos de unión entre la comunidad.',
    image: 'https://image.jimcdn.com/app/cms/image/transf/dimension=634x10000:format=jpg/path/s30f4f4d3c44d12ba/image/i9e10fda3747ba978/version/1590452414/teatro-imperial.jpg',
    gallery: [
      'https://www.pasto.gov.co/images/2023/ago/inauguracion_festival_de_teatro.jpg',
      'https://tse3.mm.bing.net/th/id/OIP.Q6QvginA_IaclQobL6xRkgHaD4?rs=1&pid=ImgDetMain&o=7&rm=3'
    ]
  },
  {
    id: 'cine',
    name: 'Festival Internacional de Cine (FICPA)',
    date: '10-12 Octubre',
    description: 'El FICPA es un destacado evento competitivo que reúne lo mejor del cine nacional e internacional. Con categorías que abarcan desde los derechos humanos hasta el cine infantil. Otorga el codiciado premio Sol de los Pastos, consolidándose como un imperdible en el calendario cultural del suroccidente colombiano.',
    image: 'https://tse3.mm.bing.net/th/id/OIP.p3Y5UOQxLhEYHqAMBrjgpAHaNJ?rs=1&pid=ImgDetMain&o=7&rm=3',
    gallery: [
      'https://www.hsbnoticias.com/wp-content/uploads/2025/09/f7f7a84b-f487-4026-a495-c828e40bd5a1.jpg',
      'https://tse1.mm.bing.net/th/id/OIP.4bONGsWWgKBYDLXNsP4GAAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3'
    ]
  }
];

export const MUNICIPALITIES: Municipality[] = [
  // Provincia de Pasto
  { 
    name: "Pasto", 
    festival: "Carnaval de Negros y Blancos / Semana Santa / Onomástico / San Pedro y San Pablo / Teatro / Cine", 
    date: "Enero / Marzo / Junio / Septiembre / Octubre", 
    province: "Provincia de Pasto", 
    lat: 1.2136, 
    lng: -77.2811,
    description: "Pasto es una ciudad de profundas tradiciones que trascienden su famoso Carnaval. Durante la Semana Santa, la 'Senda de la Fe' convierte su centro histórico en una galería espiritual con esculturas del viacrucis elaboradas por artesanos locales. En junio, celebra su Onomástico en honor a San Juan Bautista y las ancestrales fiestas de San Pedro y San Pablo con las icónicas Guaguas de Pan en corregimientos como Jongovito. Su vibrante agenda cultural incluye festivales internacionales de teatro y cine (FICPA), consolidándola como un referente artístico, de fe y tradición en el sur de Colombia.",
    image: "https://destincolombia.com/wp-content/uploads/2019/01/carnaval-negros-blancos-dia-3-enero-desfile-colectivos-coreograficos-turismo-pasto-destincolombia.jpg"
  },
  { 
    name: "Buesaco", 
    festival: "Carnaval de los Rojos", 
    date: "7 enero", 
    province: "Provincia de Pasto", 
    lat: 1.3881, 
    lng: -77.1553,
    description: "En Buesaco se celebra el Carnaval de Rojos el día 7 de enero, una tradición que llevan los buesaqueños desde hace más de 25 años. Durante este día un desfile viste de rojo las calles del municipio con comparsas de atuendos elaborados con materiales naturales como látigo, fique, semillas, entre otros, acompañas de grupos musicales que imprimen alegría a la celebración. Así mismo, sus habitantes usan el cosmético rojo para celebrar con propios y visitantes, haciendo de esta una fiesta de mucha alegría y jolgorio. En la plaza principal se realizan presentaciones musicales, un punto de encuentro para dar cierre a una de las celebraciones más representativas de Nariño. Se dice que este festejo inició en 1975 como un hecho espontáneo entre sus pobladores, quienes venían de celebrar el Carnaval de Negros y Blancos de Pasto.",
    image: "https://i.ytimg.com/vi/y4ysC9sClBA/maxresdefault.jpg"
  },
  { 
    name: "Chachagüí", 
    festival: "Festival de la Cultura y el Turismo", 
    date: "25-30", 
    province: "Provincia de Pasto", 
    lat: 1.3533, 
    lng: -77.2853,
    description: "Ubicado en el norte del departamento de Nariño, a tan solo unos minutos de Pasto, se encuentra Chachagüí, un lugar donde el verde de las montañas, el azul de los ríos y el alma cálida de su gente se unen para ofrecer una experiencia turística única. Con una altitud promedio de 1.950 metros sobre el nivel del mar y un clima templado de 20 °C durante todo el año, este municipio se ha convertido en un refugio perfecto para quienes buscan conectar con la naturaleza, descubrir tradiciones vivas y vivir el turismo de una forma auténtica y sostenible. Chachagüí no solo es paisaje; es cultura, historia, biodiversidad y comunidad. Es uno de esos lugares donde el tiempo se desacelera y la vida se disfruta con calma, con café caliente y vista al amanecer. El municipio ha decidido apostarle decididamente al turismo como motor de desarrollo económico, social y ambiental, consolidándose como un destino emergente y competitivo en el sur del país.",
    image: "https://turismo.narino.gov.co/wp-content/uploads/2025/09/CHACHAGUI-131-scaled.jpg"
  },
  { 
    name: "Consacá", 
    festival: "Festividades de la Virgen del Tránsito", 
    date: "9-15 agosto", 
    province: "Provincia de Pasto", 
    lat: 1.2083, 
    lng: -77.4625,
    description: "Consacá fue fundado el 17 de diciembre de 1861 y, en sus inicios, formó parte de la gobernación de Popayán, incluyendo territorios como la hacienda de San Antonio de Bomboná. Este lugar es reconocido por su importancia histórica, ya que allí se desarrolló la Batalla de Bomboná el 7 de abril de 1822, entre las tropas independentistas lideradas por Simón Bolívar y el ejército realista comandado por Basilio García. En este enfrentamiento también resultó herido el general Pedro León Torres, quien falleció días después. Hoy en día, el sitio conserva vestigios como una casa colonial que habría servido como cuartel libertador y la Piedra de Bomboná, desde donde, según la tradición, Bolívar contempló el campo de batalla, convirtiendo a la zona en un referente histórico y patrimonial de la región.",
    image: "https://th.bing.com/th/id/R.de96d317a3c5f439c2384c45cbc3eed5?rik=bfggJbCmc%2bJtqQ&pid=ImgRaw&r=0"
  },
  { 
    name: "El Peñol", 
    festival: "San Francisco de Asís", 
    date: "4 octubre", 
    province: "Provincia de Pasto", 
    lat: 1.4556, 
    lng: -77.4500,
    description: "Fundado por el capitán Diego de Benavides en territorio Quillacinga, El Peñol ha superado desplazamientos y desastres naturales en asentamientos previos. Paso clave en la 'Ruta hacia la libertad' transitada por Simón Bolívar, se consolidó en su ubicación actual en 1912 y obtuvo su autonomía de El Tambo en 1998, reafirmando una identidad de resiliencia y pujanza.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2020/10/LaLlanada-1.gif"
  },
  { 
    name: "El Tambo", 
    festival: "Festival de la Canción \"Voz del Curiquingue\"", 
    date: "28 – 31 agosto", 
    province: "Provincia de Pasto", 
    lat: 1.4167, 
    lng: -77.4000,
    description: "El El Tambo, cuyo nombre proviene del quechua tampu (posada o lugar de descanso en el camino), es un municipio ubicado a 37 km de Pasto. Se caracteriza por su clima templado de aproximadamente 18 °C, gracias a su altitud de 2240 msnm, y limita con municipios como El Peñol, Chachagüí, La Florida, Sandoná, Linares y Los Andes. Su economía se basa principalmente en la agricultura y la ganadería, destacándose cultivos como fríjol, maíz, café, cebolla, plátano y caña panelera, además de la producción de leche y la cría de ganado bovino y porcino, que sostienen la vida económica de sus más de 36 mil habitantes.",
    image: "https://turismo.narino.gov.co/wp-content/uploads/2025/02/13.jpg"
  },
  { 
    name: "La Florida", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Pasto", 
    lat: 1.2986, 
    lng: -77.4125,
    description: "El municipio de La Florida, ubicado en el departamento de Nariño, se encuentra a 24,7 km de Pasto, con una altitud de 2240 metros sobre el nivel del mar y coordenadas cercanas a 1°18’ de latitud norte y 77°24’ de longitud oeste; limita con municipios como El Tambo, Sandoná, Consacá, Chachagüí y Nariño; cuenta con una extensión de 143 km² y una organización territorial compuesta por su cabecera municipal, diversas veredas y centros poblados como Achupayas, El Rodeo, San José de Matituy, Santa Cruz de Robles y Tunja Grande, lo que refleja su estructura rural y diversidad geográfica.",
    image: "https://th.bing.com/th/id/R.e21c9ec9cd0edcd394f6cbb0aa752bfb?rik=w3jYda7TmwOrSQ&pid=ImgRaw&r=0"
  },
  { 
    name: "Nariño", 
    festival: "Fiesta de San Francisco de Asís", 
    date: "3 – 4 octubre", 
    province: "Provincia de Pasto", 
    lat: 1.2833, 
    lng: -77.3500,
    description: "Nariño es un municipio ubicado en el noreste del nudo de los Pastos, en las estribaciones del Volcán Galeras. Fue fundado el 2 de septiembre de 1879 sobre un antiguo asentamiento indígena liderado por el cacique Chaguarbamba, y tras varios cambios administrativos —como corregimiento de La Florida y luego de Pasto— se convirtió en municipio en 1999. Su economía es principalmente agrícola, destacándose cultivos como maíz, papa, café, plátano y yuca, en un territorio influenciado por la actividad volcánica. Además, cuenta con conexión vial a través de la circunvalar del Galeras, que lo comunica con municipios cercanos y zonas rurales.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2019/12/Nari%C3%B1o-Frontis-768x509.jpg"
  },
  { 
    name: "Sandoná", 
    festival: "Fiesta de la Virgen del Tránsito / Concurso de Danza Folclórica", 
    date: "15 agosto / 20-21 octubre", 
    province: "Provincia de Pasto", 
    lat: 1.2875, 
    lng: -77.4719,
    description: "Sandoná es un municipio ubicado a 48 km de Pasto, asentado sobre la meseta de Paltapamba a 1848 msnm. En época prehispánica estuvo habitado por los indígenas quillasingas. Durante la colonización, sus tierras pasaron a manos de encomenderos y órdenes religiosas, hasta que en el siglo XIX fueron expropiadas por el Estado; posteriormente, el general Tomás Cipriano de Mosquera donó parte del territorio a los indígenas para fundar el poblado. El municipio fue creado en 1867 y desde 1878 se conoce como Sandoná, conservando una rica historia ligada a procesos indígenas y republicanos.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0DjN59-ng-ddQQIai1Jp39Qy2sztdXYhfFN-sY8pLtZJznNoRYHAF2u6wT21A-7TVR8AHiDbUiHevm3UieHYa95RZVoHfGkS0S5OGsaUV1aMNyiTRZe5OQrODKj3LeHYp773pRahVCAxbTKYg_HM4ZvVthjqvmeKjdq4uuZ74R9IUgpohU9JeFISv/s1024/sandona.jpg"
  },
  { 
    name: "Tangua", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Pasto", 
    lat: 1.1000, 
    lng: -77.4000,
    description: "El nombre de Tangua tiene diversos orígenes según la tradición histórica y cultural: uno de ellos señala que proviene de una voz incaica asociada a una tribu liderada por el cacique Tangua, que llegó a la región por el río Guamuez; otra versión indica que el nombre surge de la expresión “tanta agua”, que con el tiempo se contrajo hasta formar “Tangua”; y una tercera hipótesis lo relaciona con la tagua, conocida como el “marfil vegetal” de la selva amazónica, aunque esta última tiene menor aceptación, ya que la región no ha tenido una relación directa con la cultura amazónica, pese a posibles contactos antiguos como zona de tránsito.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2016/07/PanoTang.png"
  },
  { 
    name: "Yacuanquer", 
    festival: "Encuentro Internacional de música y danzas folclóricas", 
    date: "18-19 agosto", 
    province: "Provincia de Pasto", 
    lat: 1.1167, 
    lng: -77.4333,
    description: "Es la celebración de las fiestas de fundación del municipio de Yacuanquer que se realizan cada año, acontecimiento que permite integrar a los municipios del departamento de Nariño a través de la música y danza. El encuentro internacional nace en el año 2001 por la motivación de integrar y dar a conocer el talento existente en el municipio y buscar su proyección, fusionando identidad e idiosincrasia para festejar sus más de 460 años de historia.",
    image: "https://th.bing.com/th/id/R.08a0c41eeede556dd49b05a277b3948a?rik=uMQJnn7jt%2bEjhQ&riu=http%3a%2f%2fwww.viajarenverano.com%2fwp-content%2fuploads%2f2015%2f12%2fPalmUglYac.png&ehk=n5xiLZte37qUms5A%2bf9RN5F8uutUnCj%2bgjZb27bCtaw%3d&risl=&pid=ImgRaw&r=0"
  },

  // Provincia Costa Pacífica
  { 
    name: "Barbacoas", 
    festival: "Jesús Nazareno (Patrono)", 
    date: "6 de enero (primeras semanas de enero)", 
    province: "Provincia Costa Pacífica", 
    lat: 1.6722, 
    lng: -78.1403,
    description: "La población fue fundada en 1871 y es municipio desde 1937. Tiene como patrono del pueblo a Jesús Nazareno y sus fiestas se realizan las primeras semanas de enero teniendo como día especial el 6 de enero, fecha en que se hace un recorrido por las principales calles del municipio.",
    image: "https://tse3.mm.bing.net/th/id/OIP.kbblogt23mNR9fho62AkSAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "El Charco", 
    festival: "San Juan Bautista", 
    date: "24 junio", 
    province: "Provincia Costa Pacífica", 
    lat: 2.4750, 
    lng: -78.1100,
    description: "El municipio de El Charco ha enfrentado una historia marcada por desastres naturales y dificultades sociales: en 1906 fue destruido por un terremoto-maremoto conocido como “La Visita”, y en 1953 un incendio arrasó el 95% del corregimiento cuando aún pertenecía a Santa Bárbara de Iscuandé; en 1967 se constituyó como municipio independiente, manteniendo el nombre de El Charco pese a disputas con la iglesia, y en 1979 otro terremoto-maremoto destruyó completamente la población; posteriormente, en 2010, el municipio recibió miles de personas desplazadas por el conflicto armado —relacionado con la presencia de las FARC y el narcotráfico— lo que colapsó sus recursos, evidenciando además sus limitaciones de acceso, ya que el transporte se realiza principalmente por vía fluvial.",
    image: "https://media.gettyimages.com/id/1247959645/photo/aerial-view-of-a-village-in-el-charco-municipality-in-the-colombian-department-of-narino.jpg?s=612x612&w=gi&k=20&c=TiUjXIUqmfBdQuFYxCmdnKIq0xN7DGwTqjEP8gl3o-I="
  },
  { 
    name: "Francisco Pizarro", 
    festival: "San Francisco de Asís", 
    date: "4 octubre", 
    province: "Provincia Costa Pacífica", 
    lat: 1.9500, 
    lng: -78.7333,
    description: "La población, fundada en 1526 por Bartolomé Ruiz, tiene dentro de su jurisdicción la isla del Gallo, escenario histórico donde Francisco Pizarro protagonizó el episodio de los “Trece de la Fama”, al trazar una línea en la arena invitando a sus hombres a elegir entre regresar a Panamá o continuar hacia el Perú, siendo trece los que decidieron seguirlo; además, en tiempos recientes, en 2018, la población realizó un boicot a las elecciones presidenciales como forma de protesta por el abandono del Estado colombiano.",
    image: "https://turismo.narino.gov.co/wp-content/uploads/2025/09/FRACISCO-PIZARRO_Yalicer-Noguera-Salazar_38-scaled.jpg"
  },
  { 
    name: "La Tola", 
    festival: "Fiesta de la Purísima", 
    date: "8 diciembre", 
    province: "Provincia Costa Pacífica", 
    lat: 2.3833, 
    lng: -78.2167,
    description: "La Tola es un municipio de la costa pacífica nariñense cuyo nombre se asocia a una mujer indígena recordada por su navegación en el río. Su poblamiento se consolidó a inicios del siglo XX con migrantes de Guapi y Timbiquí, junto a comunidades embera. Fue creado oficialmente en 1991, destacándose por una fuerte identidad cultural ligada a la vida ribereña y al entorno natural del Pacífico.",
    image: "https://tse1.mm.bing.net/th/id/OIP.Eav3NSE-FDStRlUozGYfugHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Magüí Payán", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia Costa Pacífica", 
    lat: 1.9167, 
    lng: -78.0333,
    description: "Magüí Payán es un municipio de la costa pacífica nariñense que celebra con gran fervor la fiesta de la Virgen del Carmen cada 16 de julio. Su historia y cultura están profundamente ligadas a la vida ribereña y las tradiciones afrodescendientes, manifestándose a través de la música de marimba y la fe de su pueblo.",
    image: "https://tse3.mm.bing.net/th/id/OIP.kbblogt23mNR9fho62AkSAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Mosquera", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia Costa Pacífica", 
    lat: 2.5000, 
    lng: -78.4500,
    description: "Fundado por el General Tomás Cipriano de Mosquera en 1850 sobre terrenos comprados a Ana María González. Su arquitectura evolucionó de paja y chonta a madera y zinc, consolidándose como municipio tras batallas históricas. En 1979, su territorio dio origen al municipio de Olaya Herrera.",
    image: "https://cdn.arcgis.com/sharing/rest/content/items/3556f50854224e369cffd6bcde4d224c/resources/uZwUy9Ozru3NqKjB8o_y4.jpeg?w=400"
  },
  { 
    name: "Olaya Herrera", 
    festival: "Encuentro de Música del Pacífico", 
    date: "todo el mes de noviembre", 
    province: "Provincia Costa Pacífica", 
    lat: 2.3333, 
    lng: -78.3333,
    description: "Olaya Herrera es un municipio ubicado en la costa pacífica nariñense, cuya cabecera es Bocas de Satinga. Con un clima cálido de 26 °C, rinde homenaje al expresidente Enrique Olaya Herrera. Forma parte del área del Parque Nacional Natural Sanquianga, destacándose por su inmensa riqueza natural y biodiversidad en el suroccidente del país.",
    image: "https://narino.gov.co/wp-content/uploads/2025/12/sanquiangaabajo.jpg"
  },
  { 
    name: "Roberto Payán", 
    festival: "Carnavales Cuencos de Ríos", 
    date: "9 – 12 febrero", 
    province: "Provincia Costa Pacífica", 
    lat: 1.7167, 
    lng: -78.3167,
    description: "Roberto Payán es un municipio colombiano ubicado en el departamento de Nariño, cuya cabecera municipal es San José de Telembí. Se erigió en municipio mediante ordenanza n.º 27132 del 7 de junio de 1937. Se sitúa a una distancia aproximada de 122 kilómetros de Pasto y es posible llegar en lancha desde Barbacoas en un viaje de 40 minutos por el Río Patía.",
    image: "https://radionacional-v3.s3.amazonaws.com/s3fs-public/styles/portadas_relaciona_4_3/public/node/article/field_image/roberto%20payan.jpg?h=ff96e258&itok=u4MOicUy"
  },
  { 
    name: "Santa Bárbara de Iscuandé", 
    festival: "Santa Bárbara", 
    date: "4 diciembre", 
    province: "Provincia Costa Pacífica", 
    lat: 2.4500, 
    lng: -78.1500,
    description: "Santa Bárbara, también llamada Santa Bárbara de Iscuandé, es un municipio ubicado en la costa pacífica nariñense, cuya cabecera municipal es Iscuandé. Se sitúa a 550 km de Pasto. Fue fundado por Francisco de la Parada en 1600 y elevado a la categoría de municipio el 20 de diciembre de 1966. Es un territorio de gran importancia histórica y cultural en el litoral pacífico sur.",
    image: "https://narino.gov.co/wp-content/uploads/2025/11/SANQUIANGA.jpg"
  },
  { 
    name: "Tumaco", 
    festival: "Carnaval del Fuego / Festival del Currulao", 
    date: "12-17 feb y ago / 7-9 dic", 
    province: "Provincia Costa Pacífica", 
    lat: 1.8067, 
    lng: -78.7647,
    description: "El Carnaval del Fuego es una de las manifestaciones culturales más importantes del Pacífico nariñense, nacido tras un incendio en 1959 que unió a la comunidad. Incluye desfiles náuticos, comparsas y la 'Noche Afro'. Asimismo, el Festival del Currulao (diciembre) exalta la música de marimba y danzas tradicionales, consolidándose como un escenario de resistencia y reafirmación de las raíces afrodescendientes.",
    image: "https://th.bing.com/th/id/R.07b5b73402af8e90ed40cde575f56731?rik=8cRY8WAm8URjYg&pid=ImgRaw&r=0"
  },

  // Provincia de Obando
  { 
    name: "Aldana", 
    festival: "Virgen de las Mercedes", 
    date: "24 septiembre", 
    province: "Provincia de Obando", 
    lat: 0.8833, 
    lng: -77.7167,
    description: "El municipio de Aldana, anteriormente llamado Pastás, fue fundado hacia 1728 por Narcisa Quiscualtud y José Pastás. En 1911 fue reconocido oficialmente como distrito municipal, separándose de Cuaspud. Su territorio es mayormente ondulado con climas de frío y páramo, rico en recursos hídricos como los ríos Blanco y Pusialquer. Es una comunidad con profundas raíces rurales y una historia de organización administrativa ligada a Ipiales y Pasto.",
    image: "https://2.bp.blogspot.com/-T1Op805Q-cg/TzKIDCsPFGI/AAAAAAAAAOc/C2fAc2eFH6c/s1600/aldana.jpg"
  },
  { 
    name: "Contadero", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Obando", 
    lat: 0.9167, 
    lng: -77.5333,
    description: "El municipio de El Contadero se ubica en la cordillera Occidental de los Andes, sobre el altiplano nariñense, con una altitud de 2.566 metros y temperatura media de 11 °C. Su territorio abarca diversos pisos térmicos, destacándose el Páramo de Paja Blanca, compartido con municipios vecinos y declarado parque regional natural. Con un relieve quebrado de mesetas y montañas como el cerro Iscuazán, se sitúa a unos 75 km de Pasto.",
    image: "https://th.bing.com/th/id/R.8fce3d8639fa822dcf94aa6e831f645f?rik=REf1uhW9NJbI%2bA&pid=ImgRaw&r=0"
  },
  { 
    name: "Córdoba", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Obando", 
    lat: 0.8500, 
    lng: -77.5167,
    description: "Conocido antiguamente como Males, Córdoba tiene orígenes prehispánicos ligados al pueblo de los Pastos e incluso conserva vestigios de una fortificación inca de la época de Huayna Cápac. Fundado oficialmente en 1532 por caciques locales, mantuvo su estatus de resguardo indígena. Fue elevado a municipio en 1911 y adoptó su nombre actual en 1944, tras una rica historia de mestizaje y resistencia cultural.",
    image: "https://www.municipios.com.co/fotos/757-2019-02-03-18-11-204-2-L.JPG"
  },
  { 
    name: "Cuaspud", 
    festival: "Virgen María y San Nicolás de Bari", 
    date: "4-7 diciembre", 
    province: "Provincia de Obando", 
    lat: 0.8667, 
    lng: -77.7333,
    description: "Cuaspud, con cabecera en Carlosama, es un municipio fronterizo con raíces ancestrales en el pueblo de los Pastos. Fundado hacia 1600 por el cacique Sebastián García Carlosama, fue escenario de la histórica Batalla de Cuaspud. Hoy mantiene una fuerte identidad indígena y una economía basada en cultivos de papa, cereales y producción lechera.",
    image: "https://th.bing.com/th/id/R.c196827e89760e136fe3ef3b58d0fd93?rik=UojlfXxr3w1gYg&pid=ImgRaw&r=0"
  },
  { 
    name: "Cumbal", 
    festival: "San Pedro y San Pablo / Virgen del Carmen", 
    date: "28-29 de junio / 15 de julio", 
    province: "Provincia de Obando", 
    lat: 0.9167, 
    lng: -77.7833,
    description: "Situado a más de 3.200 metros de altura bajo la sombra del volcán Cumbal, este municipio fusiona fe y tradición. Destacan sus festivales de San Pedro y San Pablo en junio, y las fiestas patronales de la Virgen del Carmen en julio, celebraciones que integran procesiones religiosas, torneos deportivos y danzas ancestrales en un entorno andino de imponente belleza natural.",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/19/f4/26/c0/el-pueblo-de-cumbal-es.jpg"
  },
  { 
    name: "Funes", 
    festival: "Fiestas en Honor al Apóstol San Pedro (Las Mojigangas)", 
    date: "24-29 de junio", 
    province: "Provincia de Obando", 
    lat: 1.0167, 
    lng: -77.4500,
    description: "El municipio de Funes celebra Las Mojigangas, una manifestación cultural de más de dos siglos en honor a San Pedro Apóstol. Los hombres se visten con trajes típicos de mujeres indígenas para recordar y reivindicar a las mujeres víctimas de abusos en la época de la conquista.",
    image: "https://th.bing.com/th/id/R.e30fc7f7b125eb6a9b621bc4965bbbf0?rik=gk1dEJ8NCyp5Aw&pid=ImgRaw&r=0"
  },
  { 
    name: "Guachucal", 
    festival: "San Pedro y San Pablo", 
    date: "29 junio", 
    province: "Provincia de Obando", 
    lat: 0.9667, 
    lng: -77.7333,
    description: "Guachucal fue fundado por el cacique Guachalés en 1536. Según el mito popular, en sus pies existía el inmenso lago Nalnoa. La historia narra que el dios Iboag, tras la profanación de su templo en Colimba por invasores, se refugió en las alturas del Gualcalá y ordenó el vaciamiento del lago por el Chambú, marcando la mística identidad de este territorio de los Pastos.",
    image: "https://elperiodicodeportivo.com.co/wp-content/uploads/2025/10/Parque-1.jpg"
  },
  { 
    name: "Gualmatán", 
    festival: "Fiesta del Señor de Los Milagros / Desfile Histórico", 
    date: "Último sábado de enero", 
    province: "Provincia de Obando", 
    lat: 0.9167, 
    lng: -77.6333,
    description: "El municipio de Gualmatán celebra el Desfile Histórico, una muestra cultural que desde 1970 narra la historia de la región, desde los tiempos ancestrales de los Pastos e Incas hasta la llegada de los colonizadores españoles como Sebastián de Belalcázar en 1536. Este evento atrae a miles de devotos del Señor de los Milagros.",
    image: "https://th.bing.com/th/id/R.da1f09a013328fb04429753661d3ba03?rik=5Kh8%2fTyFJhqtVA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-dvbjT89Mf1A%2fU7Nv6qqB3ZI%2fAAAAAAAAd64%2fzPfQUarVFb0%2fs1600%2fGualmat%c3%a1n.jpg&ehk=tHDzFSQz5b3a%2fPsOl55Nwf0HE11psRZ4RCH9fYEW29U%3d&risl=&pid=ImgRaw&r=0"
  },
  { 
    name: "Iles", 
    festival: "Nuestra Señora del Rosario (La Charito)", 
    date: "7 octubre (Primer domingo)", 
    province: "Provincia de Obando", 
    lat: 0.9833, 
    lng: -77.5167,
    description: "La devoción a la Virgen del Rosario de Iles, conocida como “La Charito”, se celebra cada año el primer domingo de octubre. Según la tradición, la Virgen manifestó su deseo de permanecer en Iles a través de un sueño del indígena Cuacialpúd, cuando frailes dominicos intentaban llevar la imagen hacia Ecuador. Es considerada protectora del pueblo y centro de una fe que combina religiosidad y tradición oral.",
    image: "https://tse4.mm.bing.net/th/id/OIP.e8-JVZBrXDs7k4JstuUDfgHaNM?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Ipiales", 
    festival: "Carnaval Multicolor de la Frontera / Virgen de Las Lajas / Cuna de Grandes Tríos", 
    date: "2-6 enero / 16 septiembre / 10-20 octubre", 
    province: "Provincia de Obando", 
    lat: 0.8233, 
    lng: -77.6322,
    description: "Conocida como la 'Ciudad de las Nubes Verdes', Ipiales es un epicentro cultural y comercial en la frontera con Ecuador. Su Carnaval Multicolor de la Frontera (2-6 de enero) es una explosión de arte y tradición local. Es hogar del majestuoso Santuario de Las Lajas, cuya fiesta se celebra el 16 de septiembre, y del Festival Internacional 'Ipiales Cuna de Grandes Tríos' en octubre, consolidándose como un referente musical y arquitectónico del mundo.",
    image: "https://imagescdn.citix.com.co/citix/production/media/media/1b1777edbab9216ab839f11d8ceeed90.jpg"
  },
  { 
    name: "Potosí", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Obando", 
    lat: 0.8167, 
    lng: -77.5333,
    description: "El territorio de Potosí, habitado ancestralmente por indígenas Pastos y Quillacingas, destaca por su historia ligada a la cultura de la papa y la quinua. Atravesado por el cañón del río Guáitara, el municipio conserva un gran potencial agropecuario y paisajístico, donde la herencia colonial y ancestral convive con el desarrollo de sus comunidades rurales.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2019/06/Potosi-Frontis.jpg"
  },
  { 
    name: "Puerres", 
    festival: "Fiesta del Señor de los Milagros", 
    date: "14-15 noviembre", 
    province: "Provincia de Obando", 
    lat: 0.9167, 
    lng: -77.5000,
    description: "La historia de Puerres cuenta que la imagen del Señor de los Milagros llegó misteriosamente en un cajón cargado por una mula. Al intentar trasladarla a Córdoba (Males), sucesos sobrenaturales como lluvias torrenciales y un milagro físico de la imagen impidieron su partida. Desde hace más de un siglo y medio, es el corazón de la fe puerreña, celebrándose cada 15 de noviembre.",
    image: "https://terraniaturismo.com.co/wp-content/uploads/2023/11/2019-05-16-at-9.39.22-PM.jpeg"
  },
  { 
    name: "Pupiales", 
    festival: "Virgen de las Lajas", 
    date: "16 septiembre", 
    province: "Provincia de Obando", 
    lat: 0.8667, 
    lng: -77.6333,
    description: "Fundada el 29 de enero de 1536 por Sebastián de Belalcázar en un caserío de la tribu de los Pastos, Pupiales tiene una historia profundamente ligada a la cultura del altiplano andino. En 1734 fue elevada a parroquia y en 1871 se consolidó como distrito municipal, definiendo sus límites en una región de gran importancia histórica y social para Nariño.",
    image: "https://tse3.mm.bing.net/th/id/OIP.Ov--qCwRibyM9-7XCAon9AHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },

  // Provincia de Juanambú
  { 
    name: "Albán", 
    festival: "San José", 
    date: "19 marzo", 
    province: "Provincia de Juanambú", 
    lat: 1.5167, 
    lng: -77.0667,
    description: "Con orígenes en 1558 como Quina Quillasinga, Albán es uno de los pueblos más antiguos de Nariño. Su historia transitó por denominaciones como 'Pueblo de la Erre' hasta adoptar su nombre actual en honor a la llegada de la imagen de San José en 1894 y al general José Carlos Albán en 1903. Es reconocido por su próspera producción de café, caña y frutales en un entorno de gran riqueza cultural.",
    image: "https://radiosanjose.com.co/wp-content/uploads/2021/05/iglesia-alban-narino-768x576.jpeg"
  },
  { 
    name: "Arboleda", 
    festival: "San Miguel Arcángel / Virgen del Carmen", 
    date: "29 septiembre / 16 julio", 
    province: "Provincia de Juanambú", 
    lat: 1.4833, 
    lng: -77.0333,
    description: "Arboleda, con cabecera en Berruecos, es un territorio de inmensa carga histórica donde ocurrieron hechos trascendentales como el asesinato del Mariscal Sucre en 1830 y del General Julio Arboleda en 1861. Berruecos, que significa 'lugar de rocas', fue un paso estratégico entre Popayán y Pasto. Fundado en 1859, hoy destaca por su producción agrícola y ganadera en un paisaje marcado por la memoria de la independencia.",
    image: "https://1.bp.blogspot.com/-QU0UksLTbI8/XjxMrMklUTI/AAAAAAAAGSs/nCdnUMCVWu8gQO14sY5oF3ZCYmATsbfzQCLcBGAsYHQ/w1200-h630-p-k-no-nu/berruecos%2Bnuevas%2B%25288%2529.jpg"
  },
  { 
    name: "Belén", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Juanambú", 
    lat: 1.6167, 
    lng: -77.0167,
    description: "Conocido originalmente como 'Las Llanadas', Belén se consolidó tras la construcción de su iglesia en 1837 y adoptó su nombre actual en 1929. Elevado a municipio en 1985, este territorio andino destaca por su evolución de una economía agrícola y artesana a un centro comunitario dinámico, sustentado por la riqueza de sus microcuencas y su cercanía a la capital regional.",
    image: "https://tse1.mm.bing.net/th/id/OIP.6Z4RHQiMbQIYE2QlohiwKwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Colón", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Juanambú", 
    lat: 1.6333, 
    lng: -76.9667,
    description: "El municipio de Colón se originó por la iniciativa de familias como los Urbano. Hacia 1905 se fundó la población de El Viento (actual Génova, su cabecera municipal), impulsada por Benjamín y Raymundo Cerón. Históricamente vinculado a San Pablo y Sucre, se consolidó como municipio con la creación de su propia parroquia en 1951, centrando su vida en torno a su plaza y templo.",
    image: "https://tse1.mm.bing.net/th/id/OIP.nOHoas6r-d7YTVf32NwDGwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "El Rosario", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Juanambú", 
    lat: 1.7500, 
    lng: -77.3333,
    description: "Fundado en 1815 por la familia Ojeda, de origen español, El Rosario se estableció en el valle del Patía, inicialmente bajo el nombre de 'Los Guayabos'. Territorio ancestral de pueblos como los camacuaras y sindaguas, se consolidó como municipio en 1904. Su economía gira en torno a la producción de maíz, café y frutales, bendecida por la imponente presencia del río Patía en su geografía montañosa.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2022/02/El-Rosario-Vista.jpg"
  },
  { 
    name: "El Tablón de Gómez", 
    festival: "Virgen de la Cueva", 
    date: "12 octubre (Segundo domingo)", 
    province: "Provincia de Juanambú", 
    lat: 1.4333, 
    lng: -77.0167,
    description: "La Cueva de la Virgen es un destino de fe y turismo comunitario con más de dos siglos de tradición. Escenario de la 'Fiesta de la Virgen de la Cueva' el segundo domingo de octubre, reúne a peregrinos en un entorno natural que fusiona creencias católicas y saberes ancestrales entre senderos de montaña y altares espirituales.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGNvVWu5fE2jvLl7Kanvvrp7X-HoZUORXkxsdqrt_eJQIsP7ypwXsLoKk3QFsOGTy8SMbZZ4GcP07kCOBhX_CaXLw07oLC9Ym2sj631WgQXpe7_90wfM9xCyhmYUbaCTa_N-zGF47tAh4/w1200-h630-p-k-no-nu/tablonfinal.jpg"
  },
  { 
    name: "La Cruz", 
    festival: "Nuestra Señora del Carmen / Fiesta de la Santa Cruz", 
    date: "13-16 julio / 3 mayo", 
    province: "Provincia de Juanambú", 
    lat: 1.6000, 
    lng: -76.9833,
    description: "La festividad en honor a la Virgen del Carmen en La Cruz es una de las celebraciones más importantes, especialmente para el gremio de motoristas, quienes la reconocen como su patrona. Con más de 40 años de tradición, las fiestas inician el 7 de julio y culminan el 16 con un gran desfile de vehículos, procesiones y música, reflejando el fervor, la identidad y la unión de la comunidad.",
    image: "https://th.bing.com/th/id/R.0d6bd4fe0df6e319e4041282b7a7ac96?rik=8Js9q8rPV0h2AQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f_c08e5EROQqk%2fSrrCT4fioGI%2fAAAAAAAAAO0%2fm54P4UkJaBA%2fw1200-h630-p-k-nu%2fMUNICIPIO%2bDE%2bLA%2bCRUZ.JPG&ehk=%2f97BUzNYMpa%2bYcGZtEOdfR%2ba8h57PHc9zIO4nuPaCXc%3d&risl=&pid=ImgRaw&r=0"
  },
  { 
    name: "La Unión", 
    festival: "Fiesta de Nuestra Señora del Rosario / Festival del Café", 
    date: "1-7 octubre / 15 – 18 junio", 
    province: "Provincia de Juanambú", 
    lat: 1.6061, 
    lng: -77.1306,
    description: "Caracterizada por su diversidad climática, La Unión es un centro caficultor por excelencia. Conocida antiguamente como 'La Venta' o 'Venta Quemada', fue un paso clave entre Popayán y Pasto habitado por Quillasingas y Sindaguas. Su nombre actual surge en 1847 tras un acuerdo de tierras entre hacendados para fundar el poblado, consolidándose hoy como un motor económico de la región.",
    image: "https://i.ytimg.com/vi/MhHl70xu6hI/maxresdefault.jpg"
  },
  { 
    name: "Leiva", 
    festival: "San Pedro y San Pablo", 
    date: "29 junio", 
    province: "Provincia de Juanambú", 
    lat: 1.9333, 
    lng: -77.2833,
    description: "Con raíces en asentamientos Quillacingas cerca del río Patía, Leiva fue establecida como villa en 1572 por Andrés Díaz Venero de Leyva. Su cabecera actual se consolidó en 1924 tras superar retos geográficos y de salud, logrando su independencia municipal en 1977 tras separarse de El Rosario.",
    image: "https://i.ytimg.com/vi/uMjQTglnraY/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXihWMA8=&rs=AOn4CLDycZfoHV5693qgaEQhDTN6XzQ-Kw"
  },
  { 
    name: "Policarpa", 
    festival: "San Antonio", 
    date: "13 junio", 
    province: "Provincia de Juanambú", 
    lat: 1.6833, 
    lng: -77.4500,
    description: "Con raíces en los pueblos Chapanchica y Sindagua, Policarpa es un territorio marcado por la resistencia indígena y la orfebrería ancestral. Su historia se liga a la desaparecida ciudad colonial de Madrigal de las Torres Blancas, fundada en 1542. El asentamiento actual se consolidó como municipio en 1972 tras separarse de El Rosario, bajo la influencia del río Patía.",
    image: "https://i.ytimg.com/vi/qWTzM9xNgrk/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGIgYihiMA8=&rs=AOn4CLAJLA1WaIq_8gIDNlFU60DoIzu4jw"
  },
  { 
    name: "San Bernardo", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Juanambú", 
    lat: 1.5167, 
    lng: -77.0167,
    description: "Ubicado a 75 km de Pasto y erigido en 1992 tras separarse de San José de Albán, San Bernardo es un territorio influenciado por el Macizo Colombiano. Situado entre los cerros Helechal y Pico Chaqué, cuenta con diversos pisos térmicos que favorecen una rica producción agrícola. Se destaca por centros poblados como La Vega y Pueblo Viejo, su gastronomía tradicional y una notable participación ciudadana.",
    image: "https://1.bp.blogspot.com/-VsKfQ3YAxWU/Ujuj_I3BQ9I/AAAAAAAAAA4/qwkv5HZh7jI/s1600/DSC06594.JPG"
  },
  { 
    name: "San Lorenzo", 
    festival: "San Lorenzo Mártir", 
    date: "10 agosto", 
    province: "Provincia de Juanambú", 
    lat: 1.5000, 
    lng: -77.2167,
    description: "Ubicado al nororiente de Nariño, a unos 64 km de Pasto, el municipio de San Lorenzo es un territorio estratégico delimitado por los ríos Juanambú y Mayo. Limita con el departamento del Cauca al norte y municipios como La Unión, Buesaco y Taminango, posicionándose como un punto clave de conexión regional en medio de un paisaje de gran riqueza hídrica.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Vista_a%C3%A9rea_de_la_cabecera_municipal_de_San_Lorenzo.png/1280px-Vista_a%C3%A9rea_de_la_cabecera_municipal_de_San_Lorenzo.png"
  },
  { 
    name: "San Pablo", 
    festival: "Fiesta de la Virgen de la Playa / San Pablo Apóstol", 
    date: "15 agosto / 29 junio", 
    province: "Provincia de Juanambú", 
    lat: 1.6833, 
    lng: -77.0167,
    description: "La devoción a la Virgen de la Playa se remonta a 1852, consolidándose tras la aparición en 1911 a la madre Rosa María Guerrero. Su santuario, construido en 1927 en un cañón sobre el río Mayo, es un centro de peregrinación mundial que combina fe profunda con una arquitectura imponente incrustada en la roca.",
    image: "https://tse4.mm.bing.net/th/id/OIP.52NDtM-fwmfT6icqDh7MEAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "San Pedro de Cartago", 
    festival: "San Pedro", 
    date: "29 junio", 
    province: "Provincia de Juanambú", 
    lat: 1.5500, 
    lng: -77.1167,
    description: "Ubicado a 84 km de Pasto, San Pedro de Cartago destaca por su jurisdicción sobre el centro poblado La Comunidad. Limita con La Unión y Belén al norte, y se ha consolidado como un referente de civismo en Nariño, destacándose por tener una de las tasas de participación electoral más altas y el menor abstencionismo de la región.",
    image: "https://i.ytimg.com/vi/G4A1bChbRT8/maxresdefault.jpg"
  },
  { 
    name: "Taminango", 
    festival: "Festival de la Canción 'Voz del Curiquingue'", 
    date: "2-3 enero", 
    province: "Provincia de Juanambú", 
    lat: 1.6500, 
    lng: -77.2833,
    description: "Ubicado en el norte de Nariño, en la confluencia de los ríos Mayo, Juanambú y Patía, Taminango es un territorio estratégico a 119 km de Pasto. Su historia moderna está marcada por la apertura de la vía Panamericana en los años 70, que lo integró plenamente al desarrollo regional, rodeado de paisajes montañosos y límites con el Cauca.",
    image: "https://th.bing.com/th/id/R.54fd7902d3a2ccece02d0c256654f79f?rik=P5pHY0vg99wdDA&pid=ImgRaw&r=0"
  },

  // Provincia de Túquerres
  { 
    name: "Ancuyá", 
    festival: "Quincenario Señora de la Visitación / Nuestra Señora de la Visitación, Encuentro de Danzas", 
    date: "16-30 junio / 1-3 julio", 
    province: "Provincia de Túquerres", 
    lat: 1.2667, 
    lng: -77.5333,
    description: "Con raíces que se remontan al siglo XVI y la leyenda de la 'Virgen Andariega', Ancuyá es un centro de fe a 70 km de Pasto. Su imponente iglesia es el principal referente de este municipio, que tiene bajo su jurisdicción el centro poblado Indo Santa Rosa y celebra con fervor el Encuentro de Danzas en honor a Nuestra Señora de la Visitación.",
    image: "https://turismo.narino.gov.co/wp-content/uploads/2025/03/16-768x512.jpg"
  },
  { 
    name: "Cumbitara", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Túquerres", 
    lat: 1.6500, 
    lng: -77.5833,
    description: "Poblado desde finales del siglo XIX, Cumbitara destaca por su organización rural en corregimientos como Cumbitara Especial, Pizanda y Sidón. Este último, el más extenso, refleja una rica diversidad cultural que fusiona tradiciones andinas, indígenas y afrodescendientes en su transición hacia el piedemonte costero.",
    image: "https://i.pinimg.com/originals/01/ba/d7/01bad78e34e20257ff158d1e9febb89a.jpg"
  },
  { 
    name: "Guaitarilla", 
    festival: "Fiestas de San Nicolás de Tolentino / Virgen del Carmen", 
    date: "10-17 septiembre / 16 julio", 
    province: "Provincia de Túquerres", 
    lat: 1.1667, 
    lng: -77.5333,
    description: "Ubicado a dos horas de San Juan de Pasto, Guaitarilla celebra con fervor las fiestas de San Nicolás de Tolentino, patrono de las almas del purgatorio. Durante ocho días de festividades, la comunidad se une en romerías, actos religiosos y eventos culturales que reflejan la profunda religiosidad de la región y su arraigo a las tradiciones cívicas y eclesiásticas.",
    image: "https://1.bp.blogspot.com/_N_6VInW79fk/SwM1uZGiQfI/AAAAAAAAABg/IF8yAk2GKtA/s1600/guaitarilla-cesto-de-flores.jpg"
  },
  { 
    name: "Imués", 
    festival: "Virgen del Rosario", 
    date: "7 octubre", 
    province: "Provincia de Túquerres", 
    lat: 1.1167, 
    lng: -77.5167,
    description: "Fundado en el siglo XVI por la familia del cacique Carlos Quiscualtud junto al río Guáitara, Imués es un lugar de gran importancia histórica y estratégica. Su ubicación fue elegida por sus riquezas naturales y por ofrecer una amplia visibilidad defensiva, permitiendo a sus pobladores vivir cómodamente bajo la protección de monumentales extensiones verdes.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2021/01/Imues-Iglesia-768x576.jpg"
  },
  { 
    name: "La Llanada", 
    festival: "San Pedro y San Pablo", 
    date: "29 junio", 
    province: "Provincia de Túquerres", 
    lat: 1.4833, 
    lng: -77.5833,
    description: "Reconocida por su profunda tradición minera de extracción de oro, La Llanada fue fundada en 1936 y erigida como municipio en 1991. Situada en el flanco occidental de la cordillera, destaca por su pujanza y celebraciones como las fiestas de San Pedro y San Pablo, consolidándose como un motor de desarrollo artesanal y mineral en Nariño.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2020/10/LaLlanada-1.gif"
  },
  { 
    name: "Linares", 
    festival: "San Antonio", 
    date: "13 junio", 
    province: "Provincia de Túquerres", 
    lat: 1.2333, 
    lng: -77.5000,
    description: "Ubicado a 94 km de Pasto y fundado en 1868, Linares destaca por su producción de panela y artesanías en paja toquilla. Su identidad está profundamente ligada a una rica tradición oral, con leyendas como 'la panela de oro' y 'el cuchi rabón' que reflejan la cultura laboriosa y mística de sus habitantes en medio de un paisaje de gran valor agrícola.",
    image: "https://es-academic.com/pictures/eswiki/76/Linaresnarino.jpg"
  },
  { 
    name: "Los Andes Sotomayor", 
    festival: "San Andrés Apóstol", 
    date: "30 noviembre", 
    province: "Provincia de Túquerres", 
    lat: 1.4167, 
    lng: -77.6500,
    description: "Erigido en 1911 y con cabecera en Sotomayor, Los Andes destaca por su geografía montañosa en la cordillera Occidental y la cuenca del Río Patía. Su historia está ligada a comunidades Abades y misiones coloniales bajo el nombre de San Francisco de Panga, consolidando una identidad que fusiona tradiciones agrícolas y mineras en un relieve accidentado de gran belleza natural.",
    image: "https://cr00.epimg.net/radio/imagenes/2021/04/12/pasto/1618232886_929088_1618235382_noticia_normal.jpg"
  },
  { 
    name: "Mallama", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Túquerres", 
    lat: 1.1333, 
    lng: -77.8167,
    description: "Con cabecera en Piedrancha y ubicado a 121 km de Pasto, Mallama tiene orígenes en asentamientos indígenas pastos. Fundado como punto estratégico entre la cordillera y la costa pacífica, destaca hoy por su pujante ganadería bovina, producción de lácteos y cultivos de caña de azúcar, manteniendo una posición clave en la conectividad del suroccidente nariñense.",
    image: "https://th.bing.com/th/id/R.1be2d2cbbdf49fce7f5b68ffebdb7704?rik=aQ6AbRLGsR8DHg&pid=ImgRaw&r=0"
  },
  { 
    name: "Ospina", 
    festival: "San Sebastián", 
    date: "20 enero", 
    province: "Provincia de Túquerres", 
    lat: 1.0667, 
    lng: -77.5667,
    description: "Fundado el 1 de octubre de 1664 por María Mués Calcán y elevado a la categoría de municipio en 1865, Ospina se ubica estratégicamente en el suroccidente de Nariño. Su organización territorial integra la cabecera municipal con centros poblados como Cunchila y San Isidro, consolidando una estructura administrativa arraigada en la historia colonial y republicana del departamento.",
    image: "https://tse1.mm.bing.net/th/id/OIP.xY-MaPaibNYiTO-lqQYZzgHaEL?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Providencia", 
    festival: "San Antonio", 
    date: "13 junio", 
    province: "Provincia de Túquerres", 
    lat: 1.2500, 
    lng: -77.6167,
    description: "Ubicado en el departamento de Nariño, el municipio de Providencia tiene bajo su jurisdicción el centro poblado de Guadrahuma. Limita estratégicamente con municipios como Samaniego, Guaitarilla, Túquerres y Santacruz, consolidándose como un punto de encuentro geográfico en la región central del departamento.",
    image: "https://www.viajarenverano.com/wp-content/uploads/2022/04/Providencia-Fronti.gif"
  },
  { 
    name: "Ricaurte", 
    festival: "San Pedro", 
    date: "29 junio", 
    province: "Provincia de Túquerres", 
    lat: 1.2167, 
    lng: -78.0333,
    description: "Antonia Ricaurte Nariño (13 de junio de 1800 – 6 de octubre de 1853) fue una dama de la sociedad neogranadina reconocida como heroína de la independencia de Colombia.",
    image: "https://www.semana.com/resizer/adJwsdLUWSUL18b1mNGQT-DHBFs=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/BJ7V52C7BNCXNLNGYUT2CABKEU.JPG"
  },
  { 
    name: "Samaniego", 
    festival: "Concurso Departamental de Bandas Musicales / Virgen de las Mercedes", 
    date: "Agosto (Primer festivo) / 24 septiembre", 
    province: "Provincia de Túquerres", 
    lat: 1.3333, 
    lng: -77.6000,
    description: "Samaniego es sede permanente del Concurso Departamental de Bandas Musicales, certamen creado en 1983 que se celebra ininterrumpidamente cada agosto. Conocido por su riqueza cultural y musical, el municipio vibra con el talento de bandas de todo el departamento, consolidando este evento como uno de los más importantes de Nariño en honor a su tradición artística.",
    image: "https://turismo.narino.gov.co/wp-content/uploads/2025/09/SAMANIEGO-GOBERNACION-scaled.jpg"
  },
  { 
    name: "Santacruz", 
    festival: "Festival del Maíz / San Antonio", 
    date: "29 junio / 13 junio", 
    province: "Provincia de Túquerres", 
    lat: 1.1833, 
    lng: -77.7167,
    description: "El Festival del Maíz en Santa Cruz es un evento significativo donde este cultivo es el protagonista. Los habitantes celebran la cosecha con concursos gastronómicos, danzas típicas y ferias artesanales, rindiendo homenaje a la base de su economía agraria y promoviendo la conservación de sus tradiciones ancestrales.",
    image: "https://i.ytimg.com/vi/M_ilO0ObP98/maxresdefault.jpg"
  },
  { 
    name: "Sapuyes", 
    festival: "Virgen del Carmen", 
    date: "16 julio", 
    province: "Provincia de Túquerres", 
    lat: 1.0333, 
    lng: -77.7167,
    description: "Fundado en 1543 por Sebastián de Belalcázar en honor al cacique Sapuyana, Sapuyes destaca por su inmensa riqueza ecológica. En su territorio se erigen el Volcán Azufral y la Laguna Verde, atractivos que junto al Páramo Paja Blanca le otorgan un valor ambiental y paisajístico incalculable en el suroccidente de Nariño.",
    image: "https://tse4.mm.bing.net/th/id/OIP.y7d2RgULSBGHT6x6YdC4KQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  { 
    name: "Túquerres", 
    festival: "Carnaval de Negros y Blancos / Señor de los Milagros / Festival San Luis Gonzaga", 
    date: "3-6 enero / Martes Santo (Marzo) / 30 nov-2 dic", 
    province: "Provincia de Túquerres", 
    lat: 1.0861, 
    lng: -77.6183,
    description: "Túquerres es un epicentro de fe y cultura, hogar del protector Señor de los Milagros, cuya imagen colonial se quedó en el pueblo por señal divina. Celebra un Carnaval de Negros y Blancos con identidad propia y el Festival San Luis Gonzaga, un referente nacional de danza y formación integral. Ciudad de paisajes gélidos y gente cálida, custodia con orgullo su memoria histórica y su inmenso legado artístico.",
    image: "https://surdestino.com/wp-content/uploads/2025/01/tuquerres.jpg"
  },
];

export interface TypicalFood {
  municipality: string;
  dish: string;
  description: string;
  image?: string | string[];
}

export interface Curiosity {
  id: number;
  title: string;
  content: string;
  source: string;
}

export interface NarinenseWord {
  id: number;
  word: string;
  meaning: string;
  example?: string;
}

export const WORDS_NARINENSES: NarinenseWord[] = [
  { id: 1, word: "Achichay", meaning: "Interjección quechua que significa '¡qué frío!'" },
  { id: 2, word: "Achichucas", meaning: "Interjección quechua que significa '¡qué calor!'" },
  { id: 3, word: "Achilado", meaning: "Sonrojado o temeroso." },
  { id: 4, word: "Atatay", meaning: "Expresión quechua que significa asco o repugnancia." },
  { id: 5, word: "Biensísimo", meaning: "Muy bien." },
  { id: 6, word: "Chumado", meaning: "Persona ebria o borracha." },
  { id: 7, word: "Guagua", meaning: "Niño o niña pequeño." },
  { id: 8, word: "Muérgano", meaning: "Malo o desobediente." },
  { id: 9, word: "Peliaringo", meaning: "Persona que le gusta buscar pelea." },
  { id: 10, word: "Quichala", meaning: "Diarrea." }
];

export const DIALECT_INFO = {
  description: "El dialecto de Nariño se caracteriza por su pronunciación suave y melodiosa, así como por el uso de modismos y expresiones propias de la región. Por ejemplo, la letra \"s\" al final de las palabras a menudo se pronuncia como \"h\", como en \"graciah\" en lugar de \"gracias\".",
  culturalImportance: "Las palabras y expresiones de Nariño no solo son parte del lenguaje cotidiano, sino que también reflejan la identidad cultural de la región.",
  source: "quevisitarcolombia.com"
};

export const CURIOSITIES: Curiosity[] = [
  {
    id: 1,
    title: "1. Carnaval de Negros y Blancos",
    content: "Este carnaval, celebrado anualmente entre el 2 y el 7 de enero, es uno de los eventos más importantes de Colombia. Fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2009. Sus raíces son indígenas y se remonta a celebraciones para agradecer las cosechas, incorporando elementos de las culturas española y africana.",
    source: "www.senalcolombia.tv"
  },
  {
    id: 2,
    title: "2. Origen del Nombre \"Pasto\"",
    content: "El nombre \"Pasto\" proviene del idioma de los indígenas pastos, donde \"Pas\" significa heredad o familia y \"To\" se traduce como tierra. Por lo tanto, \"Pasto\" puede interpretarse como \"Tierra de la heredad\" o \"Tierra de la parentela\".",
    source: "www.senalcolombia.tv"
  },
  {
    id: 3,
    title: "3. La Laguna de la Cocha",
    content: "Este es el segundo lago natural de agua dulce más grande de Colombia y alberga la Isla La Corota, que es la reserva natural más pequeña protegida como parque nacional en el país. La laguna es conocida por su biodiversidad y es un lugar ideal para la observación de aves.",
    source: "www.senalcolombia.tv"
  },
  {
    id: 4,
    title: "4. Onomástico de Pasto",
    content: "Cada junio, Pasto celebra su onomástico, un homenaje simbólico al nacimiento de la ciudad. Esta celebración no se basa en una fecha fundacional precisa, ya que el acta de fundación se ha perdido, lo que la hace única entre otras ciudades.",
    source: "narino.info"
  },
  {
    id: 5,
    title: "5. Creencias Locales sobre Duendes",
    content: "En Pasto, la existencia de duendes es tomada en serio por muchos habitantes, quienes incluso construyen pequeñas casas para ellos en sus jardines. Esta creencia refleja la rica tradición cultural y las leyendas que rodean a la ciudad.",
    source: "esariri.com"
  }
];

export interface GalleryItem {
  url: string;
  title: string;
  category: string;
  sourceUrl: string;
  description: string;
  location: string;
}

export const GALLERY_CATEGORIES = [
  { id: 'curiosidades', title: 'Curiosidades', icon: 'Sparkles' },
  { id: 'palabras', title: 'Palabras Nariñenses', icon: 'Music' }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  // Curiosidades
  {
    url: 'https://destincolombia.com/wp-content/uploads/2019/01/carnaval-negros-blancos-dia-3-enero-desfile-colectivos-coreograficos-turismo-pasto-destincolombia.jpg',
    title: 'Datos Curiosos de Pasto',
    category: 'curiosidades',
    sourceUrl: 'https://destincolombia.com',
    description: 'Explora datos fascinantes sobre la historia, el nombre y las tradiciones que hacen única a la Ciudad Sorpresa.',
    location: 'Pasto, Nariño'
  },

  // Palabras Nariñenses
  {
    url: 'https://imagenes.eltiempo.com/files/og_thumbnail/uploads/2022/01/05/61d60bc5058ff.jpeg',
    title: 'Nuestras Voces',
    category: 'palabras',
    sourceUrl: 'https://eltiempo.com',
    description: 'El dialecto de Nariño es un tesoro de palabras que cuentan nuestra historia.',
    location: 'Nariño'
  },

  // Paisajes
  { 
    url: 'https://i.pinimg.com/originals/50/23/70/502370640c9320060e7a3e698db17c3d.jpg', 
    title: 'Laguna de la Cocha', 
    category: 'paisaje', 
    sourceUrl: 'https://www.pinterest.com',
    description: 'Un ecosistema de humedal de importancia internacional (Ramsar). Sus aguas frías albergan truchas y están rodeadas de un bosque de niebla que parece sacado de un cuento.',
    location: 'El Encano, Pasto'
  },
  { 
    url: 'https://tse3.mm.bing.net/th/id/OIP.X_v6_rL_r_r_r_r_r_r_r_r_r_r_r_r?pid=Api&P=0&h=1080', 
    title: 'Laguna Verde - Volcán Azufral', 
    category: 'paisaje', 
    sourceUrl: 'https://www.bing.com',
    description: 'El color verde esmeralda de sus aguas se debe a la alta concentración de azufre. Es uno de los paisajes más surrealistas y hermosos de los Andes colombianos.',
    location: 'Túquerres, Nariño'
  },
  { 
    url: 'https://i.pinimg.com/originals/8b/70/2a/8b702a8d11aa79cce4253e838d5784c3.jpg', 
    title: 'Oso de Anteojos', 
    category: 'paisaje', 
    sourceUrl: 'https://www.javeriana.edu.co',
    description: 'El único oso de Sudamérica habita en los páramos de Nariño. Es una especie sombrilla vital para la conservación de los bosques de niebla y fuentes de agua.',
    location: 'Páramos de Nariño'
  },
  { 
    url: 'https://tse2.mm.bing.net/th/id/OIP.V_v6_rL_r_r_r_r_r_r_r_r_r_r_r_r?pid=Api&P=0&h=1080', 
    title: 'Colibrí Pico de Espada', 
    category: 'paisaje', 
    sourceUrl: 'https://andeangreattreks.com',
    description: 'Nariño es paraíso de aves. Este colibrí posee el pico más largo del mundo en relación a su cuerpo, adaptado para libar néctar de flores profundas.',
    location: 'Reserva Natural, Nariño'
  },
  { 
    url: 'https://tse4.mm.bing.net/th/id/OIP.kmASNuC104Wz3WC5CZG6OAHaE7?pid=Api&P=0&h=1080', 
    title: 'Delfín Rosado del Pacífico', 
    category: 'paisaje', 
    sourceUrl: 'https://triviantes.com',
    description: 'En las costas de Tumaco es posible avistar delfines que juguetean en las aguas cálidas del Pacífico, un espectáculo natural inolvidable.',
    location: 'Bahía de Tumaco'
  },
  { 
    url: 'https://awake.travel/blog/wp-content/uploads/2022/12/11.jpg', 
    title: 'Biodiversidad del Chocó Biogeográfico', 
    category: 'paisaje', 
    sourceUrl: 'https://awake.travel',
    description: 'El piedemonte costero de Nariño es parte de una de las zonas más lluviosas y biodiversas del planeta, hogar de miles de especies de orquídeas y ranas.',
    location: 'Piedemonte Costero, Nariño'
  },
  { 
    url: 'https://www.turismopasto.com/wp-content/uploads/2020/10/cafe-buesaco-narino-960x636.jpg', 
    title: 'Flora de Alta Montaña', 
    category: 'paisaje', 
    sourceUrl: 'https://colombia.travel',
    description: 'Las laderas de Buesaco no solo producen café, también albergan una flora variada que cambia con la altitud, desde frutales hasta bosques andinos.',
    location: 'Buesaco, Nariño'
  },
  { 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdm7vpUZqdzMvN3sCpUeZUnGXqegrDas8Keh_dtu7IVrDIXVPxq2-XtS30H4gIvudo9f6E-Pvnia-yBOW0htf8n3FDU_MfnTEr9Ky0AcW19kTNBL6QOybCNS5uo6zygkl204dLablyiiEp3DjD4ABNgmpjtzvQ2o7MtzgdSJKWYiL083pbov6n1dd_mfoY/s1600/La_Ccocha.jpg', 
    title: 'Avistamiento de Aves en la Corota', 
    category: 'paisaje', 
    sourceUrl: 'https://lanotapositiva.com',
    description: 'La isla es un refugio para aves migratorias y residentes. Un sendero interpretativo permite conocer la importancia de este ecosistema insular.',
    location: 'Isla de la Corota, Pasto'
  },
  { 
    url: 'https://mediaim.expedia.com/destination/1/05e846fb1fd49ece112980d5039f6d1a.jpg?impolicy=fcrop&w=1920&h=1080&q=high', 
    title: 'Fauna del Altiplano', 
    category: 'paisaje', 
    sourceUrl: 'https://blog.redbus.co',
    description: 'En los campos de Nariño es común ver animales de granja integrados al paisaje, junto a especies silvestres como el curí y diversas aves rapaces.',
    location: 'Valles del Sur, Nariño'
  },
  { 
    url: 'https://i.pinimg.com/originals/08/57/13/08571383953829639d25cad7d03845f0.jpg', 
    title: 'Manglares de Tumaco', 
    category: 'paisaje', 
    sourceUrl: 'https://www.pinterest.com',
    description: 'Los manglares más altos del mundo se encuentran aquí. Son cunas de vida marina y protectores naturales de la línea de costa.',
    location: 'Tumaco, Nariño'
  },
  { 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirFUVMKr_HDsqqnYnPXPXybg0Nhfefswu_s82yfijN8Z2iyxeN13y1dH9dgQd8CpmPP0458tI4vsrJ94Kw4jh1PDvu8HwKLsVFD4PlZNrf8MUwxJ3iTWCGguD0mOp7xB5ikNSy_Qh_P08/s1600/DSC02919.JPG', 
    title: 'Frailejones y Agua', 
    category: 'paisaje', 
    sourceUrl: 'https://www.blogger.com',
    description: 'Estas plantas son fábricas de agua. Sus hojas vellosas atrapan la niebla y la convierten en el líquido vital que alimenta a todo el departamento.',
    location: 'Páramos de Nariño'
  },

  // Magia
  { 
    url: 'https://www.jyainmobiliaria.com/wp-content/uploads/2022/04/pasto-6-enero-carroza-1-e1681483650456-1024x504.jpg', 
    title: 'Magia del Carnaval', 
    category: 'curiosidades', 
    sourceUrl: 'https://www.jyainmobiliaria.com',
    description: 'Carrozas gigantescas hechas a mano que cuentan historias de mitos y leyendas regionales.',
    location: 'Senda del Carnaval, Pasto'
  },
  { 
    url: 'https://situr.narino.gov.co/storage/Clientes/situr_narino/principal/imagenes/contenidos/274-1_Santuario_de_las_Lajas.JPG', 
    title: 'Las Lajas', 
    category: 'curiosidades', 
    sourceUrl: 'https://situr.narino.gov.co',
    description: 'Considerada la iglesia más bella del mundo, construida sobre un cañón profundo.',
    location: 'Ipiales, Nariño'
  },
  { 
    url: 'https://www.turismopasto.com/wp-content/uploads/2018/03/santuario-mas-hermoso-del-mundo-las-lajas-turismo-ipiales-colombia.jpg', 
    title: 'Santuario', 
    category: 'curiosidades', 
    sourceUrl: 'https://www.turismopasto.com',
    description: 'Un lugar de peregrinación y fe, donde la arquitectura gótica desafía la gravedad.',
    location: 'Ipiales, Nariño'
  },
  
  // Tradición
  { 
    url: 'https://imagenes2.eltiempo.com/files/image_1200_600/uploads/2021/12/26/61c8df656154b.jpeg', 
    title: 'Tradición Viva', 
    category: 'tradicion', 
    sourceUrl: 'https://www.eltiempo.com',
    description: 'El Carnaval de Negros y Blancos es Patrimonio Cultural de la Humanidad por la UNESCO.',
    location: 'Pasto, Nariño'
  },
  { 
    url: 'https://ancuya.101tramites.com/ciudadanos/PortaldeNinos/Enterate/PublishingImages/Paginas/Sitios-de-Interes/Ancuyaimagen_h.jpg', 
    title: 'Ancuya', 
    category: 'tradicion', 
    sourceUrl: 'https://ancuya.101tramites.com',
    description: 'Un municipio lleno de historia, conocido por su fe y sus hermosos paisajes cafeteros.',
    location: 'Municipio de Ancuya'
  },
  
  // Paisaje
  { 
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Sandon%C3%A1_-_Nari%C3%B1o_2888600484824800467_n.jpg', 
    title: 'Sandoná', 
    category: 'paisaje', 
    sourceUrl: 'https://commons.wikimedia.org',
    description: 'Famoso por su Basílica de Nuestra Señora del Rosario y la artesanía en paja toquilla.',
    location: 'Municipio de Sandoná'
  },
  { 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirFUVMKr_HDsqqnYnPXPXybg0Nhfefswu_s82yfijN8Z2iyxeN13y1dH9dgQd8CpmPP0458tI4vsrJ94Kw4jh1PDvu8HwKLsVFD4PlZNrf8MUwxJ3iTWCGguD0mOp7xB5ikNSy_Qh_P08/s1600/DSC02919.JPG', 
    title: 'Paisaje Andino', 
    category: 'paisaje', 
    sourceUrl: 'https://www.blogger.com',
    description: 'La colcha de retazos que forman los cultivos en las laderas de las montañas nariñenses.',
    location: 'Alrededores de Pasto'
  },
  
  // Pasto Events Gallery
  {
    url: 'https://informativodelguaico.com/wp-content/uploads/2025/04/Senda-de-la-fe-en-Pasto-5-1018x573.jpg',
    title: 'Senda de la Fe - Semana Santa',
    category: 'magia',
    sourceUrl: 'https://informativodelguaico.com',
    description: 'Esculturas del Viacrucis elaboradas por artesanos del carnaval, transformando el centro histórico en una galería espiritual.',
    location: 'Pasto, Nariño'
  },
  {
    url: 'https://caracol.com.co/resizer/v2/https%3A%2F%2Fcloudfront-us-east-1.images.arcpublishing.com%2Fprisaradioco%2FVFTFA3ELOZCFZAKR2TKGQC46VQ.jpeg?auth=c6ba2935ac9f323e3ae04fe335cafcaa98e07182c10e537ac15e709560391ff8&height=800&width=1200&quality=70&smart=true',
    title: 'Onomástico de Pasto',
    category: 'tradicion',
    sourceUrl: 'https://caracol.com.co',
    description: 'Conmemoración de la identidad histórica de la ciudad en honor a San Juan Bautista.',
    location: 'Pasto, Nariño'
  },
  {
    url: 'https://informativodelguaico.com/wp-content/uploads/2023/07/Guaguas-Jongovito.jpg',
    title: 'Guaguas de Pan',
    category: 'tradicion',
    sourceUrl: 'https://informativodelguaico.com',
    description: 'Tradición agraria y andina en las fiestas de San Pedro y San Pablo en corregimientos como Jongovito.',
    location: 'Jongovito, Pasto'
  },
  {
    url: 'https://image.jimcdn.com/app/cms/image/transf/dimension=634x10000:format=jpg/path/s30f4f4d3c44d12ba/image/i9e10fda3747ba978/version/1590452414/teatro-imperial.jpg',
    title: 'Festival Internacional de Teatro',
    category: 'tradicion',
    sourceUrl: 'https://pasto.gov.co',
    description: 'Espectáculo de artes escénicas, dramaturgia y oralidad que reúne artistas nacionales e internacionales.',
    location: 'Pasto, Nariño'
  },
  {
    url: 'https://tse3.mm.bing.net/th/id/OIP.p3Y5UOQxLhEYHqAMBrjgpAHaNJ?rs=1&pid=ImgDetMain&o=7&rm=3',
    title: 'Festival Internacional de Cine (FICPA)',
    category: 'tradicion',
    sourceUrl: 'https://ficpa.co',
    description: 'El evento cinematográfico más antiguo del suroccidente colombiano, otorgando el premio Sol de los Pastos.',
    location: 'Pasto, Nariño'
  }
];
