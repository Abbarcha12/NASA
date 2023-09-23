const fs = require('fs');
const path = require('path')

const {
  parse
} = require('csv-parse');


const planetsMongo = require('./planets.mongo');


function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6;
    
 

}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data)
       
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err) 
      })
      .on('end',async () => {
        // const PlanetsFound=(await getAllPlanets()).length
        // console.log(`${PlanetsFound} habitable planets found!`); 
        resolve();

      });
  })

}
const getAllPlanets = async () => {
const data = await planetsMongo.find({}) 
return data
}


async function savePlanet(planet) {
  try {
    await planetsMongo.updateOne(
      { keplerName: planet. kepler_name },
      { $set: planet },
      { upsert: true }
    );
   
  } catch (error) {
    console.error('Error saving planet:', error);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
}