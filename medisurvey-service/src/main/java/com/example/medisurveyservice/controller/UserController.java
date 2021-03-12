package com.example.medisurveyservice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.medisurveyservice.config.CustomExceptionHandler;
import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.exception.MediSurveyException;
import com.example.medisurveyservice.model.User;
import com.example.medisurveyservice.repository.UserRepository;
import com.example.medisurveyservice.service.UserDetailsServiceImpl;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserDetailsServiceImpl userService;
	
	@Autowired
	CustomExceptionHandler customExceptionHandler;
	
	@GetMapping("/")
	public User currentUser() {
		return userService.getCurrentUserInfo();	
	}

	@PostMapping("changeLayout")
	public Mono<MediSurveyResponse> changeActiveLayout(@RequestBody  Map<String, String> requestParams) {
		
		return userService.changeActiveLayout(requestParams).onErrorResume(MediSurveyException.class,error->{
			return customExceptionHandler.handleError(error);
		});
		
	}
	
	
	@GetMapping("login")
    public ModelAndView login() {
        return new ModelAndView("login");
    }
	

    
}