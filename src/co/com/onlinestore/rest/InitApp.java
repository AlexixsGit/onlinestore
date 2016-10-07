package co.com.onlinestore.rest;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;
import co.com.onlinestore.model.SessionModel;

@Path("/InitApp")
public class InitApp {

	private SessionModel sessionModel;

	public InitApp() {
		System.out.println("Inicio aplicacion");
		sessionModel = new SessionModel();
		ip();
	}

	@Path("/writeLog")
	public Response writeLog() {
		System.setProperty("logback.configurationFile", "C:\\log\\logback.xml");
		Logger log = (Logger) LoggerFactory.getLogger(InitApp.class);
		log.info("mensaje1");
		log.error("Error1");
		return Response.ok(this.sessionModel).build();
	}

	// Obtencion de la ip del equipo que ejecuta la aplicacion
	private void ip() {
		try {
			sessionModel.setIp(InetAddress.getLocalHost());
			System.out.println("Current IP address : " + sessionModel.getIp().getHostAddress());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

	}
}
