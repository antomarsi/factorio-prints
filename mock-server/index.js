import express from 'express';
import db from './database.json' with { type: "json"};

const app = express();
const port = 3001;

function buildImageUrl(imgurId, imgurType, suffix = 'b')
{
	const typeParts = imgurType.split('/');
	return `http://i.imgur.com/${imgurId}${suffix}.${typeParts[1]}`;
}

app.get('/api/blueprints', (req, res) => {
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const limit = 20

    let filteredDatabase = db.database;

    if (sort) {
      if (sort == "favorited") {
        filteredDatabase.sort(function (a, b) {
          if (a.voteSummary.numberOfUpvotes < b.voteSummary.numberOfUpvotes) {
            return -1;
          } else if (a.voteSummary.numberOfUpvotes > b.voteSummary.numberOfUpvotes) {
            return 1;
          }
          return 0;
        })
      }
      if (sort == "recent") {
        filteredDatabase.sort(function (a, b) {
          if (new Date(a.version.createdOn) < new Date(b.version.createdOn)) {
            return -1;
          } else if (new Date(a.version.createdOn) > new Date(b.version.createdOn)) {
            return 1;
          }
          return 0;
        })
      }
    }

    let paginatedData = []
    for (var i = (page-1) * limit; i < (page * limit); i++) {
      paginatedData.push(filteredDatabase[i])
    }
    paginatedData = paginatedData.map(v => {
      return{image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType),...v }
    })
    res.json({totalTada: filteredDatabase.length ,page, totalPage: Math.ceil(filteredDatabase.length / limit), data: paginatedData})
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