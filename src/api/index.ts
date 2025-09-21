import axios from "axios";
import { Credentials, TaskProps } from "../models";

export const getTasks = async (): Promise<TaskProps[]> => {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/'
      })
        .then(function (response) {
            return response.data.data as TaskProps[];
        }).catch(function (error) {
            console.log(error);
            return [] as TaskProps[];
        });
}

export const createTask = async (task: TaskProps): Promise<TaskProps[]> => {
    return axios({
        method: 'put',
        url: 'http://localhost:3001/newTast',
        data: task
      })
        .then(function (response) {
            return response.data as TaskProps[];
        }).catch(function (error) {
            console.log(error);
            return [] as TaskProps[];
        });
}

export const requestLogin = async (credentials: Credentials) => {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: credentials
      })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
            return 'Error: ' + error;
        });
}