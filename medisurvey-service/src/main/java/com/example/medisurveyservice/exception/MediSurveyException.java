package com.example.medisurveyservice.exception;

/**
 * @author joby.w
 *
 */
public class MediSurveyException extends Exception {


	private static final long serialVersionUID = -1324559689772026552L;
	
	private final String message;
	
	public MediSurveyException(String message){
		super(message);
		this.message=message;
	}

	public String getMessage() {
		return message;
	}

}
