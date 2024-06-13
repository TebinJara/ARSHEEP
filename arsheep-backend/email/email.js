import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correopueba90@gmail.com', // Correo corporativo
        pass: 'uutu kfey ejvu qlob', // Contraseña del correo corporativo
    },
});

const enviarCorreo = (destinatario, asunto, texto) => {
    const mailOptions = {
        from: 'correopueba90@gmail.com',
        to: destinatario,
        subject: asunto,
        text: texto,
    };

    console.log('Enviando correo a:', destinatario);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

export default enviarCorreo;