import email from "@emailjs/browser";

const serviceId= "service_lpjj3ce";
const templateEntregado = "template_ipx8tcv";
const templateModified = "template_6q4nidm";
const publicKey = "yI8_5zX_BooxDwh1K";


export async function sendEmail(userName: string, fromEmail: string){
    email.send(serviceId, templateEntregado,{
        to_name: userName,
        from_email: fromEmail,
        }, publicKey);
}

export async function sendEmailModified(userName: string, fromEmail: string){
    email.send(serviceId, templateModified,{
        to_name: userName,
        from_email: fromEmail,
        }, publicKey);
    
}