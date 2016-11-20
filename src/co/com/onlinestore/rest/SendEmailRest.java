package co.com.onlinestore.rest;

import java.io.IOException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;
import co.com.onlinestore.model.Email;

@Path("/SendEmailRest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SendEmailRest {

	private Logger log;

	public SendEmailRest() {
		System.setProperty("logback.configurationFile", "C:\\onlineStoreLog\\logback.xml");
		this.log = (Logger) LoggerFactory.getLogger(SendEmailRest.class);
	}

	@POST
	@Path("/sendEmail")
	public Response sendEmail(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Email email = mapper.readValue(data, Email.class);

		writeLog(email);

		final String username = "atuestiloweb@gmail.com";
		final String password = "May15Dom";
		final String port = "587";
		final String subject = "Pedido realizado";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", port);

		// Autenticacion de la cuenta
		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("atuestiloweb@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("atuestiloweb@gmail.com"));
			message.setSubject(subject);
			message.setText(completeMessage(email));

			Transport.send(message);
			log.info("Correo enviado correctamente");
			log.info("**Fin de envio de correo**");
		} catch (MessagingException e) {
			log.error("Error enviando el correo  " + e.getMessage());
			throw new RuntimeException(e);

		}
		return Response.ok().build();
	}

	private void writeLog(Email email) {
		log.info("**Inicio de envio de correo**");
		log.info("Cliente: " + email.getCustomerName());
		log.info("Correo: " + email.getCustomerEmail());
		log.info("Telefono: " + email.getCustomerPhone());
		log.info("Mensaje: " + email.getCustomerMessage());
		log.info("Direccion ip: " + email.getIp());
		log.info("Informacion del producto");
		log.info("Nombre: " + email.getProductName());
		log.info("Codigo: " + email.getProductCode());
		log.info("Referencia: " + email.getProductReference());
		log.info("Precio: " + email.getProductPrice());
		log.info("Talla: " + email.getProductSize());
	}

	private String completeMessage(Email email) throws JsonParseException, JsonMappingException, IOException {

		StringBuilder message = new StringBuilder();

		message.append("Cliente: " + email.getCustomerName()).append("\n");
		message.append("Correo: " + email.getCustomerEmail()).append("\n");
		message.append("Teléfono: " + email.getCustomerPhone()).append("\n\n");
		message.append("Mensaje:\n " + email.getCustomerMessage()).append("\n");
		message.append("\n ");
		message.append("Informacion del producto\n ");
		message.append("Nombre: " + email.getProductName()).append("\n");
		message.append("Codigo: " + email.getProductCode()).append("\n");
		message.append("Referencia: " + email.getProductReference()).append("\n");
		message.append("Precio: " + email.getProductPrice()).append("\n");
		message.append("Talla: " + email.getProductSize()).append("\n");

		return message.toString();
	}

	public Logger getLog() {
		return log;
	}

	public void setLog(Logger log) {
		this.log = log;
	}

}
