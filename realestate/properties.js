// Fictional demo listings. Swap image paths here to change photos.
const IMG = ['assets/jpeg_2_.jpeg','assets/jpeg_3_.jpeg','assets/jpeg_4_.jpeg','assets/jpeg_5_.jpeg'];
const rot = i => [...IMG.slice(i), ...IMG.slice(0, i)];
const PROPERTIES = [
 {id:1,title:'Obsidian Terrace',location:'Northshore, Haven Bay',type:'Modern',price:4250000,beds:5,baths:5,area:5200,featured:true,img:2,
  desc:'A three-level residence in dark steel and glass, with floating stairs and a cantilevered terrace facing the water.',features:['Illuminated stair entry','Glass-balustrade terraces','Integrated garage','Landscaped courtyard']},
 {id:2,title:'Quarrystone Residence',location:'Alder Park, Haven Bay',type:'Estate',price:3150000,beds:5,baths:4,area:4600,featured:true,img:1,
  desc:'Hand-cut stone, deep eaves and warm lighting give this family estate its calm, settled presence.',features:['Stone facade','Covered front terrace','Upper-level balcony','Manicured gardens']},
 {id:3,title:'Lumen Pool House',location:'Crestline Hills',type:'Villa',price:7900000,beds:6,baths:7,area:8400,featured:true,img:3,
  desc:'A double-height glass hall opens to a travertine courtyard, an infinity pool and the hills beyond.',features:['Heated pool and spa','Double-height atrium','Travertine terraces','Four-car garage']},
 {id:4,title:'Slate and Timber House',location:'Garden Quarter, Haven Bay',type:'Townhouse',price:1850000,beds:4,baths:3,area:3100,img:0,
  desc:'Textured timber panels and slate tones wrap a private, light-filled home behind a secure gate.',features:['Gated driveway','Sky terrace','Planted balconies','Smart-home wiring']},
 {id:5,title:'Marlow Row Townhouse',location:'Marlow Row, Haven Bay',type:'Townhouse',price:1290000,beds:3,baths:3,area:2400,img:0,
  desc:'A refined three-bedroom townhouse on a quiet street, with an easy walk to the harbour.',features:['Private garden','Open-plan kitchen','Home office','Garage']},
 {id:6,title:'Garden Court Estate',location:'Alder Park, Haven Bay',type:'Estate',price:2650000,beds:4,baths:4,area:3900,img:1,
  desc:'Mature planting and a generous frontage make this a gracious home for entertaining.',features:['Wine room','Reading terrace','Mature gardens','Guest suite']},
 {id:3.5,title:'The Quiet Villa',location:'Crestline Hills',type:'Villa',price:3400000,beds:4,baths:4,area:4300,img:3,
  desc:'Pale stone, tall windows and a still pool define this hillside retreat.',features:['Pool terrace','Floor-to-ceiling glazing','Outdoor kitchen','Garden lighting']},
 {id:8,title:'Nightfall House',location:'Northshore, Haven Bay',type:'Modern',price:5600000,beds:5,baths:6,area:6100,img:2,
  desc:'Sharp geometry and glass-fronted living spaces, designed to glow after dark.',features:['Rooftop terrace','Glass-fronted lounge','Lift access','Cinema room']}
].map((p,i)=>({...p,id:i+1,images:rot(p.img)}));
