import express from 'express';
import db from './database.json' with { type: "json"};

const app = express();
const port = 3001;

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

    let filteredDatabase = db.database;
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
      return{image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType),...v }
    })
    res.json({total: filteredDatabase.length, page, totalPage: Math.ceil(filteredDatabase.length / limit), data: paginatedData})
});

app.get('/api/blueprint/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({code: 404, message: "Data not found"})
    return;
  }

  let blueprint = db.database.find((v) => v.key == req.params.id)
  await new Promise(r => setTimeout(r, 2000));
  if (blueprint) {
    blueprint.image = buildImageUrl(blueprint.imgurImage.imgurId, blueprint.imgurImage.imgurType)
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
  let blueprints = db.database.filter(v => v.author.userId == id).map(v => {
    return{image: buildImageUrl(v.imgurImage.imgurId, v.imgurImage.imgurType),...v }
  })
  
  await new Promise(r => setTimeout(r, 2000));
  if (blueprints) {
    const authorData = {
      author: {
        username: blueprints[0].author.displayName,
        description: markdown
      }    
    }
    res.json({author: authorData, blueprints: blueprints})
  } else {
    res.status(404).json({code: 404, message: "Data not found"})
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});