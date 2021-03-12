package com.example.medisurveyservice.config;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.exception.MediSurveyException;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@Component
public class CustomExceptionHandler {
	
	
	public Mono<MediSurveyResponse> handleError(MediSurveyException exp){
		
		return Mono.just( new MediSurveyResponse(LocalDateTime.now(), exp.getMessage(),
				exp.getLocalizedMessage(), null, HttpStatus.BAD_REQUEST.value()));
		
	}

}
