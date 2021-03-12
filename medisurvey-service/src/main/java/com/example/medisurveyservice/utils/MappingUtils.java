package com.example.medisurveyservice.utils;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.example.medisurveyservice.dto.MediSurveyResponse;

/**
 * @author joby.w
 *
 */
public class MappingUtils {
	
	private static final String MSG_DEFUALT_SUCCESS="Success";
	
	public static MediSurveyResponse convertToMediSurveyResponse(Object object) {
		return convertToMediSurveyResponse(object,MSG_DEFUALT_SUCCESS);
	}
	
	
	public static MediSurveyResponse convertToMediSurveyResponse(Object object,String message) {	
		return new MediSurveyResponse(LocalDateTime.now(), message, message, object, HttpStatus.OK.value());
	}

}
