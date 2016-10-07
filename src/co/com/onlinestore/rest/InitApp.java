package co.com.onlinestore.rest;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;

@Path("/InitApp")
public class InitApp {

	@Path("/writeLog")
	public Response writeLog() {
		System.out.println("Inicio aplicacion");
		System.setProperty("logback.configurationFile", "/log/logback.xml");
		Logger log = (Logger) LoggerFactory.getLogger(InitApp.class);
		log.info("mensaje1");
		log.error("Error1");
		return Response.ok().build();
	}
}
