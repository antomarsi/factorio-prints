import { http, HttpResponse } from "msw";


"https://www.factorio.school/api/blueprintDetails/-OCaDhygJj_Oy6g2tVUz"

export const handlers = [
    http.get("/api/blueprints", ({ request }) => {
        //await fetch(`https://www.factorio.school/api/blueprintSummaries/filtered/page/${page}`)
        console.log("teste")
        
        return HttpResponse.json(request);
    }),
];