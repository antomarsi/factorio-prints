import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("/api/blueprintSummaries/filtered/:page", ({ request }) => {

        return HttpResponse.json({
            "_metadata": {
                "criteria": "Blueprint.system = \"9999-12-01 23:59:00.0\"",
                "orderBy": "com/factorioprints/Blueprint.systemFrom",
                "multiplicity": "0..*",
                "projection": "com.factorioprints.BlueprintSummaryProjection",
                "transactionTimestamp": "9999-12-01T23:59:00Z",
                "pagination": {
                    "pageSize": 60,
                    "numberOfPages": 2,
                    "pageNumber": 1
                }
            },
            "_data": [
                {
                    "key": "-OCVsFXXKNJ6fwvX8o15",
                    "title": "''Nion'' Your little starter ship",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "v92kq6s",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-MFIYLSH60wmZ-pNvcL_",
                    "title": "10 Books Full of Rails v2.21.1",
                    "voteSummary": {
                        "numberOfUpvotes": 803
                    },
                    "imgurImage": {
                        "imgurId": "VqGIoWF",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTN1lnHaZYlCaJiKYv",
                    "title": "480/s green circuit /w max productivity",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "owm2srX",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTmq6Q6DxBf5lVxqDj",
                    "title": "960/s plastic /w max productivity",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "PRH7g80",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUl5yOzu6UpLPxJbJJ",
                    "title": "Chunk-Aligned Railway System with Wires - updated for 2.0",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "BDmrHNm",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUGpweufwNibRDteXV",
                    "title": "DrRoom Space City",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "VQhuKHa",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUgb6JcLu6hsVh4DZX",
                    "title": "Evil Penis Rail Division",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "UJNkXaL",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OAP4_bHqhbjQeqbPjxu",
                    "title": "Factorio 2.0 torture test",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "QbepqZa",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTHZk-jwIHAAfILqaJ",
                    "title": "First design of The way",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "cuZPSfO",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCWFa772lH2KKUPq9qi",
                    "title": "Fulgora - Mini Base",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "wIoQPwQ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBYG-xv8_P81wBwG_pA",
                    "title": "Gleba - mini base",
                    "voteSummary": {
                        "numberOfUpvotes": 11
                    },
                    "imgurImage": {
                        "imgurId": "zixh1fl",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCNy6DMRDDpqZQSBMB8",
                    "title": "Holmium Ore Scrapper",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "nyqUMjR",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBtwpgmOW4ahkbLRRZb",
                    "title": "Interplanetary Cargo Transport \"The Bullet\"",
                    "voteSummary": {
                        "numberOfUpvotes": 15
                    },
                    "imgurImage": {
                        "imgurId": "s8masxi",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBNF7RfBZP9weZkQ5yT",
                    "title": "Large Space Ships + more",
                    "voteSummary": {
                        "numberOfUpvotes": 17
                    },
                    "imgurImage": {
                        "imgurId": "n8lQ5L9",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCW71Di3RZj1-SoncP8",
                    "title": "Lossless Nuclear Power in 2.0",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "oVz0Bdb",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTxgTft1qSFrY-6W7J",
                    "title": "Micro space science pack",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "6sgaUTi",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUFzHRL2Ytcc0bMD0Y",
                    "title": "Moonscar - Promethium Research Vessel",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "BwO53oF",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUfIpMngJ8wjXSJEg1",
                    "title": "Parameterised Electromagnetic Plant",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "OdYEm9J",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBglj-IqaWEXKZEgA4g",
                    "title": "Parameterized Blueprints",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "qCIJtqO",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTmhGxA7X-ILIW5Xwt",
                    "title": "Pentapod safe egg storage",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "ulS0wEQ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCT5nAnTZ8YcrUlTysQ",
                    "title": "Power Shortage Notifier",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "3yTax9R",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCVWJAgi1ENDYwdcfQv",
                    "title": "Produccion space science 314 x min or 5.2 x sec",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "YSjUmLQ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCWKrq9v9snYf7aCKXq",
                    "title": "QSB Space - Basic space starter to get your first platform into space to start science production.",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "MftToRb",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCGJqKo9feu-E-uhZhu",
                    "title": "Rail Modular Master System",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "TuLD2SZ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCSebW1rPiPjuxj9Zk8",
                    "title": "S.T.R.A.T - solar edge ship ",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "wKRDGr5",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCT4qVuUMhnAfXBMyIh",
                    "title": "Simple Nauvis-Vulcanus shuttle",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "fQnoaVE",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUSkgfh6UwIFvcr83t",
                    "title": "Spiral Impact Unloader (Error Testing)",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "oEnC2H0",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBpRbl2NpAYkQe1s5OT",
                    "title": "Starting Space Platfrom",
                    "voteSummary": {
                        "numberOfUpvotes": 6
                    },
                    "imgurImage": {
                        "imgurId": "PfWW6qJ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCV4021oqvo7KT5dL1z",
                    "title": "The Boers (Factorio 2.0)",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "7TFUPZg",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUIwhNy_9nDm1IjmlH",
                    "title": "The Terminator",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "NvISxje",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTfI_EKeIvtTZ6CjDX",
                    "title": "Tilable science for all 12 of em with spoilage disposal",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "DYROFa5",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBdq3vJ2slIWEDAXEeM",
                    "title": "Tileable factories, v0.20.0",
                    "voteSummary": {
                        "numberOfUpvotes": 162
                    },
                    "imgurImage": {
                        "imgurId": "pBzhM4D",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCVFu1GTYeSdvu0eXAT",
                    "title": "Tiny tilable 960 green circuit per second direct insertion lategame setup",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "9malZMf",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCKKZVNwDyWx3muc7yL",
                    "title": "Titan Battlecruiser",
                    "voteSummary": {
                        "numberOfUpvotes": 3
                    },
                    "imgurImage": {
                        "imgurId": "mf2Rj9C",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUdXo0z2j3jCoZkWpR",
                    "title": "Triple Engine Space Platform (player transport)",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "h2hTspb",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTKxajQRFRQF-JxWrB",
                    "title": "Ultra-dense 1MB combinator RAM",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "sx7DkZZ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCVP9qAC4q4n7yO-7Um",
                    "title": "Uran235 Production",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "SqER3Tr",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCVzXHfoRwqzUj2g0cV",
                    "title": "Vulcanus - mini base",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "TfM37ku",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCTm6uJYdvD6AnYU-yE",
                    "title": "WoodPig 3(The Aquilo runner)",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "zduE48R",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCUXebCeF-8_fkJNEI2",
                    "title": "effective-science counter display",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "s0RCUMX",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCT9x4QSUKg6CKDZJKG",
                    "title": "simple landmine-based aquilo-capable cruiser",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "Xq9kMjJ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCOyaebkNifexC9EzQL",
                    "title": "240/s green circuit with max productivity",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "I9jR5B3",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCNuI340QAdV_zomKqZ",
                    "title": "Asteroid Balancer",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "xHj4eQh",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCOj7PdTcJqurMWnbt_",
                    "title": "Biolab - Laboratoire Biologique",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "2GYPhbO",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCQL6Sl7Zz1pRr8GIvs",
                    "title": "Black Science Factory",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "vED2OLy",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCNlHw3bk9OyxFhU3xl",
                    "title": "Calcite Farm",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "NF8P5k7",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCNz0BU1lpMfwLYmSxU",
                    "title": "Factorio Timer",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "pljcWWM",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCQLUjSj2PmTwwerrXq",
                    "title": "Fulgora Recycling overflow prevention",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "8O4bgzs",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBM1jc4Izxd8iAZrzKf",
                    "title": "Fulgora all production, no mods, game version 2.0+",
                    "voteSummary": {
                        "numberOfUpvotes": 67
                    },
                    "imgurImage": {
                        "imgurId": "SnqKvDf",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCFWhcTIZIU6cLZrjS9",
                    "title": "Fulgora only Robots no Trains and automated sorter system with 1 combinator",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "q4BKyQF",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCQ1iL-KVomjXPRzH2C",
                    "title": "Fulgora scrap sorter",
                    "voteSummary": {
                        "numberOfUpvotes": 5
                    },
                    "imgurImage": {
                        "imgurId": "hUyVm0Z",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBlrat-C-7ulHEA-wPM",
                    "title": "GLEBA - Modular Spoil based Factory ",
                    "voteSummary": {
                        "numberOfUpvotes": 8
                    },
                    "imgurImage": {
                        "imgurId": "lqsr9V6",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCP1afm06ylbbmjP4Un",
                    "title": "Gel nutriente e lixo biológico",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "oDbtwSJ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCPSK1I0U2I_D4Eie2L",
                    "title": "Gleba Main Bus (90spm, mall, rockets and turrets)",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "Ees0UoH",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OBSabLpqu-pMQbWkKcy",
                    "title": "Gleba all production, no mods, game version 2.0+",
                    "voteSummary": {
                        "numberOfUpvotes": 90
                    },
                    "imgurImage": {
                        "imgurId": "snCeOvE",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCO_kQQtlHVawvNIFI2",
                    "title": "Gleba-2 - a basic ship, capable of reaching all 3 base planets without stops or taking damage ",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "TEPKwR2",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCOX9EkSm8AJ5o-W8QQ",
                    "title": "Interrupt Based Automatic Train Dispatch System",
                    "voteSummary": {
                        "numberOfUpvotes": 0
                    },
                    "imgurImage": {
                        "imgurId": "bkov0xJ",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCOse63NnEbWSZP_62Q",
                    "title": "Legendary stack inserter upcycler",
                    "voteSummary": {
                        "numberOfUpvotes": 2
                    },
                    "imgurImage": {
                        "imgurId": "2q1yur3",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCFuji94HCXrzf3rJeu",
                    "title": "Mixed Elevation Cityblock",
                    "voteSummary": {
                        "numberOfUpvotes": 3
                    },
                    "imgurImage": {
                        "imgurId": "Qvts3m4",
                        "imgurType": "image/png"
                    }
                },
                {
                    "key": "-OCNiNzHkcsSqB6KNvVp",
                    "title": "Nauvis Advanced Oil Refining for Factorio 2.0 (20 Refineries Cracking All To Petrol)",
                    "voteSummary": {
                        "numberOfUpvotes": 1
                    },
                    "imgurImage": {
                        "imgurId": "9Eduwq0",
                        "imgurType": "image/png"
                    }
                }
            ]
        });
    }),
];