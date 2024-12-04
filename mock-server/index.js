import express from 'express';
import db from './database.json' with { type: "json"};
import morgan from 'morgan';
const app = express();
const port = 3001;

app.use(morgan("combined"))

const markdown = `
## Getting Started

Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds.

- Visit our [Learn Next.js](https://nextjs.org/learn) course to get started with Next.js.
- Visit the [Next.js Showcase](https://nextjs.org/showcase) to see more sites built with Next.js.

## Documentation

Visit [https://nextjs.org/docs](https://nextjs.org/docs) to view the full documentation.

## Community
`;

function buildImageUrl(imgurId, imgurType, suffix = 'b')
{
	const typeParts = imgurType.split('/');
	return `http://i.imgur.com/${imgurId}${suffix}.${typeParts[1]}`;
}

app.get('/api/blueprints', async (req, res) => {
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const limit = 20
    
    const database = JSON.parse(JSON.stringify(db.database));

    let filteredDatabase = database;
    await new Promise(r => setTimeout(r, 2000));
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
      return{image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType),...v, blueprintString: null }
    })
    res.json({total: filteredDatabase.length, page, totalPage: Math.ceil(filteredDatabase.length / limit), data: paginatedData})
});

app.get('/api/blueprint/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({code: 404, message: "Data not found"})
    return;
  }
  
  let database = JSON.parse(JSON.stringify(db.database));

  let blueprint = database.find((v) => v.key == req.params.id)
  await new Promise(r => setTimeout(r, 2000));
  if (blueprint) {
    blueprint.image = buildImageUrl(blueprint.imgurImage.imgurId, blueprint.imgurImage.imgurType)
    blueprint.blueprintString = null
    res.json(blueprint)
  } else {
    res.status(404).json({code: 404, message: "Data not found"})
  }
})

app.get('/api/user/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({code: 404, message: "Data not found"})
    return;
  }
  let blueprints = database.filter(v => v.author.userId == id).map(v => {
    return{image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType),...v, blueprintString: null }
  })
  
  await new Promise(r => setTimeout(r, 2000));
  if (blueprints) {
    const author = {
        id: blueprints[0].author.userId,
        username: blueprints[0].author.displayName,
        description: markdown  
    }
    res.json({author, blueprints: blueprints})
  } else {
    res.status(404).json({code: 404, message: "Data not found"})
  }
})

app.get('/api/blueprint-content-tiles/:id', async (req, res) => {
  let id = req.params.id;
  const database = JSON.parse(JSON.stringify(db.database));
  let blueprints = database.filter(v => v.key == id)
  if (blueprints) {
    let contentTiles = blueprints.map(v => {
      let contentTiles = v.blueprintString.contentTiles
      if (!contentTiles) {
        return [];
      } else {
        let result = Object.entries(contentTiles).map(([k, v]) => ({...v, type: k})); 
        return result;
      }
    }).flat()
    res.json(contentTiles)
  } else {
    res.status(404).json({code: 404, message: "Data not found"})
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});