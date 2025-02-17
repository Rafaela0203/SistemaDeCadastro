import {ICustomer} from "@/commons/interfaces.ts";
import {api} from "@/lib/axios.ts";

const customerURL = "/clientes"

const save = async (customer: ICustomer): Promise<any> => {
    let response
    try{
        response = await api.post(customerURL, customer);
    }catch(err: any){
        response = err.response;
    }
    return response;
}

const findAll = async (): Promise<any> => {
    let response
    try {
        response = await api.get(customerURL);
    }catch (err: any){
        response = err.response;
    }
    return response;
}

const findById = async (id: string): Promise<any> => {
    let response
    try {
        response = await api.get(`${customerURL}/${id}`);
    }catch (err: any){
        response = err.response;
    }
    return response;
}

const update = async (id: number | undefined, customer: ICustomer): Promise<any> => {
    let response
    try {
        response = await api.put(`${customerURL}/${id}`, customer);
    }catch (err: any){
        response = err.response;
    }
    return response;
}

const remove = async (id: number | undefined): Promise<any> => {
    let response
    try {
        response = await api.delete(`${customerURL}/${id}`);
    }catch (err: any){
        response = err.response;
    }
    return response;
}

const CustomerService = {
    save,
    findAll,
    findById,
    update,
    remove,
}

export default CustomerService;