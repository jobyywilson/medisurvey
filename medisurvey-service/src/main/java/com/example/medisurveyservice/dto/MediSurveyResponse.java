package com.example.medisurveyservice.dto;

import java.time.LocalDateTime;

/**
 * @author joby.w
 *
 */
public class MediSurveyResponse {

	private final LocalDateTime timestamp;

	private final String message;

	private final String details;
	
	private final Object data;
	
	private final Integer statusCode;

	public MediSurveyResponse(LocalDateTime timestamp, String message, String details, Object data,Integer statusCode) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
		this.data =data;
		this.statusCode =statusCode;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public String getMensaje() {
		return message;
	}

	public String getDetalles() {
		return details;
	}


	public Object getData() {
		return data;
	}

	public Integer getStatusCode() {
		return statusCode;
	}


}
