import { environment } from "src/environments/environment";

export class URL{

    static readonly  GET_ALL_QUESTIONS : string = "questions/";
    static readonly  USERS : string = "user/";
    static readonly  GET_ACTIVE_QUESTION_SET : string = URL.GET_ALL_QUESTIONS+"active";
    static readonly  GET_QUESTION_LAYOUTS : string =  URL.GET_ALL_QUESTIONS + "setNames";
    static readonly  GET_QUESTION_BY_ID : string =  URL.GET_ALL_QUESTIONS + "id/";
    static readonly  SAVE_QUESTION : string = "questions";
    static readonly  UPDATE_QUESTION : string = URL.SAVE_QUESTION;
    static readonly  CLONE_LAYOUT : string = URL.GET_ALL_QUESTIONS+"clone";
    static readonly  CHANGE_ATV_LAYOUT : string = URL.USERS+"changeLayout";
    static readonly  DELETE_QUESTION : string = URL.GET_ALL_QUESTIONS;
    static readonly  LOGOUT : string = "logout";

}