package com.example.medisurveyservice.config;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.exception.MediSurveyException;

/**
 * @author joby.w
 *
 */

@ControllerAdvice
public class GlobalExceptionHandler  extends ResponseEntityExceptionHandler {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler({ Exception.class })
	public ResponseEntity<MediSurveyResponse> handleMediException(Exception ex, WebRequest request) {
		LOGGER.error("Caught exception at GlobalExceptionHandler ->"+ex.getMessage(),ex);
		HttpStatus httpStatus = null;
		if(ex instanceof MediSurveyException) {
			httpStatus = HttpStatus.BAD_REQUEST;
		}else {
			httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		MediSurveyResponse obj = new  MediSurveyResponse(LocalDateTime.now(), ex.getMessage(), httpStatus.toString(),null,httpStatus.value());
		ResponseEntity<MediSurveyResponse> rspEntity= new ResponseEntity<MediSurveyResponse>(obj,httpStatus);
		return  rspEntity;
		
	}
	
	
}
