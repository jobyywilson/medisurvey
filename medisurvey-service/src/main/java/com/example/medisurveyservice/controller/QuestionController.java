package com.example.medisurveyservice.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.medisurveyservice.config.CustomExceptionHandler;
import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.dto.QuestionActionDTO;
import com.example.medisurveyservice.dto.QuestionDTO;
import com.example.medisurveyservice.exception.MediSurveyException;
import com.example.medisurveyservice.model.Question;
import com.example.medisurveyservice.service.QuestionServiceImpl;
import com.example.medisurveyservice.utils.MappingUtils;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@RestController
@RequestMapping("questions")
public class QuestionController {
	
	@Autowired
	QuestionServiceImpl questionServiceImpl;
	
	@Autowired
	CustomExceptionHandler customExceptionHandler;
	
	@GetMapping("/active")
	public Mono<Map<String, QuestionDTO>> getActiveQuestionList(Principal principal) throws MediSurveyException{
		return questionServiceImpl.getActiveQuestionList(principal);
	}
	
	@GetMapping("/")
	public Mono<Map<String, Map<String, QuestionDTO>>> getQuestionLIst(Principal principal){
		return questionServiceImpl.getQuestionList(principal);
	}
	
	@GetMapping("/id/{id}")
	public Mono<QuestionDTO> getQuestionById( @PathVariable("id") String id,Principal principal){
		return questionServiceImpl.getQuestionById(id);
	}
	
	@GetMapping("/{setName}")
	public Mono<MediSurveyResponse> getQuestionListBySetName( @PathVariable("setName") String setName,Principal principal) throws MediSurveyException{
		return questionServiceImpl.getQuestionList(setName,principal).map(MappingUtils::convertToMediSurveyResponse);
	}
	
	@PostMapping("/clone")
	public Mono<MediSurveyResponse> clone(@RequestBody  Map<String, String> requestParams,Principal principal) throws MediSurveyException{
		String oldSetName = requestParams.get("oldSetName");
		String newSetName =  requestParams.get("newSetName");
		
		return questionServiceImpl.clone(oldSetName,newSetName,principal).map(MappingUtils::convertToMediSurveyResponse);
	}
	
	@DeleteMapping("{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public Mono<MediSurveyResponse> delete( @PathVariable("id") String id) {
		return questionServiceImpl.delete(id).map(MappingUtils::convertToMediSurveyResponse);
	}
	
	@PostMapping
	public Mono<MediSurveyResponse> save(@RequestBody Question question,Principal principal){
		return questionServiceImpl.save(question,principal).map(MappingUtils::convertToMediSurveyResponse);
	}
	
	@PutMapping
	public Mono<MediSurveyResponse> update(@RequestBody Question question,Principal principal) throws MediSurveyException{
		return questionServiceImpl.update(question,principal).map(MappingUtils::convertToMediSurveyResponse);
	}
	
	@GetMapping("/setNames")
	public Mono<List<QuestionActionDTO>> findAllSetNameByOwner(Principal principal) {
		return questionServiceImpl.findAllSetNameByOwner(principal);
	}

}
