import { combineReducers } from "redux";
import { kaprodiReducers } from './kaprodiReducers'
import { adminReducers } from "./adminReducers";
import { dikjarReducers } from "./dikjarReducers";
import { dospemReducers } from "./dospemReducers";
import { mahasiswaReducers } from "./mahasiswaReducers";
import { pembimbingInstansiReducers } from "./pembimbingInstansiReducers"

export default combineReducers({
    kaprodiReducers,
    adminReducers,
    dikjarReducers,
    dospemReducers,
    mahasiswaReducers,
    pembimbingInstansiReducers,
})