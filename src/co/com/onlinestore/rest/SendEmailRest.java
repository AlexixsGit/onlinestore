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

import co.com.onlinestore.model.Email;

@Path("/SendEmailRest")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SendEmailRest {

	@POST
	@Path("/sendEmail")
	public Response sendEmail(String data) throws JsonParseException, JsonMappingException, IOException {

		final String username = "alexixsortizz@gmail.com";
		final String password = "Dom15May";
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
			message.setFrom(new InternetAddress("almejorPrecio@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("alexixsortizz@gmail.com"));
			message.setSubject(subject);
			message.setText(completeMessage(data));

			Transport.send(message);

			System.out.println("Email sent");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		return Response.ok().build();
	}

	private String completeMessage(String data) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		StringBuilder message = new StringBuilder();

		Email email = mapper.readValue(data, Email.class);

		message.append("Cliente: " + email.getCustomerName()).append("\n");
		message.append("Correo: " + email.getCustomerEmail()).append("\n");
		message.append("Teléfono: " + email.getCustomerPhone()).append("\n\n");
		message.append("Mensaje:\n " + email.getCustomerMessage()).append("\n");

		return message.toString();
	}

}
