const { Router } = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = Router();
const axios = require("axios");

/* [ ] GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos 
y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises. */

//Usado para guardar en la base de datos la info de los paises

router.get("/create", async (req, res) => {
  try {
    const getAllCountries = await axios.get("https://restcountries.com/v3/all");

    getAllCountries.data.forEach(async (c) => {
      await Country.findOrCreate({
        where: {
          id: c.cca3,
          name: c.name.common,
          flag: c.flags[0],
          continent: c.continents[0],
          capital: c.capital ? c.capital[0] : "no capital",
          subregion: c.subregion || "no subregion",
          area: c.area,
          population: c.population,
        },
      });
    });

    const countriesInDb = await Country.findAll();
    res.json(countriesInDb);
  } catch (error) {
    console.log(error);
    res.json(error)
  }
});

router.get("/", async (req, res) => {
  try {
    let countriesDb = await Country.findAll({
      include: { model: Activity },
    });
    res.send(countriesDb);
  } catch (error) {
    console.log(error);
  }
});

router.get("/name", async (req, res) => {
  const { name } = req.query;

  try {
    const country = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Activity],
    });
    res.status(200).send(country);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const info = await Country.findByPk(id, { include: Activity });

    res.json({ info });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
