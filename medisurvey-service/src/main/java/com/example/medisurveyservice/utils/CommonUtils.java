package com.example.medisurveyservice.utils;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;

import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.exception.MediSurveyException;

/**
 * @author joby.w
 *
 */
public class CommonUtils {
	
	public static MediSurveyResponse createMediSurvey200Resposne(String message,Object object){
		return new MediSurveyResponse(LocalDateTime.now(), message, message, object, HttpStatus.OK.value());
	}
	
	public static MediSurveyResponse createMediSurveyFailureResposne(String message,Object object){
		return new MediSurveyResponse(LocalDateTime.now(), message, message, object, HttpStatus.BAD_REQUEST.value());
	}
	
	public static void validateSetName(String ... setNameArray) throws MediSurveyException {
		for(String setName : setNameArray) {
			if(ObjectUtils.isEmpty(setName)) {
				throw new MediSurveyException(Constants.MSG_COMMON_EMTY_FIELD);
			}
		}
		
	}

}
