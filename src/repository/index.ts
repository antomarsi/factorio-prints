import "server-only"
import { FirestoreRepository } from "./firestoreRepository";
import { RepositoryInterface } from "./repositoryInterface";
import { JsonRepository } from "./jsonRepository";

const env = process.env.REPOSITORY_TYPE
let repository: RepositoryInterface
switch (env) {
    case "firestore":
        repository = new FirestoreRepository();
        break;

    default:
        repository = new JsonRepository();
        break;
}

export default repository