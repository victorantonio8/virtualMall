import email from "@emailjs/browser";

const serviceId= "service_lpjj3ce";
const templateId = "template_ipx8tcv";
const publicKey = "yI8_5zX_BooxDwh1K";


export async function sendEmail(userName: string, fromEmail: string){
    email.send(serviceId, templateId,{
        to_name: userName,
        from_email: fromEmail,
        }, publicKey);
}