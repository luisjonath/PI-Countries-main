const { Router } = require("express");
const { Country, Activity } = require("../db");
const router = Router();

/* [ ] POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes */

router.get("/", async (req, res) => {
  try {
    let activities = await Activity.findAll({ include: Country });
    res.json(activities);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
   const { name, difficulty, season, duration, countries } = req.body;

  try {
    let newActivity = await Activity.create({
      name,
      difficulty,
      season,
      duration,
    });
    await newActivity.setCountries(countries);

    let countryActivity = await Activity.findOne({
      where: { name: name },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: {
        model: Country,
        through: {
          attributes: [],
        },
      },
    });
    res.json(countryActivity);
  } catch (error) {
    console.log(error)
  } 
 
});

module.exports = router;
