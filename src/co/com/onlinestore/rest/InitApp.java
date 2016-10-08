package co.com.onlinestore.rest;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;
import co.com.onlinestore.model.SessionModel;

@Path("/InitApp")
public class InitApp {

	private SessionModel sessionModel;
	private Logger log;

	public InitApp() {
		System.out.println("Inicio aplicacion");
		sessionModel = new SessionModel();
		ip();
	}

	@GET
	@Path("/writeLog")
	public Response writeLog() {
		System.setProperty("logback.configurationFile", "C:\\onlineStoreLog\\logback.xml");
		this.log = (Logger) LoggerFactory.getLogger(InitApp.class);
		this.log.info("Inicio aplicacion");
		this.log.info("Direccion ip: " + sessionModel.getIp());
		return Response.ok(this.sessionModel).build();
	}

	// Obtencion de la ip del equipo que ejecuta la aplicacion
	private void ip() {
		try {
			sessionModel.setIp(InetAddress.getLocalHost());
			System.out.println("Current IP address : " + sessionModel.getIp().getHostAddress());
		} catch (UnknownHostException e) {
			log.error("Error obteniendo la ip");
			e.printStackTrace();
		}

	}

	public Logger getLog() {
		return log;
	}

	public void setLog(Logger log) {
		this.log = log;
	}
}
