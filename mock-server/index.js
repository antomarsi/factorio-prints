import express from 'express';
import db from './database.json' with { type: "json"};

const app = express();
const port = 3001;

app.get('/api/blueprints', (req, res) => {
    const page = req.query.page || 1;
    const limit = 20

    let filteredDatabase = db.database;

    let paginatedData = []
    for (var i = (page-1) * limit; i < (page * limit); i++) {
      paginatedData.push(filteredDatabase[i])
    }
    res.json({page, totalPage: Math.ceil(filteredDatabase.length / limit), data: paginatedData})
});
app.get('/api/blueprint/:id', (req, res) => {
  let blueprint = db.database.find((v) => v.key == req.params.id)
  if (blueprint) {
    res.json(blueprint)
  } else {
    res.status(404).json({code: 404, message: "Data not found"})
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});